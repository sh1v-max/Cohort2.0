import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Browser calls /gh-api/users/torvalds
      // Vite forwards it to https://api.github.com/users/torvalds (server-side, no CORS)
      '/gh-api': {
        target: 'https://api.github.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/gh-api/, ''),
      },
    },
  },
})
