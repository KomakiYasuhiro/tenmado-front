<template lang="pug">
artile
  Heading(:value="headingValue")
  .content
    .condition
      WeatherForecastCondition2
    template(v-if="$store.getters['weatherForecastStore/weatherForecast'] != null")
      .cards
        template(v-for="(report) in $store.getters['weatherForecastStore/weatherForecast'].reports")
          WeatherForecastCard(:report="report")
</template>

<script lang="ts">
import Vue from 'vue'
import Heading from '~/components/pages/common/Heading.vue'
import WeatherForecastCondition2 from '~/components/pages/weatherForecast/WeatherForecastCondition2.vue'
import WeatherForecastCard from '~/components/pages/weatherForecast/WeatherForecastCard.vue'

interface DataType {
  headingValue: string
}

export default Vue.extend({

  components: {
    Heading,
    WeatherForecastCondition2,
    WeatherForecastCard,
  },



  data(): DataType {
    return {
      headingValue: "過去の天気予報を検索"
    }
  },

  async fetch({ store }) {
    await store.dispatch('weatherForecastStore/fetchMeteorologicalObservatories');
  },


})
</script>

<style lang="scss" scoped>
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