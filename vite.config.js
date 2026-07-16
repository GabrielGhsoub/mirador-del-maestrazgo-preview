import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' + HashRouter = works on GitHub Pages project sites without config
export default defineConfig({
  base: './',
  plugins: [react()],
})
