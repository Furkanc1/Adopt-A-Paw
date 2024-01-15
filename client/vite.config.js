import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const liveLink = window && window.location.host.includes(`local`) ? 'http://localhost:3001' : 'https://adoptapaw-1-2c5b986974f2.herokuapp.com';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: liveLink,
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
