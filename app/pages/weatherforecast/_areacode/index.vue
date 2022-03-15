<template lang="pug">
.page
    Breadcrumbs(:layers="breadcrumbsLayers")
    Heading.heading(
        :headingText="headingText")
    article
        .content
            h2.content-title 気象台・地方を選択
            .yearmonth-list
                nuxt-link.link(
                    v-for="(yearmonth, index) in $store.getters['weatherForecastStore/displayYearMonthList']"
                    :key="index"
                    :to="'/weatherforecast/' + $route.params.areacode + '/' + String(yearmonth.getFullYear()) + ( '00' + String(yearmonth.getMonth() + 1) ).slice( -2 )"
                )
                    | {{ yearmonth.getFullYear() }}年 {{ ( '00' + String(yearmonth.getMonth() + 1) ).slice( -2 ) }} 月
</template>

<script lang="ts">

import Vue from 'vue'
import { BreadcrumbsLayerInterface } from '~/interfaces/common/BreadcrumbsLayerInterface'

interface DataType {
    breadcrumbsLayers: Array<BreadcrumbsLayerInterface>
    headingText: string
}

export default Vue.extend({

    data(): DataType {
        console.log(this.$route.params.areacode)
        return {
            breadcrumbsLayers: [
                {
                    path: "/weatherforecast",
                    name: "過去天気予報データベース"
                },
                {
                    path: "",
                    name: this.$store.getters['weatherForecastStore/findFlattenKubunByLargeAreaCode'](this.$route.params.areacode).meteorologicalObservatoryName
                        + ' - '  +this.$store.getters['weatherForecastStore/findFlattenKubunByLargeAreaCode'](this.$route.params.areacode).largeAreaName
                }
            ],
            headingText: this.$store.getters['weatherForecastStore/findFlattenKubunByLargeAreaCode'](this.$route.params.areacode).meteorologicalObservatoryName
                + ' - '  +this.$store.getters['weatherForecastStore/findFlattenKubunByLargeAreaCode'](this.$route.params.areacode).largeAreaName
                + ' ' +  "の過去天気予報",
        }
    },

    async fetch({store, params}) {
        const requestparams = {
            largeAreaCode: params.areacode,
        };
        await store.dispatch('weatherForecastStore/fetchStartDate', requestparams)
    },

})
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    flex-direction: column;
    min-height: 85vh;

    .heading {
        margin-bottom: 50px;
    }

    article {
    display: flex;
    flex-direction: column;

        .content {
            width: 800px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;

            .content-title {
                color: #555;
                font-size: 18px;
                font-weight: normal;
                margin-bottom: 5px;
            }

            .yearmonth-list {

                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border: 1px solid #eee;
                padding: 30px;

                .link {
                    color: #4e8fd3;
                    margin: 4px;
                }

            }

            
        }
    }
}
</style>