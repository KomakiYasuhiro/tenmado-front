<template lang="pug">

form.condform(@submit.prevent="submit")
    .settings
        .setting.meteorological-observatory
            label.selectlabel-meteorological-observatory 気象台
            .select.selectmark
                select.select-meteorological-observatory(v-model="selectedMeteorologicalObservatory" @change="changeMeteorologicalObservatory")
                    option(disabled selected :value="null")  選択してください
                    option(v-for="meteorologicalObservatory in $store.getters['weatherForecastStore/meteorologicalObservatories']" :value="meteorologicalObservatory")
                        | {{ meteorologicalObservatory.meteorologicalObservatoryName }}
        .setting.area
            label.selectlabel-area 地域
            .select.selectmark
                select.select-area(v-model="selectedLargeAreaCode" :disabled="selectedMeteorologicalObservatory == null" @change="changeLargeArea")
                    option(disabled selected :value="null")  選択してください
                    template(v-if="selectedMeteorologicalObservatory != null")
                        option(v-for="largeArea in selectedMeteorologicalObservatory.largeAreas" :value="largeArea.largeAreaCode")
                            | {{ largeArea.largeAreaName }}
        .setting.interval
            lavel.selectlabel-interval 予報期間
            .interval-area
                .interval-source
                    .interval-source-year
                        .select.selectmark
                            select.select-interval-source-year(v-model="selectedIntervalSourceYear" :disabled="selectedMeteorologicalObservatory == null || selectedLargeAreaCode == null" @change="changeIntervalSourceYear")
                                option(disabled select :value="null") 選択してください
                                option(v-for="year in selectSourceYears" :value="year") {{ year }}
                        div 年
                    .interval-source-month
                        .select.selectmark
                            select.select-interval-source-month(v-model="selectedIntervalSourceMonth" :disabled="selectedMeteorologicalObservatory == null || selectedLargeAreaCode == null || selectedIntervalSourceYear == null" @change="changeIntervalSourceMonth")
                                option(disabled select :value="null") 選択してください
                                option(v-for="month in selectSourceMonths" :value="month") {{ month }}
                        div 月
                    .interval-source-day
                        .select.selectmark
                            select.select-interval-source-day(v-model="selectedIntervalSourceDay" :disabled="selectedMeteorologicalObservatory == null || selectedLargeAreaCode == null || selectedIntervalSourceYear == null || selectedIntervalSourceMonth == null")
                                option(disabled select :value="null") 選択してください
                                option(v-for="day in selectSourceDays" :value="day") {{ day }}
                        div 日
                .interval-target
                    .interval-target-date
                        .select.selectmark
                            select.select-interval-target-date(v-model="selectedIntervalTargetDate" :disabled="selectedMeteorologicalObservatory == null || selectedLargeAreaCode == null || selectedIntervalSourceYear == null || selectedIntervalSourceMonth == null || selectedIntervalSourceDate == null")
                                option(disabled select :value="null") 選択してください
                                option(v-for="date in dicisionTargetDates()" :value="date") {{ date.stringJpType }}


    .submit
        .submit-button-area
            input.submit-button.button.button-primary(type="submit" value="表示")


    .isosceles-triangle(v-if="isDisplay")
    
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
    selectedIntervalTargetDate: IntervalTargetDate | null

    //予報取得期間
    targetPeriod: Array<string> | null
    targetMenu: boolean

    isDisplay: Boolean
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

            // 表示しているか否か
            isDisplay: false,

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
            this.initializeSelectedLargeArea()
        },

        async changeLargeArea(): Promise<void> {
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
            const days: number = 30
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
                if (tmpDate === this.$store.getters['weatherForecastStore/today']) {
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
                reportDateTo: convertDateToString(this.selectedIntervalTargetDate.dateType),
                forecastdays: "7",
            };

            await this.$store.dispatch('weatherForecastStore/fetchWeatherForecast', params)

            this.isDisplay = true
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
            display: flex;
            flex-direction: column;
        }

        .area {
            width: 30%;
        }

        .interval {
            width: 40%;

            .interval-area {
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

                .interval-target {
                    width: 100%;
                }
            }
        }
    }
    .submit {
        width: 100%;
        display: flex;
        justify-content: center;
        .submit-button-area {
            width: 200px;

            .submit-button {
                width: 100%;
            }
        }
    }

    .isosceles-triangle {
        margin-top: 20px;
        border-top: 20px solid #4e8fd3;
        border-right: 70px solid transparent;
        border-left: 70px solid transparent;
    }
}
</style>