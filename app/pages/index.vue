<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-layout wrap>
          <WeatherForecastCondition></WeatherForecastCondition>
          <v-row>
            <v-col>
              <v-card class="logo py-4 d-flex">
                <v-row justify="center">
                  <v-col cols="12">
                    <v-simple-table fixed-header height="300px">
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">予測日</th>
                            <th class="text-left">予報日</th>
                            <th class="text-left">予報</th>
                            <th class="text-left">降水確率</th>
                            <th class="text-left">信頼性</th>
                            <th class="text-left">最低気温</th>
                            <th class="text-left">最低気温下限</th>
                            <th class="text-left">最低気温上限</th>
                            <th class="text-left">最高気温</th>
                            <th class="text-left">最高気温下限</th>
                            <th class="text-left">最低気温上限</th>
                          </tr>
                        </thead>
                        <tbody
                          v-if="$store.getters['weatherForecastStore/weatherForecast'] != null"
                        >
                          <template
                            v-for="(report) in $store.getters['weatherForecastStore/weatherForecast'].reports"
                          >
                            <template v-for="(forecast) in report.forecasts">
                              <tr>
                                <td>{{ report.reportDate }}</td>
                                <td>{{ forecast.forecastTargetDate }}</td>
                                <td>{{ forecast.weather }}</td>
                                <td>{{ forecast.pop }}</td>
                                <td>{{ forecast.reliability }}</td>
                                <td>{{ forecast.lowestTemperature }}</td>
                                <td>{{ forecast.lowestTemperatureLower }}</td>
                                <td>{{ forecast.lowestTemperatureUpper }}</td>
                                <td>{{ forecast.highestTemperature }}</td>
                                <td>{{ forecast.highestTemperatureLower }}</td>
                                <td>{{ forecast.highestTemperatureUpper }}</td>
                              </tr>
                            </template>
                          </template>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import WeatherForecastCondition from '~/components/pages/weatherForecast/WeatherForecastCondition.vue'

export default Vue.extend({

  components: {
    WeatherForecastCondition
  },

  async fetch({ store }) {
    await store.dispatch('weatherForecastStore/fetchMeteorologicalObservatories');
  },


})
</script>
