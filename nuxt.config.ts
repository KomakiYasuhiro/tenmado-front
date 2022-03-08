import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  ssr: true,
  srcDir: 'app/',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - テンマド',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'テンマドは、...' },
      { hid: 'keywords', name: 'keywords', content: 'ビッグデータ,データ分析,データサイエンス,統計,機械学習' },

      { hid: 'og:site_name', property: 'og:site_name', content: 'テンマド' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://tenmado.app/' },
      { hid: 'og:title', property: 'og:title', content: 'テンマド' },
      { hid: 'og:description', property: 'og:description', content: 'テンマドは、...' },
      { hid: 'og:image', property: 'og:image', content: 'https://tenmado.app/image/tenmado-icon.svg' },

      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@tenmado_app' },
      { hid: 'twitter:creator', name: 'twitter:creator', content: '@tenmado_app' },

      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/image/tenmado-icon.svg' },
      { hid: 'canonical', rel: 'canonical', href: 'https:/tenmado.app/' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/global.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // componentsフォルダが階層になっている場合、例えば/components/util/SampleComponent.vueとなっている場合は、 
  // 基本<util-sample-component />のようにフォルダ名を含めます。
  // フォルダ階層を無視して<sample-component />としたい場合、以下のように設定する
  components: [
    {
      path: '@/components/',
      pathPrefix: false
    }
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/gtm',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },

  proxy: {
    '/api/': {
      target: 'https://tenmado-api-6jbikhj2nq-an.a.run.app',
      pathRewrite: { '^/api/': '/' }
    },
  },

  publicRuntimeConfig: {
    gtm: {
      id: process.env.GOOGLE_TAG_MANAGER_ID
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
export default config
