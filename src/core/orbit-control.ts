import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { camera } from './camera'
import { renderer } from './renderer'

export const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
