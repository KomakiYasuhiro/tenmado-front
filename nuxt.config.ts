import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  ssr: true,
  srcDir: 'app/',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '過去の天気予報検索サービス - テンマド',
    htmlAttrs: {
      lang: 'jp'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'テンマドは、過去に行った天気予報を気象台・地方・月次を条件に検索できるお手軽便利サービスです。過去のデータ分析やAI・機械学習のモデリングなどにもお使いいただけます。' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/image/tenmado-icon.svg' }
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
