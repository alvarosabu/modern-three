import type { Vector3 } from 'three'
import { AmbientLight, Clock, DirectionalLight, Mesh, MeshToonMaterial, PlaneGeometry, SphereGeometry, Vector2 } from 'three'
// Shaders

import { add, cos, modelViewProjection, mul, positionLocal, sin, uv, vec3 } from 'three/tsl'
import { MeshStandardNodeMaterial, UniformNode } from 'three/webgpu'
import camera from './core/camera'
import { fpsGraph, gui } from './core/gui'

import { controls } from './core/orbit-control'

import { renderer, scene } from './core/renderer'
import './style.css'

// Lights
const ambientLight = new AmbientLight(0xFFFFFF, 0.5)
scene.add(ambientLight)

const directionalLight = new DirectionalLight('#ffffff', 1)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 2, 2.25)

scene.add(directionalLight)

// Sine wave based on UV + time
const uvNode = uv()

const fragmentColor = uvNode

// Vertex: displace along normal
// Create uniforms as nodes
const frequencyNode = new UniformNode(new Vector2(40.0, 10.0))
const timeNode = new UniformNode(0.0)

// Create the vertex transformations
const posX = positionLocal.x
const sinVal = sin(add(mul(posX, frequencyNode.value.y), mul(timeNode, -1)))
const cosVal = cos(add(mul(posX, frequencyNode.value.x), mul(timeNode, -1)))

const displacedPosition = positionLocal.add(
  vec3(cosVal.mul(0.05), sinVal.mul(0.05), 0.0),
)

const vertexOutput = modelViewProjection(displacedPosition)

// Create a NodeMaterial and assign the fragment color
const sphereMaterial = new MeshStandardNodeMaterial()
sphereMaterial.fragmentNode = fragmentColor
sphereMaterial.vertexNode = vertexOutput

const sphere = new Mesh(
  new SphereGeometry(1, 32, 32),
  sphereMaterial,
)

sphere.position.set(0, 2, 0)
sphere.castShadow = true
scene.add(sphere)

const DirectionalLightFolder = gui.addFolder({
  title: 'Directional Light',
})

Object.keys(directionalLight.position).forEach((key) => {
  DirectionalLightFolder.addBinding(
    directionalLight.position,
    key as keyof Vector3,
    {
      min: -100,
      max: 100,
      step: 1,
    },
  )
})

const plane = new Mesh(
  new PlaneGeometry(10, 10, 10, 10),
  new MeshToonMaterial({ color: '#444' }),
)

plane.rotation.set(-Math.PI / 2, 0, 0)
plane.receiveShadow = true
scene.add(plane)

const clock = new Clock()

const loop = () => {
  const elapsedTime = clock.getElapsedTime()

  fpsGraph.begin()

  controls.update()
  timeNode.value = elapsedTime
  renderer.render(scene, camera)

  fpsGraph.end()
  requestAnimationFrame(loop)
}

loop()
