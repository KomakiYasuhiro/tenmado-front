<template lang="pug">
.page
    Breadcrumbs(:layers="breadcrumbsLayers")
    Heading.heading(
        :headingText="headingText")
    article
        .content
            h2.content-title 対象日を選択
            .day-list
                nuxt-link.link(
                    v-for="day of $store.getters['weatherForecastStore/displayDayList'](Number($route.params.yearmonth.substring(0, 4)), Number($route.params.yearmonth.substring(4, 6)))" :key="day"
                    :to="$route.path + day + '/'"
                )
                    | {{ day }} 日
        WeatherForecastContentFooterVue
</template>

<script lang="ts">

import Vue from 'vue'
import Breadcrumbs from '~/components/pages/common/Breadcrumbs.vue'
import Heading from '~/components/pages/common/Heading.vue'
import WeatherForecastContentFooterVue from '~/components/pages/weatherForecast/WeatherForecastContentFooter.vue'
import { BreadcrumbsLayerInterface } from '~/interfaces/common/BreadcrumbsLayerInterface'
import { Head } from '~/interfaces/common/Head'

interface DataType {
    breadcrumbsLayers: Array<BreadcrumbsLayerInterface>
    meteorologicalObservatoryNameLargeAreaName: string
    headingText: string
    yearmonthstr: string
}

export default Vue.extend({

    components: {
        Breadcrumbs,
        Heading,
        WeatherForecastContentFooterVue
    },

    data(): DataType {
        const meteorologicalObservatoryName: string = this.$store.getters['weatherForecastStore/findFlattenKubunByLargeAreaCode'](this.$route.params.areacode).meteorologicalObservatoryName
        const largeAreaName: string = this.$store.getters['weatherForecastStore/findFlattenKubunByLargeAreaCode'](this.$route.params.areacode).largeAreaName
        const meteorologicalObservatoryNameLargeAreaName: string = meteorologicalObservatoryName +  ' - ' + largeAreaName
        const yearmonthstr: string = this.$route.params.yearmonth.substring(0, 4) + '年' + this.$route.params.yearmonth.substring(4, 6) + '月'
        return {
            breadcrumbsLayers: [
                {
                    path: "/weatherforecast/",
                    name: "過去天気予報データベース"
                },
                {
                    path: "/weatherforecast/" + this.$route.params.areacode + '/',
                    name: meteorologicalObservatoryNameLargeAreaName
                },
                {
                    path: "",
                    name: yearmonthstr
                },
            ],
            meteorologicalObservatoryNameLargeAreaName: meteorologicalObservatoryNameLargeAreaName,
            headingText: meteorologicalObservatoryNameLargeAreaName
                + ' ' + yearmonthstr
                + ' ' +  "の過去天気予報",
            yearmonthstr: yearmonthstr,
        }
    },

    head(): Head {
        return {
            title: this.headingText,
            meta: [
                { hid: 'description', name: 'description', content: '過去に行われた' + this.meteorologicalObservatoryNameLargeAreaName + ' - ' + this.yearmonthstr + 'の天気予報です。過去のデータ分析やAI・機械学習のモデリングなどにもお使いいただけます。' },
                { hid: 'keywords', name: 'keywords', content: '過去天気予報,天気予報,過去データ,ビッグデータ,データ分析,データサイエンス,統計,機械学習' },

                { hid: 'og:site_name', property: 'og:site_name', content: 'テンマド' },
                { hid: 'og:type', property: 'og:type', content: 'website' },
                { hid: 'og:url', property: 'og:url', content: 'https:/tenmado.app' + (this.$route.path.substr(-1) == '/' ? this.$route.path : this.$route.path + '/') },
                { hid: 'og:title', property: 'og:title', content: this.meteorologicalObservatoryNameLargeAreaName + ' - ' + this.yearmonthstr + 'の過去天気予報データベース - テンマド' },
                { hid: 'og:description', property: 'og:description', content: '過去に行われた' + this.meteorologicalObservatoryNameLargeAreaName + 'の天気予報です。過去のデータ分析やAI・機械学習のモデリングなどにもお使いいただけます。' },
            ],
            link: [
                { hid: 'canonical', rel: 'canonical', href: 'https:/tenmado.app' + (this.$route.path.substr(-1) == '/' ? this.$route.path : this.$route.path + '/') }
            ]
        }
    },

    async fetch({store, params}) {
        const requestparams = {
            largeAreaCode: params.areacode,
        };
        await store.dispatch('weatherForecastStore/fetchStartDate', requestparams)
        if (store.getters['weatherForecastStore/flattenKubuns'] == null) {
            await store.dispatch('weatherForecastStore/fetchKubuns')
        }
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
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;

            .content-title {
                color: #555;
                font-size: 18px;
                font-weight: normal;
                margin-bottom: 5px;
            }

            .day-list {
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