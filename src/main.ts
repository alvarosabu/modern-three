import * as THREE from 'three'
import { controls, renderer, scene } from './core/renderer'
import { fpsGraph, gui } from './core/gui'
import camera from './core/camera'

import './style.css'

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 2, 2.25)

scene.add(directionalLight)

const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(1, 32, 32),
  new THREE.MeshToonMaterial({ color: 'teal' }),
)

sphere.position.set(0, 2, 0)
sphere.castShadow = true
scene.add(sphere)

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10, 10, 10),
  new THREE.MeshToonMaterial({ color: '#444' }),
)

plane.rotation.set(-Math.PI / 2, 0, 0)
plane.receiveShadow = true
scene.add(plane)

const clock = new THREE.Clock()
let prevElapsedTime = 0

const loop = () => {
  const elapsedTime = clock.getElapsedTime()

  prevElapsedTime = elapsedTime

  fpsGraph.begin()

  sphere.rotation.y = elapsedTime * 0.6
  sphere.rotation.z = elapsedTime * 0.3

  controls.update()
  renderer.render(scene, camera)

  fpsGraph.end()
  requestAnimationFrame(loop)
}

loop()
