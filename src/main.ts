import type { Vector3 } from 'three'
import { AmbientLight, Clock, DirectionalLight, Mesh, MeshToonMaterial, PlaneGeometry, ShaderMaterial, SphereGeometry, Vector2 } from 'three'
// Shaders

import { float, modelViewProjection, normalWorld, positionLocal, sin, time, uv, vec3, vec4 } from 'three/tsl'
import { MeshStandardNodeMaterial } from 'three/webgpu'
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

// Time node: built-in uniform that increments every frame
const t = time

// Sine wave based on UV + time
const uvNode = uv()
const sineVal = sin(uvNode.x.add(t)) // sin(u + time)
const normalizedSine = sineVal.mul(0.5).add(0.5) // shift from (-1..1) to (0..1)

// Define two colors to blend
const colorA = vec3(1.0, 0.0, 0.0) // red
const colorB = vec3(0.0, 0.0, 1.0) // blue

// Interpolate between colorA and colorB using normalizedSine
const finalColor = colorA.mix(colorB, normalizedSine)

// Create a vec4 with full opacity
const fragmentColor = vec4(finalColor, float(1.0))

// Vertex: displace along normal
const sineValVert = sin(uvNode.x.add(t))
const displacement = sineValVert.mul(0.1) // small amplitude
const displacedPosition = positionLocal.add(normalWorld.mul(displacement))
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
  renderer.render(scene, camera)

  fpsGraph.end()
  requestAnimationFrame(loop)
}

loop()
