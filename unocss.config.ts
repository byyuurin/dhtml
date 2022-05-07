import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  shortcuts: [],
  safelist: [],
  presets: [
    presetAttributify(),
    presetWind(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
      },
    }),
  ],
  transformers: [transformerDirectives()],
})
