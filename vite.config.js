import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-animations';
            }
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    target: 'es2020',
    minify: 'esbuild',
    terserOptions: {
      compress: {
        drop_console: false
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion']
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: false,
    hmr: {
      protocol: "ws",
      host: "127.0.0.1",
      port: 5173,
    },
    headers: {
      'Cache-Control': 'no-store'
    }
  }
})
