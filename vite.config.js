import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    chunkSizeWarningLimit: 1600,
    assetsDir: './',
    rollupOptions: {
      input: './src/index.jsx'
    },
    sourcemap: 'false'
  },
  sourcemap: {
    server: true,
    client: true,
  },
})
