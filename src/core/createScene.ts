import { Color, Scene } from 'three'

export interface SceneOptions {
  clearColor?: string
}

export const createScene = ({ clearColor = '#333' }: SceneOptions) => {
  const scene = new Scene()
  scene.background = new Color(clearColor)
  return {
    scene,
  }
}
