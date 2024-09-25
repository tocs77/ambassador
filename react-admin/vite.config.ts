import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigpaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigpaths()],
  resolve: {
    alias: {
      src: "/src",
    },
  },
});
