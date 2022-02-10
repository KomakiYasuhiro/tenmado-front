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
                        :items="meteorologicalObservatoryItems"
                        :rules="[(v) => !!v || '必須項目です']"
                        label="気象台"
                        item-value="meteorologicalObservatoryCode"
                        item-text="meteorologicalObservatoryName"
                        prepend-icon="mdi-map-marker-radius"
                        return-object
                        @click="initializeLargeArea"
                        required
                      ></v-select>
                    </v-col>

                    <v-col cols="3">
                      <v-select
                        v-model="selectedLargeArea"
                        :disabled="!selectedMeteorologicalObservatory"
                        :items="selectedMeteorologicalObservatory ? selectedMeteorologicalObservatory.largeAreas : []"
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
                        <tbody v-if="weatherForecasts != null">
                          <template v-for="(report) in weatherForecasts.reports">
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
        <h1>Stars: {{ JSON.stringify($store.getters['meteorologicalObservatoryStore/meteorologicalObservatories'][0].meteorologicalObservatoryName) }}</h1>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

import { MeteorologicalObservatoryInterface } from '~/interfaces/MeteorologicalObservatoryInterface'
import { WeatherForecastInterface } from '~/interfaces/WeatherForecastInterface'

interface DataType {
  valid: any
  meteorologicalObservatoryItems?: Array<MeteorologicalObservatoryInterface>
  //地域選択変数
  selectedMeteorologicalObservatory: MeteorologicalObservatoryInterface | null
  selectedLargeArea: string | null
  //予報取得期間
  minStartDate: string
  activePicker: any
  targetPeriod: any
  targetMenu: boolean
  //予報データ
  weatherForecasts: WeatherForecastInterface | null
}

export default Vue.extend({
  data(): DataType {
    return {
      valid: null,

      //地域選択変数
      selectedMeteorologicalObservatory: null,
      selectedLargeArea: null,

      //予報取得期間
      minStartDate: "",
      activePicker: null,
      targetPeriod: null,
      targetMenu: false,

      //予報データ
      weatherForecasts: null,
    }
  },

  watch: {
    menu(val: any) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },

  async fetch({ store }) {
    await store.dispatch('meteorologicalObservatoryStore/fetchMeteorologicalObservatories');
  },

  async asyncData({ $axios }) {
    //地域取得APIの呼び出し
    try {
      let res = await $axios.$get("/api/weatherforecast/meteorologicalobservatory")
      let meteorologicalObservatoryItems = res.meteorological_observatories;
      let selectedMeteorologicalObservatory =
        meteorologicalObservatoryItems[0];
      let selectedLargeArea =
        selectedMeteorologicalObservatory.largeAreas[0].largeAreaCode;

      return {
        meteorologicalObservatoryItems: meteorologicalObservatoryItems,
        selectedMeteorologicalObservatory: selectedMeteorologicalObservatory,
        selectedLargeArea: selectedLargeArea,
      };
    } catch (err) {
      // TODO
    }
  },

  computed: {
    activateSubmit(): boolean {
      return this.selectedLargeArea && this.targetPeriod ? false : true;
    },
  },

  methods: {
    rowSpanCalc(): number {
      console.log("よばれている");
      if (this.weatherForecasts != null) {
        const count = this.weatherForecasts.reports.reduce(
          (total: any, curr: any) => total + curr.forecasts.length,
          0
        );
        console.log("★かうんと", count);
        return count;
      }
      else {
        return 0
      }
    },

    initializeLargeArea(): void {
      this.selectedLargeArea = null;
    },

    getStartDate(): void {
      //パラメータの設定
      const params = {
        largeAreaCode: this.selectedLargeArea,
      };

      //APIの呼び出し
      const response = this.$axios
        .$get("/api/weatherforecast/startdate", { params })
        .then((res) => {
          this.minStartDate = res.startDate.toString();
        })
        .catch((err) => {
          console.log("response error", err);
        });
    },

    allowedDate(val): boolean {
      let today = new Date();
      today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      if (!this.minStartDate) {
        //初期表示時
        return (
          today >= new Date(val) && new Date(val) >= new Date("2021-12-10")
        );
      } else {
        //データ取得開始日付が取れているとき
        return (
          today >= new Date(val) &&
          new Date(val) >= new Date(this.minStartDate.toString())
        );
      }
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

      //APIの呼び出し
      const response = this.$axios
        .$get("/api/weatherforecast/", { params })
        .then((res) => {
          console.log("params", params);
          this.weatherForecasts = res;
          console.log("response data", this.weatherForecasts);
        })
        .catch((err) => {
          console.log("response error", err);
        });
    },

    targetPeriodSave(targetPeriod) {
      this.targetMenu = targetPeriod;
    },
  },
})
</script>
