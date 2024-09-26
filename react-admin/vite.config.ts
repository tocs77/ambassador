import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigpaths from 'vite-tsconfig-paths';

const MY_URL = 'http://192.168.1.33:8000';

export default defineConfig({
  plugins: [react(), tsconfigpaths()],
  resolve: {
    alias: {
      src: "/src",
    },
  },
  server: {
    port: 5371,
    proxy: {
      '/api': {
        target: MY_URL,
        changeOrigin: true,
        secure: false,
        ws: true,
      }
  },},
});


