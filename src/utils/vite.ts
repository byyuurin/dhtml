import { resolve as pathResolve } from 'path'
import fs from 'fs'

interface resolveHtmlOptions {
  /**
   * output path for build
   * @default "dist"
   */
  output?: string
}

export function resolveHtml(folder: string, options: resolveHtmlOptions = {}) {
  const { output = 'dist' } = options
  const resolve = (path: string, dir = '.') => pathResolve(dir, path)
  const root = resolve(folder)
  const entries: Record<string, string> = {}
  const register = (path: string, parent: string) => {
    const fullPath = resolve(path, parent)
    const isDirectory = fs.statSync(fullPath).isDirectory()

    if (!(/\.html?$/.test(path) || isDirectory))
      return

    if (isDirectory) {
      fs.readdirSync(fullPath).forEach((p) => register(`${path}/${p}`, folder))
      return
    }

    const name = path.replace(/\/?(?:index)?\.html?$/, '').replace(/\//g, '_') || 'main'
    entries[name] = fullPath
  }

  fs.readdirSync(root).forEach((path) => register(path, folder))

  return {
    root,
    outDir: resolve(output),
    entries,
  }
}
