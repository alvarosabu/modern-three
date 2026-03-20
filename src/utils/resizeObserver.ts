export type ResizeCallback = (width: number, height: number) => void
export interface ResizeObserver {
  getSize: () => { width: number; height: number }
  onResize: (cb: ResizeCallback) => () => void
}

export const createResizeObserver = () => {
  const callbacks: Set<ResizeCallback> = new Set()

  const getSize = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  window.addEventListener('resize', () => {
    const { width, height } = getSize()
    callbacks.forEach((cb) => cb(width, height))
  })

  return {
    getSize,
    onResize: (cb: ResizeCallback) => {
      callbacks.add(cb)
      return () => callbacks.delete(cb) // Returns unsubscribe function
    },
  }
}
