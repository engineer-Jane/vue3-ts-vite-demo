import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const rootDir = fileURLToPath(new URL('.', import.meta.url))
  const env = loadEnv(mode, rootDir, '')

  return {
    plugins: [vue(), cloudflare()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    // 可选：如果你有后端服务，可通过 VITE_PROXY_TARGET 配置本地代理
    // 例如 VITE_PROXY_TARGET=http://localhost:3000
    server: env.VITE_PROXY_TARGET
      ? {
          proxy: {
            '/api': {
              target: env.VITE_PROXY_TARGET,
              changeOrigin: true,
            },
          },
        }
      : undefined,
  };
})