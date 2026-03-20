import type { PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export const createControls = (camera: PerspectiveCamera, domElement: HTMLElement) => {
  const controls = new OrbitControls(camera, domElement)
  controls.enableDamping = true
  return {
    controls,
    dispose: () => controls.dispose(),
  }
}
