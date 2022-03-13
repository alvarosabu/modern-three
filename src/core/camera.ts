import { PerspectiveCamera } from 'three'

const VERTICAL_FIELD_OF_VIEW = 45 // degrees 45 is the normal

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

export const camera = new PerspectiveCamera(
  VERTICAL_FIELD_OF_VIEW,
  sizes.width / sizes.height,
)

camera.position.set(9, 4, 9)

export default camera
