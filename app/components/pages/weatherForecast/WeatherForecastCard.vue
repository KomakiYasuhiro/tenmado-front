<template>
    <div class="card card-skin">
        <div class="report-date">{{ report.reportDate }}</div>
        <div class="forecasts">
            <template v-for="(forecast) in report.forecasts">
                <WeatherForecastOnedayInCard :forecast="forecast"></WeatherForecastOnedayInCard>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { ReportInterface } from '~/interfaces/weatherForecast/WeatherForecastInterface'
import WeatherForecastOnedayInCard from '~/components/pages/weatherForecast/WeatherForecastOnedayInCard.vue'

export default Vue.extend({

    components: {
        WeatherForecastOnedayInCard
    },

    props: {
        report: {
            type: Object as PropType<ReportInterface>,
            required: true,
        }
    }
})

</script>

<style>
.card {
    display: flex;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 8px;
}

.card-skin {
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.report-date {
    height: 100%;
    width: 12%;
    margin-left: 5px;
    margin-right: 5px;
}

.forecasts {
    width: 88%;
    display: flex;
}
</style>