import unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import { scanPages } from './src/utils/vite'

const { root, outDir, entries } = scanPages('src/pages')

export default defineConfig({
  plugins: [
    unocss(),
  ],
  root,
  build: {
    outDir,
    rollupOptions: {
      input: entries,
    },
  },
})
