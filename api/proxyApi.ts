import { createProxyMiddleware } from 'http-proxy-middleware'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function (request: VercelRequest, response: VercelResponse) {
  // 创建代理对象并转发请求
  createProxyMiddleware({
    target: 'https://www.kuwo.cn/api/www/',
    changeOrigin: true,
    followRedirects: true,
    pathRewrite: { '^/api': '' },
    on: {
      proxyReq: (proxyReq) => {
        proxyReq.setHeader('referer', 'https://www.kuwo.cn/')
      },
    },
  })(request, response)
}
