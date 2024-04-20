import { createProxyMiddleware } from 'http-proxy-middleware'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function (request: VercelRequest, response: VercelResponse) {
  // 创建代理对象并转发请求
  createProxyMiddleware({
    target: 'https://www.kuwo.cn/openapi/v1/www/',
    changeOrigin: true,
    followRedirects: true,
    pathRewrite: { '^/payType': '' },
    on: {
      proxyReq: (proxyReq) => {
        proxyReq.setHeader('referer', 'https://www.kuwo.cn/')
      },
    },
  })(request, response)
}
