<template lang="pug">
.page
    Breadcrumbs(:layers="breadcrumbsLayers")
    Heading.heading(
        :headingText="headingText")
    article
        .content
            template(v-if="$store.getters['weatherForecastStore/weatherForecast'] != null")
                .cards
                    template(v-for="(report) in $store.getters['weatherForecastStore/weatherForecast'].reports")
                        WeatherForecastCard(:report="report")
</template>

<script lang="ts">
import Vue from 'vue'

import { BreadcrumbsLayerInterface } from '~/interfaces/common/BreadcrumbsLayerInterface'
import { WeatherForecastConditionInterface } from '~/interfaces/weatherForecast/WeatherForecastConditionInterface'

interface DataType {
    breadcrumbsLayers: Array<BreadcrumbsLayerInterface>
    headingText: string
}

export default Vue.extend({

    data(): DataType {
        return {
            breadcrumbsLayers: [
                {
                    path: "/weatherforecast",
                    name: "過去天気予報データベース"
                },
                {
                    path: "/weatherforecast/" + this.$route.params.areacode,
                    name: this.$store.getters['weatherForecastStore/findFlattenKubunByLargeAreaCode'](this.$route.params.areacode).meteorologicalObservatoryName
                    + ' - '  +this.$store.getters['weatherForecastStore/findFlattenKubunByLargeAreaCode'](this.$route.params.areacode).largeAreaName
                },
                {
                    path: "",
                    name: this.$route.params.yearmonth.substring(0, 4) + '年' + this.$route.params.yearmonth.substring(4, 6) + '月'
                },
            ],
            headingText: this.$store.getters['weatherForecastStore/findFlattenKubunByLargeAreaCode'](this.$route.params.areacode).meteorologicalObservatoryName
                + ' - '  +this.$store.getters['weatherForecastStore/findFlattenKubunByLargeAreaCode'](this.$route.params.areacode).largeAreaName
                + ' ' + this.$route.params.yearmonth.substring(0, 4) + '年' + this.$route.params.yearmonth.substring(4, 6) + '月'
                + ' ' +  "の過去天気予報",
        }
    },

    async fetch({store, params}) {
        
        const weatherForecastCondition: WeatherForecastConditionInterface = {
            largeAreaCode: params.areacode,
            yearMonthStr: params.yearmonth
        }
        await store.dispatch('weatherForecastStore/fetchWeatherForecast', weatherForecastCondition)
    },
})
</script>

<style lang="scss" scoped>

.content {
    margin: 40px 0px;

    .cards {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
        margin-bottom: 20px;
    }
}
</style>