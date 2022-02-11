<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-layout wrap>
          <v-row>
            <v-col>
              <v-card class="logo py-4">
                <v-form ref="form" v-model="valid">
                  <v-row justify="center">
                    <v-col cols="3">
                      <v-select
                        v-model="selectedMeteorologicalObservatory"
                        :items="$store.getters['weatherForecastStore/meteorologicalObservatories']"
                        :rules="[(v) => !!v || '必須項目です']"
                        label="気象台"
                        item-value="meteorologicalObservatoryCode"
                        item-text="meteorologicalObservatoryName"
                        prepend-icon="mdi-map-marker-radius"
                        return-object
                        @change="initializeLargeArea"
                        required
                      ></v-select>
                    </v-col>

                    <v-col cols="3">
                      <v-select
                        v-model="selectedLargeArea"
                        :items="selectedMeteorologicalObservatory.largeAreas"
                        :rules="[(v) => !!v || '必須項目です']"
                        label="地域"
                        item-value="largeAreaCode"
                        item-text="largeAreaName"
                        prepend-icon="mdi-map-marker-radius"
                        required
                        @change="getStartDate"
                      ></v-select>
                    </v-col>

                    <v-col cols="3">
                      <v-menu
                        ref="targetMenu"
                        v-model="targetMenu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="targetPeriod"
                            label="予報取得期間"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="targetPeriod"
                          range
                          :show-current="false"
                          :active-picker.sync="activePicker"
                          :allowed-dates="allowedDate"
                          @change="targetPeriodSave"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                  <v-row justify="center">
                    <v-col cols="10">
                      <v-btn class="mr-4" block @click="submit" :disabled="activateSubmit">submit</v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card>
            </v-col>
          </v-row>
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
        <!-- Storeの参照例 -->
        <p>気象台一覧の一部: {{ JSON.stringify($store.getters['weatherForecastStore/meteorologicalObservatories'][0].meteorologicalObservatoryName) }}</p>
        <br />
        <p>天気予報の一部: {{ $store.getters['weatherForecastStore/weatherForecast'] ? JSON.stringify($store.getters['weatherForecastStore/weatherForecast'].meteorologicalObservatoryName) : '' }}</p>
        <br />
        <p>startDate: {{ $store.getters['weatherForecastStore/startDate'] }}</p>
        <br />
        <p>selectedLargeArea: {{ selectedLargeArea }}</p>
        <br />
        <p>selectedMeteorologicalObservatory: {{ selectedMeteorologicalObservatory }}</p>
        <br />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

import { MeteorologicalObservatoryInterface } from '~/interfaces/weatherForecast/MeteorologicalObservatoryInterface'
import { WeatherForecastInterface } from '~/interfaces/weatherForecast/WeatherForecastInterface'

interface DataType {
  valid: any
  meteorologicalObservatoryItems?: Array<MeteorologicalObservatoryInterface>
  //地域選択変数
  selectedMeteorologicalObservatory: MeteorologicalObservatoryInterface
  selectedLargeArea: string | null
  //予報取得期間
  activePicker: any
  targetPeriod: any
  targetMenu: boolean
}

function getStartDate(this): void {
  const params = {
    largeAreaCode: this.selectedLargeArea,
  };

  this.$store.dispatch('weatherForecastStore/fetchStartDate', params)
}

export default Vue.extend({
  data(): DataType {
    const selectedMeteorologicalObservatory: MeteorologicalObservatoryInterface = this.$store.getters['weatherForecastStore/meteorologicalObservatories'][0]
    const selectedLargeAreaCode: string = selectedMeteorologicalObservatory.largeAreas[0].largeAreaCode
    this.$store.dispatch('weatherForecastStore/fetchStartDate', {
      largeAreaCode: selectedLargeAreaCode,
    })

    return {
      valid: null,

      //地域選択変数
      selectedMeteorologicalObservatory: selectedMeteorologicalObservatory,
      selectedLargeArea: selectedLargeAreaCode,

      //予報取得期間
      activePicker: null,
      targetPeriod: null,
      targetMenu: false,
    }
  },

  watch: {
    menu(val: any) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },

  async fetch({ store }) {
    await store.dispatch('weatherForecastStore/fetchMeteorologicalObservatories');
  },

  computed: {
    activateSubmit(): boolean {
      return this.selectedLargeArea && this.targetPeriod ? false : true;
    },
  },

  methods: {

    initializeLargeArea(): void {
      this.selectedLargeArea = null;
    },

    getStartDate(): void {
      const params = {
        largeAreaCode: this.selectedLargeArea,
      };

      this.$store.dispatch('weatherForecastStore/fetchStartDate', params)
    },

    allowedDate(val): boolean {
      let today = new Date();
      today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      return (
        today >= new Date(val) &&
        new Date(val) >= new Date(this.$store.getters['weatherForecastStore/startDate'])
      );
    },

    submit(): void {
      //日付のソート
      let fromDate = this.targetPeriod[0];
      let toDate = this.targetPeriod[1];
      if (fromDate > toDate) {
        let tempDate;
        tempDate = fromDate;
        fromDate = toDate;
        toDate = tempDate;
      }

      //パラメータの設定
      const params = {
        largeAreaCode: this.selectedLargeArea,
        reportDateFrom: fromDate,
        reportDateTo: toDate,
        forecastdays: "7",
      };

      this.$store.dispatch('weatherForecastStore/fetchWeatherForecast', params)
    },

    targetPeriodSave(targetPeriod) {
      this.targetMenu = targetPeriod;
    },
  },
})
</script>
