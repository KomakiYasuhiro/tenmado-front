<template lang="pug">
.page
  Breadcrumbs(:layers="breadcrumbsLayers")
  article
    Heading(:headingText="headingText")
    Description(:descriptionText="descriptionText")
    .content
      h2.content-title 気象台・地方を選択
      .kubun-list
        template(v-for="(kubun, index_i) in $store.getters['weatherForecastStore/kubuns']")
          input.accordion-check(:id="'accordion-check' + index_i" type="checkbox")
          label.accordion-label(:for="'accordion-check' + index_i") {{ kubun.kubunName }}
          .accordion-content
            .meteorologicalobservatory-list
              template(v-for="(meteorologicalObservatory, index_j) in kubun.meteorologicalObservatories")
                input.accordion-check(:id="'accordion-check' + index_i + '-' + index_j" type="checkbox")
                label.accordion-label(:for="'accordion-check' + index_i + '-' + index_j") {{ meteorologicalObservatory.meteorologicalObservatoryName != "気象庁" ? meteorologicalObservatory.meteorologicalObservatoryName : "東京気象庁" }}
                .accordion-content
                    .to_area_links(v-for="(largeArea) in meteorologicalObservatory.largeAreas")
                      nuxt-link.to_area_link(:to="$route.path + largeArea.largeAreaCode + '/'") {{ largeArea.largeAreaName }}
    WeatherForecastContentFooterVue
</template>

<script lang="ts">
import Vue from 'vue'
import Breadcrumbs from '~/components/pages/common/Breadcrumbs.vue'
import Heading from '~/components/pages/common/Heading.vue'
import WeatherForecastContentFooterVue from '~/components/pages/weatherForecast/WeatherForecastContentFooter.vue'
import Description from '~/components/pages/common/Description.vue'
import { BreadcrumbsLayerInterface } from '~/interfaces/common/BreadcrumbsLayerInterface'
import { Head } from '~/interfaces/common/Head'

interface DataType {
  breadcrumbsLayers: Array<BreadcrumbsLayerInterface>
  headingText: string
  descriptionText: string
}

export default Vue.extend({

  components: {
    Breadcrumbs,
    Heading,
    Description,
    WeatherForecastContentFooterVue
  },


  data(): DataType {
    return {
      breadcrumbsLayers: [
        {
          path: "/weatherforecast/",
          name: "過去天気予報データベース"
        }
      ],
      headingText: "過去天気予報データベース",
      descriptionText: "過去に行われた天気予報を蓄積しているデータベースです。気象台・地方・月次を条件に検索可能です。</br>過去のデータ分析やAI・機械学習のモデリングなどにもお使いいただけます。",
    }
  },

  head(): Head {
    return {
      title: '過去天気予報データベース',
      meta: [
        { hid: 'description', name: 'description', content: '過去に行われた天気予報を気象台・地方・月次を条件に検索できるお手軽便利サービスです。過去のデータ分析やAI・機械学習のモデリングなどにもお使いいただけます。' },
        { hid: 'keywords', name: 'keywords', content: '過去天気予報,天気予報,過去データ,ビッグデータ,データ分析,データサイエンス,統計,機械学習' },

        { hid: 'og:site_name', property: 'og:site_name', content: 'テンマド' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:url', property: 'og:url', content: 'https:/tenmado.app' + (this.$route.path.substr(-1) == '/' ? this.$route.path : this.$route.path + '/')  },
        { hid: 'og:title', property: 'og:title', content: '過去天気予報データベース - テンマド' },
        { hid: 'og:description', property: 'og:description', content: '過去に行われた天気予報を気象台・地方・月次を条件に検索できるお手軽便利サービスです。過去のデータ分析やAI・機械学習のモデリングなどにもお使いいただけます。' },
      ],
      link: [
        { hid: 'canonical', rel: 'canonical', href: 'https:/tenmado.app' + (this.$route.path.substr(-1) == '/' ? this.$route.path : this.$route.path + '/')  }
      ]
    }
  },

  async fetch({ store }) {
    if (store.getters['weatherForecastStore/kubuns'] == null) {
      await store.dispatch('weatherForecastStore/fetchKubuns')
    }
  },


})
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 85vh;

  article {
    display: flex;
    flex-direction: column;

    .content {
      width: 800px;
      margin: 0 auto;
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;

      .content-title {
        color: #555;
        font-size: 18px;
        font-weight: normal;
        margin-bottom: 5px;
      }

      .to_area_link {
        color: #4e8fd3
      }
    }
  }

}




</style>