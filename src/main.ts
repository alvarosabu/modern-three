import {
  AmbientLight,
  DirectionalLight,
  Mesh,
  MeshNormalMaterial,
  MeshToonMaterial,
  PlaneGeometry,
  Timer,
  TorusGeometry,
} from 'three'
import { createCamera } from './core/createCamera'
import { createControls } from './core/createControls'
import { createGUI } from './core/createGUI'
import { createRenderer } from './core/createRenderer'
import { createScene } from './core/createScene'
import { createResizeObserver } from './utils/resizeObserver'

const canvas = document.querySelector<HTMLCanvasElement>('#webgl')
if (!canvas) {
  throw new Error('Canvas #webgl not found')
}

const resizeObserver = createResizeObserver()

const { scene } = createScene({ clearColor: '#333' })

const { renderer, dispose: disposeRenderer } = createRenderer({
  canvas,
  resizeObserver,
  scene,
})

const { camera, dispose: disposeCamera } = createCamera({ resizeObserver })
scene.add(camera)

createControls(camera, renderer.domElement)

// Main scene
const ambientLight = new AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

const directionalLight = new DirectionalLight('#ffffff', 1)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 2, 2.25)

scene.add(directionalLight)

const donut = new Mesh(new TorusGeometry(1, 0.4, 16, 64), new MeshNormalMaterial())

donut.position.set(0, 2, 0)
donut.rotation.set(-Math.PI / 3, Math.PI / 9, Math.PI / 2)
donut.castShadow = true
scene.add(donut)

const plane = new Mesh(new PlaneGeometry(10, 10, 10, 10), new MeshToonMaterial({ color: '#444' }))

plane.rotation.set(-Math.PI / 2, 0, 0)
plane.receiveShadow = true
scene.add(plane)

// GUI
const { pane, fpsGraph, dispose: disposeGUI } = createGUI()
pane.addBinding(camera.position, 'x', { min: -10, max: 10, step: 0.01 })
pane.addBinding(camera.position, 'y', { min: -10, max: 10, step: 0.01 })
pane.addBinding(camera.position, 'z', { min: -10, max: 10, step: 0.01 })

// Animation loop
const timer = new Timer()

const loop = () => {
  // const elapsed = clock.getElapsedTime()
  fpsGraph.begin()
  timer.update()
  const delta = timer.getDelta()
  donut.rotation.y += delta
  renderer.render(scene, camera)
  fpsGraph.end()
  requestAnimationFrame(loop)
}

loop()

// Optional: cleanup on HMR
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    disposeRenderer()
    disposeCamera()
    disposeGUI()
  })
}
