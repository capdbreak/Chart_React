import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: true,
    proxy: {
      '/tickers': 'http://localhost:8000',
      '/dates': 'http://localhost:8000',
      '/news': 'http://localhost:8000',
    }
  }
})
