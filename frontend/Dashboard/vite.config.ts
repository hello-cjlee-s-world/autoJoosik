import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
      port: 3000,
      open: true,
      proxy: {
          "/auto/": {
              target: "http://localhost:1018",
              changeOrigin: true,
              secure: false,
          },
          // '/ws/': {
          //     target: "http://192.168.55.22:30308",
          //     changeOrigin: true,
          //     logLevel: 'debug',
          //     secure: false,
          //     pathRewrite: {
          //         '^/ws/': '/ws/'
          //     }
          // }
      },
  },
})
