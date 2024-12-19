/// <reference types="vite/client" />

declare module '*.glsl' {}
declare module '*.json' {
  const value: any
  export default value
}
