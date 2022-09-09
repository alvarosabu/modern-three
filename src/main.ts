import * as THREE from 'three'
import { renderer, scene } from './core/renderer'
import { fpsGraph, gui } from './core/gui'
import camera from './core/camera'
import { controls } from './core/orbit-control'

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

const sphereMaterial = new THREE.MeshToonMaterial({ color: 'teal' })

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  sphereMaterial,
)

sphere.position.set(0, 2, 0)
sphere.castShadow = true
scene.add(sphere)

const DirectionalLightFolder = gui.addFolder({
  title: 'Directional Light',
})

Object.keys(directionalLight.position).forEach(key => {
  DirectionalLightFolder.addInput(
    directionalLight.position,
    key as keyof THREE.Vector3,
    {
      min: -100,
      max: 100,
      step: 1,
    },
  )
})

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10, 10, 10),
  new THREE.MeshToonMaterial({ color: '#444' }),
)

plane.rotation.set(-Math.PI / 2, 0, 0)
plane.receiveShadow = true
scene.add(plane)

const loop = () => {
  fpsGraph.begin()

  controls.update()
  renderer.render(scene, camera)

  fpsGraph.end()
  requestAnimationFrame(loop)
}

loop()
