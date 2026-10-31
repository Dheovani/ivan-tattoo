import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relativo: funciona em qualquer subcaminho do GitHub Pages, independente do nome do repositório.
  base: './',
  plugins: [react()],
})
