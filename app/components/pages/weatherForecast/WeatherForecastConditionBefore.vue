<template>
    <v-row>
        <v-col>
            <v-card class="logo py-4">
                <v-form ref="form">
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
                                        :rules="[(v) => v != null ? (v.length != 2 ? '期間で指定してください' : !!v) : !!v]"
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="targetPeriod"
                                    range
                                    :show-current="false"
                                    :allowed-dates="allowedDate"
                                    @change="targetPeriodSave"
                                ></v-date-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-col cols="10">
                            <v-btn
                                class="mr-4"
                                block
                                @click="submit"
                                :disabled="activateSubmit"
                            >submit</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
        </v-col>
    </v-row>
</template>


<script lang="ts">
import Vue from 'vue'

import { MeteorologicalObservatoryInterface } from '~/interfaces/weatherForecast/MeteorologicalObservatoryInterface'

interface DataType {
    meteorologicalObservatoryItems?: Array<MeteorologicalObservatoryInterface>
    //地域選択変数
    selectedMeteorologicalObservatory: MeteorologicalObservatoryInterface
    selectedLargeArea: string | null
    //予報取得期間
    targetPeriod: Array<string> | null
    targetMenu: boolean
}

interface DataType {
    meteorologicalObservatoryItems?: Array<MeteorologicalObservatoryInterface>
    //地域選択変数
    selectedMeteorologicalObservatory: MeteorologicalObservatoryInterface
    selectedLargeArea: string | null
    //予報取得期間
    targetPeriod: Array<string> | null
    targetMenu: boolean
}

export default Vue.extend({
    data(): DataType {
        const selectedMeteorologicalObservatory: MeteorologicalObservatoryInterface = this.$store.getters['weatherForecastStore/meteorologicalObservatories'][0]
        const selectedLargeAreaCode: string = selectedMeteorologicalObservatory.largeAreas[0].largeAreaCode
        this.$store.dispatch('weatherForecastStore/fetchStartDate', {
            largeAreaCode: selectedLargeAreaCode,
        })

        return {

            //地域選択変数
            selectedMeteorologicalObservatory: selectedMeteorologicalObservatory,
            selectedLargeArea: selectedLargeAreaCode,

            //予報取得期間
            targetPeriod: null,
            targetMenu: false,
        }
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
            if (this.targetPeriod == null || this.targetPeriod.length != 2) {
                return
            }

            // 指定日付のfromとtoを確定
            let fromDate: string;
            let toDate: string;
            if (this.targetPeriod[0] <= this.targetPeriod[1]) {
                fromDate = this.targetPeriod[0]
                toDate = this.targetPeriod[1]
            } else {
                fromDate = this.targetPeriod[1]
                toDate = this.targetPeriod[0]
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

        targetPeriodSave(saving: boolean) {
            this.targetMenu = saving;
        },
    }
})
</script>

<style scoped>
</style>