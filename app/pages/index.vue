<template>
  <div>
    <div class="condition">
      <WeatherForecastCondition2></WeatherForecastCondition2>
    </div>
    <template v-if="$store.getters['weatherForecastStore/weatherForecast'] != null">
      <div class="cards">
        <template
          v-for="(report) in $store.getters['weatherForecastStore/weatherForecast'].reports"
        >
          <WeatherForecastCard :report="report"></WeatherForecastCard>
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import WeatherForecastCondition2 from '~/components/pages/weatherForecast/WeatherForecastCondition2.vue'
import WeatherForecastCard from '~/components/pages/weatherForecast/WeatherForecastCard.vue'
export default Vue.extend({

  components: {
    WeatherForecastCondition2,
    WeatherForecastCard,
  },

  async fetch({ store }) {
    await store.dispatch('weatherForecastStore/fetchMeteorologicalObservatories');
  },


})
</script>

<style lang="scss" scoped>
.condition {
  margin-bottom: 20px;
}
.cards {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>