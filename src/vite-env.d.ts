/// <reference types="vite-plus/client" />

declare module '*.glsl' {}
declare module '*.json' {
  const value: any
  export default value
}
