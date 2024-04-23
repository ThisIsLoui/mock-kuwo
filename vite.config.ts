import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://www.kuwo.cn/api/www/',
        changeOrigin: true,
        followRedirects: true, // 重点在这里
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('referer', `https://www.kuwo.cn/`)
          })
        },
      },
      '/officialWebsite': {
        target: 'https://www.kuwo.cn/',
        changeOrigin: true,
        followRedirects: true, // 重点在这里
        rewrite: (path) => path.replace(/^\/officialWebsite/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('referer', `https://www.kuwo.cn/`)
          })
        },
      },
      '/comment': {
        target: 'https://comment.kuwo.cn/com.s',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/comment/, ''),
      },
      '/playurl': {
        target: 'https://www.kuwo.cn/api/v1/www/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/playurl/, ''),
      },
      '/payType': {
        target: 'https://www.kuwo.cn/openapi/v1/www/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/payType/, ''),
      },
    },
  },
})
