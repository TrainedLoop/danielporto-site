import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// BASE_PATH vem do GitHub Pages (vazio com domínio próprio, "/<repo>/" sem ele).
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
})
