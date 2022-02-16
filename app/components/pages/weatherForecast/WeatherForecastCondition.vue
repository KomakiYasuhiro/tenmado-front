<template lang="pug">

form.condform(@submit.prevent="submit")
    .settings
        .setting.meteorological-observatory
            SelectComponent.select-meteorological-observatory(
                v-model="selectedMeteorologicalObservatory"
                :options="$store.getters['weatherForecastStore/meteorologicalObservatories']"
                optionText="meteorologicalObservatoryName"
                :returnObject="true"
                @input="changeMeteorologicalObservatory"
            )
        .setting.area
            SelectComponent.select-area(
                v-model="selectedLargeAreaCode"
                :disabled="selectedMeteorologicalObservatory == null"
                :options="selectedMeteorologicalObservatory != null ? selectedMeteorologicalObservatory.largeAreas : []"
                optionText="largeAreaName"
                optionValue="largeAreaCode"
                @input="changeLargeArea"
            )
        .setting.interval
            .interval-source
                .interval-source-year
                    SelectComponent.select-interval-source-year(
                        v-model="selectedIntervalSourceYear"
                        :disabled="selectedMeteorologicalObservatory == null || selectedLargeAreaCode == null"
                        :options="selectSourceYears"
                        @input="changeIntervalSourceYear"
                    )
                    div 年
                .interval-source-month
                    SelectComponent.select-interval-source-month(
                        v-model="selectedIntervalSourceMonth"
                        :disabled="selectedMeteorologicalObservatory == null || selectedLargeAreaCode == null || selectedIntervalSourceYear == null"
                        :options="selectSourceMonths"
                        @input="changeIntervalSourceMonth"
                    )
                    div 月
                .interval-source-day
                    SelectComponent.select-interval-source-day(
                        v-model="selectedIntervalSourceDay"
                        :disabled="selectedMeteorologicalObservatory == null || selectedLargeAreaCode == null || selectedIntervalSourceYear == null || selectedIntervalSourceMonth == null"
                        :options="selectSourceDays"
                    )
                    div 日
            .interval-target
                .interval-target-date
                    SelectComponent.select-interval-target-date(
                        v-model="selectedIntervalTargetDate"
                        :disabled="selectedMeteorologicalObservatory == null || selectedLargeAreaCode == null || selectedIntervalSourceYear == null || selectedIntervalSourceMonth == null || selectedIntervalSourceDate == null"
                        :options="dicisionTargetDates()"
                        optionText="stringJpType"
                        optionValue="dateType"
                    )

    .submit
        input(type="submit" value="表示")
    
</template>


<script lang="ts">
import Vue from 'vue'
import SelectComponent from '~/components/ui/SelectComponent.vue'
import { convertDateToString, convertDateToJpString } from '~/utils/date'
import { MeteorologicalObservatoryInterface } from '~/interfaces/weatherForecast/MeteorologicalObservatoryInterface'

interface IntervalTargetDate {
    dateType: Date
    stringType: string
    stringJpType: string
}

interface DataType {
    meteorologicalObservatoryItems?: Array<MeteorologicalObservatoryInterface>
    //地域選択変数
    selectedMeteorologicalObservatory: MeteorologicalObservatoryInterface | null
    selectedLargeAreaCode: string | null

    selectSourceYears: Array<number>
    selectSourceMonths: Array<number>
    selectSourceDays: Array<number>
    selectTargetDates: Array<IntervalTargetDate>

    selectedIntervalSourceYear: number | null
    selectedIntervalSourceMonth: number | null
    selectedIntervalSourceDay: number | null
    selectedIntervalTargetDate: Date | null

    //予報取得期間
    targetPeriod: Array<string> | null
    targetMenu: boolean
}

export default Vue.extend({

    components: {
        SelectComponent,
    },

    data(): DataType {

        return {

            //地域選択変数
            selectedMeteorologicalObservatory: null,
            selectedLargeAreaCode: null,

            selectSourceYears: [],
            selectSourceMonths: [],
            selectSourceDays: [],
            selectTargetDates: [],

            selectedIntervalSourceYear: null,
            selectedIntervalSourceMonth: null,
            selectedIntervalSourceDay: null,

            selectedIntervalTargetDate: null,

            //予報取得期間
            targetPeriod: null,
            targetMenu: false,

        }
    },

    computed: {
        activateSubmit(): boolean {
            return this.selectedLargeAreaCode && this.targetPeriod ? false : true;
        },

        selectedIntervalSourceDate(): Date | null {
            if (this.selectedIntervalSourceYear == null || this.selectedIntervalSourceMonth == null || this.selectedIntervalSourceDay == null) {
                return null
            }
            return new Date(this.selectedIntervalSourceYear, this.selectedIntervalSourceMonth - 1, this.selectedIntervalSourceDay)
        }
    },

    methods: {

        initializeSelectedLargeArea(): void {
            this.selectedLargeAreaCode = null
        },

        initializeSelectedIntervalSourceMonth(): void {
            this.selectedIntervalSourceMonth = null
        },

        initializeSelectedIntervalSourceDay(): void {
            this.selectedIntervalSourceDay = null
        },

        changeMeteorologicalObservatory(): void {
            console.log('OK1')
            this.initializeSelectedLargeArea()
        },

        async changeLargeArea(): Promise<void> {
            console.log('OK2')
            await this.fetchStartDate()
            await this.dicisionSourceYears()
        },

        changeIntervalSourceYear(): void {
            this.initializeSelectedIntervalSourceMonth()
            this.initializeSelectedIntervalSourceDay()
            this.dicisionSourceMonths()
        },

        changeIntervalSourceMonth(): void {
            this.dicisionSourceDays()
            this.initializeSelectedIntervalSourceDay()
        },

        async fetchStartDate(): Promise<void> {
            const params = {
                largeAreaCode: this.selectedLargeAreaCode,
            };

            await this.$store.dispatch('weatherForecastStore/fetchStartDate', params)
        },

        async dicisionSourceYears(): Promise<void> {
            const todayYear = this.$store.getters['weatherForecastStore/today'].getFullYear()
            let startDateYear = this.$store.getters['weatherForecastStore/startDate'].getFullYear()
            this.selectSourceYears = new Array(todayYear - startDateYear + 1).fill(null).map((_, i) => i + startDateYear)
        },

        dicisionSourceMonths(): void {
            const today = this.$store.getters['weatherForecastStore/today']
            const todayYear = today.getFullYear()
            // getMonthだけなぜか0~11の範囲をとる
            const todayMonth = today.getMonth() + 1

            let startDate = this.$store.getters['weatherForecastStore/startDate']
            let startDateYear = startDate.getFullYear()
            let startDateMonth = startDate.getMonth() + 1

            let rangeStartMonth: number = 1
            let rangeEndMonth: number = 12
            if (this.selectedIntervalSourceYear == startDateYear) {
                // 選択した年がstartDateと同じならば、startDateの月を最小値とする
                rangeStartMonth = startDateMonth
            }
            if (this.selectedIntervalSourceYear == todayYear) {
                // 選択した年が本日と同じならば、startDateの月を最小値とする
                rangeEndMonth = todayMonth
            }

            this.selectSourceMonths = new Array(rangeEndMonth - rangeStartMonth + 1).fill(null).map((_, i) => i + rangeStartMonth)

        },

        dicisionSourceDays(): void {

            const today = this.$store.getters['weatherForecastStore/today']
            const todayYear = today.getFullYear()
            const todayMonth = today.getMonth() + 1
            const todayDay = today.getDate()

            let startDate = this.$store.getters['weatherForecastStore/startDate']
            let startDateYear = startDate.getFullYear()
            let startDateMonth = startDate.getMonth() + 1
            let startDateDay = startDate.getDate()

            let rangeStartDay: number = 1
            let rangeEndDay: number = new Date(Number(this.selectedIntervalSourceYear), Number(this.selectedIntervalSourceYear), 0).getDate()
            if (this.selectedIntervalSourceYear == startDateYear && this.selectedIntervalSourceMonth == startDateMonth) {
                // 選択した年月がstartDateと同じならば、startDateの月を最小値とするため
                rangeStartDay = startDateDay
            }
            if (this.selectedIntervalSourceYear == todayYear && this.selectedIntervalSourceMonth == todayMonth) {
                // 選択した年月が本日と同じならば、startDateの月を最小値とするため
                rangeEndDay = todayDay
            }

            this.selectSourceDays = new Array(rangeEndDay - rangeStartDay + 1).fill(null).map((_, i) => i + rangeStartDay)

        },

        dicisionTargetDates(): Array<IntervalTargetDate> {
            if (this.selectedIntervalSourceDate == null) {
                return []
            }
            const days: number = 20
            let selectedIntervalSourceDate: Date = new Date(this.selectedIntervalSourceDate.getTime());

            let selectTargetDates = new Array<IntervalTargetDate>();
            for (let i: number = 0; i < days; i++) {
                let tmpDate: Date = new Date(selectedIntervalSourceDate.getTime())
                tmpDate.setDate(selectedIntervalSourceDate.getDate() + i)
                selectTargetDates.push({
                    dateType: tmpDate,
                    stringType: convertDateToString(tmpDate),
                    stringJpType: convertDateToJpString(tmpDate)
                } as IntervalTargetDate)
                if (tmpDate == this.$store.getters['weatherForecastStore/today']) {
                    break
                }
            }
            return selectTargetDates
        },

        async submit(): Promise<void> {

            if (this.selectedMeteorologicalObservatory == null) {
                return
            }
            if (this.selectedLargeAreaCode == null) {
                return
            }
            if (this.selectedIntervalSourceDate == null) {
                return
            }
            if (this.selectedIntervalTargetDate == null) {
                return
            }

            //パラメータの設定
            const params = {
                largeAreaCode: this.selectedLargeAreaCode,
                reportDateFrom: convertDateToString(this.selectedIntervalSourceDate),
                reportDateTo: convertDateToString(this.selectedIntervalTargetDate),
                forecastdays: "7",
            };

            await this.$store.dispatch('weatherForecastStore/fetchWeatherForecast', params)
        },

    }
})
</script>

<style lang="scss" scoped>
.condform {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .settings {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .setting {
            margin: 10px;
        }

        .meteorological-observatory {
            width: 30%;
        }

        .area {
            width: 30%;
        }

        .interval {
            width: 40%;
            display: flex;
            flex-direction: column;
            align-items: center;

            .interval-source {
                display: flex;

                .interval-source-year {
                    display: flex;
                    align-items: center;
                }

                .interval-source-month {
                    display: flex;
                    align-items: center;
                }

                .interval-source-day {
                    display: flex;
                    align-items: center;
                }
            }
        }
    }
    .submit {
        .submit-button-area {
            width: 100px;

            .submit-button {
                color: white;
            }
        }
    }
}
</style>