<template lang="pug">
article
  Heading(:headingText="headingText")
  Description(:descriptionText="descriptionText")
  .content
    .condition
      WeatherForecastCondition
    template(v-if="$store.getters['weatherForecastStore/weatherForecast'] != null")
      .cards
        template(v-for="(report) in $store.getters['weatherForecastStore/weatherForecast'].reports")
          WeatherForecastCard(:report="report")
  hr.line
  Contact(:contactText="contactText")
  Source(:sources="sources")
</template>

<script lang="ts">
import Vue from 'vue'
import Heading from '~/components/pages/common/Heading.vue'
import WeatherForecastCondition from '~/components/pages/weatherForecast/WeatherForecastCondition.vue'
import WeatherForecastCard from '~/components/pages/weatherForecast/WeatherForecastCard.vue'
import Source from '~/components/pages/common/Source.vue'
import Contact from '~/components/pages/common/Contact.vue'
import Description from '~/components/pages/common/Description.vue'
import { WeatherForecastConditionInterface } from '~/interfaces/weatherForecast/WeatherForecastConditionInterface'

interface DataType {
  headingText: string
  descriptionText: string
  sources: Array<string>
  contactText: string
}

export default Vue.extend({

  components: {
    Heading,
    Description,
    WeatherForecastCondition,
    WeatherForecastCard,
    Source,
    Contact,
  },


  data(): DataType {
    return {
      headingText: "過去の天気予報を検索",
      descriptionText: "過去に行った天気予報を気象台・地方・月次を条件に検索できるサービスです。</br>過去のデータ分析やAI・機械学習のモデリングなどにもお使いいただけます。",
      sources: [
        "出典: <a href='https://www.jma.go.jp/bosai/forecast/'>気象庁ホームページ</a>の過去ページを集計&加工して表示"
      ],
      contactText: "本サービスについてのお問い合わせや<br>過去の天気予報のデータ提供について等<br>お気軽にご連絡ください。<br>"
    }
  },

  head() {
    return {
      title: '過去の天気予報検索サービス',
      meta: [
        { hid: 'description', name: 'description', content: '過去に行った天気予報を気象台・地方・月次を条件に検索できるお手軽便利サービスです。過去のデータ分析やAI・機械学習のモデリングなどにもお使いいただけます。' },
        { hid: 'keywords', name: 'keywords', content: '過去天気予報,天気予報,過去データ,ビッグデータ,データ分析,データサイエンス,統計,機械学習' },

        { hid: 'og:site_name', property: 'og:site_name', content: 'テンマド' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:url', property: 'og:url', content: 'https:/tenmado.app' + this.$route.path + '/' },
        { hid: 'og:title', property: 'og:title', content: '過去の天気予報検索サービス - テンマド' },
        { hid: 'og:description', property: 'og:description', content: '過去に行った天気予報を気象台・地方・月次を条件に検索できるお手軽便利サービスです。過去のデータ分析やAI・機械学習のモデリングなどにもお使いいただけます。' },
      ],
      link: [
        { hid: 'canonical', rel: 'canonical', href: 'https:/tenmado.app' + this.$route.path + '/' }
      ]
    }
  },

  async fetch({ store, query }) {
    await store.dispatch('weatherForecastStore/fetchMeteorologicalObservatories');

    // クエリパラメータがない場合は初期画面
    if (query == null) {
      return
    }

    // クエリパラメータがある場合はまずはクエリパラメータの内容をチェック
    // 全部passしたらクエリパラメータの内容を基に描画
    if (
      (query.meteorologicalObservatoryCode == null) || (query.largeAreaCode == null) || (query.intervalSourceYear == null) || (query.intervalSourceMonth == null)
    ) {
      return
    }

    const condition: WeatherForecastConditionInterface = {
      meteorologicalObservatoryCode: query.meteorologicalObservatoryCode as string,
      largeAreaCode: query.largeAreaCode as string,
      intervalSourceYear: query.intervalSourceYear as string,
      intervalSourceMonth: query.intervalSourceMonth as string,
    }

    await store.dispatch('weatherForecastStore/setCondition', condition)

    const params = {
      largeAreaCode: condition.largeAreaCode,
    }
    await store.dispatch('weatherForecastStore/fetchStartDate', params)

  },


})
</script>

<style lang="scss" scoped>
article {
  display: flex;
  flex-direction: column;
  min-height: 85vh;
}
.content {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.condition {
  margin-top: 50px;
  margin-bottom: 30px;
}
.cards {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>