import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetWind(),
    presetIcons({
      cdn: 'https://esm.sh/',
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
  shortcuts: [],
  safelist: [],
})
