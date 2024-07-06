import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {

      '/api/': {
        //target: 'http://localhost:8000',
        target: 'https://generate-short-urls-for-longer-original.onrender.com',
        changeOrigin: true,
        secure: false

      }
    }
  }


})
