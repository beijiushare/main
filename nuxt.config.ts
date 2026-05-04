export default defineNuxtConfig({
  compatibilityDate: '2026-05-03',
  srcDir: 'src/',
  ssr: true,
  nitro: {
    preset: 'static'
  },
  app: {
    head: {
      title: 'Beijiu',
      htmlAttrs: {
        style: 'margin: 0;'
      },
      bodyAttrs: {
        style: 'margin: 0;'
      }
    }
  }
})
