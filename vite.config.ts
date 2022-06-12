import { defineConfig } from 'vite'
import unocss from 'unocss/vite'
import { resolveHtml } from './src/utils/vite'

const { root, outDir, entries } = resolveHtml('src/pages')

export default defineConfig({
  plugins: [unocss()],
  root,
  build: {
    outDir,
    rollupOptions: {
      input: entries,
    },
  },
})
