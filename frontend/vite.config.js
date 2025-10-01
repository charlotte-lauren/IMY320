import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/IMY320',
  plugins: [react()],
  build: {
    sourcemap: true,
  }
})
