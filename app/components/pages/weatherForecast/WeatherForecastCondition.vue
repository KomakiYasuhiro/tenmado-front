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
            label.selectlabel-interval 対象年月
            .interval-area
                .interval-source
                    .interval-source-year
                        .select.selectmark
                            select.select-interval-source-year(v-model="selectedIntervalSourceYear" :disabled="selectedMeteorologicalObservatory == null || selectedLargeAreaCode == null" @change="changeIntervalSourceYear")
                                option(disabled select :value="null") 選択してください
                                option(v-for="year in selectSourceYears" :value="year") {{ year }}
                        .interval-source-unit.interval-source-unit-year 年
                    .interval-source-month
                        .select.selectmark
                            select.select-interval-source-month(v-model="selectedIntervalSourceMonth" :disabled="selectedMeteorologicalObservatory == null || selectedLargeAreaCode == null || selectedIntervalSourceYear == null")
                                option(disabled select :value="null") 選択してください
                                option(v-for="month in selectSourceMonths" :value="month") {{ month }}
                        .interval-source-unit.interval-source-unit-month 月


    .submit
        .submit-button-area
            input.submit-button.button.button-primary(type="submit" value="表示")


    .isosceles-triangle(v-if="isDisplay")
    
</template>


<script lang="ts">
import Vue from 'vue'
import SelectComponent from '~/components/ui/SelectComponent.vue'
import { MeteorologicalObservatoryInterface } from '~/interfaces/weatherForecast/MeteorologicalObservatoryInterface'
import { WeatherForecastConditionInterface } from '~/interfaces/weatherForecast/WeatherForecastConditionInterface'


interface DataType {
    meteorologicalObservatoryItems?: Array<MeteorologicalObservatoryInterface>
    //地域選択変数
    selectedMeteorologicalObservatory: MeteorologicalObservatoryInterface | null
    selectedLargeAreaCode: string | null

    selectSourceYears: Array<number>
    selectSourceMonths: Array<number>

    selectedIntervalSourceYear: number | null
    selectedIntervalSourceMonth: number | null

    //予報取得期間
    // targetPeriod: Array<string> | null
    // targetMenu: boolean

    isDisplay: Boolean
}

export default Vue.extend({

    components: {
        SelectComponent,
    },

    data(): DataType {

        // 条件を格納しているstoreに内容があればそれをフォームの初期値にする
        const condition: WeatherForecastConditionInterface = this.$store.getters['weatherForecastStore/condition']
        const selectedMeteorologicalObservatory = condition ? this.$store.getters['weatherForecastStore/meteorologicalObservatories'].find((v) => v.meteorologicalObservatoryCode === condition.meteorologicalObservatoryCode) : null
        const selectedLargeAreaCode = condition ? condition.largeAreaCode : null
        const selectedIntervalSourceYear = condition ? Number(condition.intervalSourceYear) : null
        const selectedIntervalSourceMonth = condition ? Number(condition.intervalSourceMonth) : null
        const selectSourceYears = this.$store.getters['weatherForecastStore/selectSourceYears']
        const selectSourceMonths = this.$store.getters['weatherForecastStore/selectSourceMonths'](selectedIntervalSourceYear)

        return {

            //地域選択変数
            selectedMeteorologicalObservatory: selectedMeteorologicalObservatory,
            selectedLargeAreaCode: selectedLargeAreaCode,

            selectSourceYears: selectSourceYears,
            selectSourceMonths: selectSourceMonths,

            selectedIntervalSourceYear: selectedIntervalSourceYear,
            selectedIntervalSourceMonth: selectedIntervalSourceMonth,

            //予報取得期間
            // targetPeriod: null,
            // targetMenu: false,

            // 表示しているか否か
            isDisplay: false,

        }
    },

    computed: {
        // activateSubmit(): boolean {
        //     return this.selectedLargeAreaCode && this.targetPeriod ? false : true;
        // },
    },

    methods: {

        initializeSelectedLargeArea(): void {
            this.selectedLargeAreaCode = null
        },

        initializeSelectedIntervalSourceMonth(): void {
            this.selectedIntervalSourceMonth = null
        },

        changeMeteorologicalObservatory(): void {
            this.initializeSelectedLargeArea()
        },

        async changeLargeArea(): Promise<void> {
            await this.fetchStartDate()
            this.selectSourceYears = await this.$store.getters['weatherForecastStore/selectSourceYears']
        },

        changeIntervalSourceYear(): void {
            this.initializeSelectedIntervalSourceMonth()
            this.selectSourceMonths = this.$store.getters['weatherForecastStore/selectSourceMonths'](this.selectedIntervalSourceYear)
        },

        async fetchStartDate(): Promise<void> {
            const params = {
                largeAreaCode: this.selectedLargeAreaCode,
            };
            await this.$store.dispatch('weatherForecastStore/fetchStartDate', params)
        },

        async submit(): Promise<void> {

            if (this.selectedMeteorologicalObservatory == null) {
                return
            }
            if (this.selectedLargeAreaCode == null) {
                return
            }
            if (this.selectedIntervalSourceYear == null) {
                return
            }
            if (this.selectedIntervalSourceMonth == null) {
                return
            }

            // 条件のセット
            // と同時に内部で予報情報を取得
            const condition: WeatherForecastConditionInterface = {
                meteorologicalObservatoryCode: this.selectedMeteorologicalObservatory.meteorologicalObservatoryCode,
                largeAreaCode: this.selectedLargeAreaCode,
                intervalSourceYear: this.selectedIntervalSourceYear ? this.selectedIntervalSourceYear.toString() : '',
                intervalSourceMonth: this.selectedIntervalSourceMonth ? this.selectedIntervalSourceMonth.toString() : '',
            }
            await this.$store.dispatch('weatherForecastStore/setCondition', condition)

            this.isDisplay = true

            // 条件をクエリパラメータに付与してルーティング
            this.$router.push({
                path: '/', query: {
                    meteorologicalObservatoryCode: condition.meteorologicalObservatoryCode,
                    largeAreaCode: condition.largeAreaCode,
                    intervalSourceYear: condition.intervalSourceYear.toString(),
                    intervalSourceMonth: condition.intervalSourceMonth.toString()
                }
            })
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
    color: #333333;

    .settings {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .setting {
            margin: 20px;

            label {
                padding-left: 3px;
            }
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

                    .interval-source-unit {
                        margin: 0px 5px;
                    }
                }
            }
        }
    }
    .submit {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 20px;
        margin-bottom: 20px;
        .submit-button-area {
            width: 300px;

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