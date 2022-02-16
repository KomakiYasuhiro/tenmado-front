<template lang="pug">
article
  Heading(:value="headingValue")
  .content
    .condition
      WeatherForecastCondition2
    template(v-if="$store.getters['weatherForecastStore/weatherForecast'] != null")
      .cards
        template(v-for="(report) in $store.getters['weatherForecastStore/weatherForecast'].reports")
          WeatherForecastCard(:report="report")
  Contact(:contacts="contacts")
  Source(:sources="sources")
</template>

<script lang="ts">
import Vue from 'vue'
import Heading from '~/components/pages/common/Heading.vue'
import WeatherForecastCondition2 from '~/components/pages/weatherForecast/WeatherForecastCondition2.vue'
import WeatherForecastCard from '~/components/pages/weatherForecast/WeatherForecastCard.vue'
import Source from '~/components/pages/common/Source.vue'
import Contact from '~/components/pages/common/Contact.vue'

interface DataType {
  headingValue: string
  sources: Array<string>
  contacts: Array<string>
}

export default Vue.extend({

  components: {
    Heading,
    WeatherForecastCondition2,
    WeatherForecastCard,
    Source,
    Contact,
  },



  data(): DataType {
    return {
      headingValue: "過去の天気予報を検索",
      sources: [
        "出典: <a href='https://www.jma.go.jp/bosai/forecast/'>気象庁ホームページ</a>の過去ページを集計&加工して表示"
      ],
      contacts: [
        "本サービスについてのお問い合わせや<br>上記の過去天気予報情報のデータ提供について等<br>お気軽にご連絡ください。<br>"
      ]
    }
  },

  async fetch({ store }) {
    await store.dispatch('weatherForecastStore/fetchMeteorologicalObservatories');
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