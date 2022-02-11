<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-layout wrap>
          <WeatherForecastCondition></WeatherForecastCondition>
          <template v-if="$store.getters['weatherForecastStore/weatherForecast'] != null">
            <template
              v-for="(report) in $store.getters['weatherForecastStore/weatherForecast'].reports"
            >
              <WeatherForecastCard :report="report"></WeatherForecastCard>
            </template>
          </template>
        </v-layout>
      </v-container>
    </v-main>
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
