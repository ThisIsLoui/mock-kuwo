import { createProxyMiddleware } from 'http-proxy-middleware'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function (request: VercelRequest, response: VercelResponse) {
  // 创建代理对象并转发请求
  createProxyMiddleware({
    target: 'https://comment.kuwo.cn/com.s',
    changeOrigin: true,
    followRedirects: true,
    pathRewrite: { '^/comment': '' },
    on: {
      proxyReq: (proxyReq) => {
        proxyReq.setHeader('referer', 'https://www.kuwo.cn/')
      },
    },
  })(request, response)
}
