import { defineConfig } from 'vite'
import { resolve } from 'pathe'

export default defineConfig({
  resolve: {
    alias: {
      '/@': resolve(__dirname, './src'),
    },
  },
})
