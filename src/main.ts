import type { Vector3 } from 'three'
import { AmbientLight, Clock, DirectionalLight, Mesh, MeshToonMaterial, PlaneGeometry, ShaderMaterial, SphereGeometry, Vector2 } from 'three'
import camera from './core/camera'
import { fpsGraph, gui } from './core/gui'
import { controls } from './core/orbit-control'
import { renderer, scene } from './core/renderer'

import './style.css'

import fragmentShader from '/@/shaders/fragment.glsl'
// Shaders
import vertexShader from '/@/shaders/vertex.glsl'

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

const sphereMaterial = new ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uFrequency: { value: new Vector2(20, 15) },
  },
  vertexShader,
  fragmentShader,
})

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

  sphereMaterial.uniforms.uTime.value = elapsedTime

  fpsGraph.begin()

  controls.update()
  renderer.render(scene, camera)

  fpsGraph.end()
  requestAnimationFrame(loop)
}

loop()
