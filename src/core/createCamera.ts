import type { ResizeObserver } from '../utils/resizeObserver'
import { PerspectiveCamera } from 'three'

export interface CameraOptions {
  fov?: number
  position?: [number, number, number]
  resizeObserver: ResizeObserver
  far?: number
  near?: number
}

export const createCamera = (options: CameraOptions) => {
  const { fov = 45, position = [9, 4, 9], resizeObserver, far = 1000, near = 0.1 } = options

  const { width, height } = resizeObserver.getSize()

  const camera = new PerspectiveCamera(fov, width / height, near, far)
  camera.position.set(...position)
  camera.lookAt(0, 0, 0)

  const unsubscribe = resizeObserver.onResize((w: number, h: number) => {
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  })

  return {
    camera,
    dispose: () => unsubscribe(),
  }
}
