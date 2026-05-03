export default defineNuxtConfig({
  compatibilityDate: '2026-05-03',
  ssr: true,
  nitro: {
    preset: 'static'
  },
  app: {
    head: {
      title: 'Beijiu',
      htmlAttrs: {
        style: 'overflow: hidden; height: 100%;'
      },
      bodyAttrs: {
        style: 'overflow: hidden; height: 100%; margin: 0;'
      }
    }
  }
})
