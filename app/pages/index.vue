<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-layout wrap>
          <div class="condition">
            <WeatherForecastCondition></WeatherForecastCondition>
          </div>
        </v-layout>
      </v-container>
    </v-main>
    <template v-if="$store.getters['weatherForecastStore/weatherForecast'] != null">
      <div class="cards">
        <template
          v-for="(report) in $store.getters['weatherForecastStore/weatherForecast'].reports"
        >
          <WeatherForecastCard :report="report"></WeatherForecastCard>
        </template>
      </div>
    </template>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import WeatherForecastCondition from '~/components/pages/weatherForecast/WeatherForecastCondition.vue'
import WeatherForecastCard from '~/components/pages/weatherForecast/WeatherForecastCard.vue'

export default Vue.extend({

  components: {
    WeatherForecastCondition,
    WeatherForecastCard
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