import { resolve } from 'pathe'
import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'

export default defineConfig({
  resolve: {
    alias: {
      '/@': resolve(__dirname, './src'),
    },
  },
  plugins: [glsl()],
})
