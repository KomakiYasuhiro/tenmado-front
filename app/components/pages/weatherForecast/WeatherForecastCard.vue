<template lang="pug">
.card.card-skin
    .report-date
        .report-date-year {{ report.reportDate.toString().substring(0, 4) }}
        .report-date-monthdate {{ report.reportDate.toString().substring(5, 10).replace('-', '/') }} 
    .forecasts
        template(v-for="(forecast) in report.forecasts")
            WeatherForecastOnedayInCard(:forecast="forecast")
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

<style lang="scss" scoped>
.card {
    display: flex;
    align-items: stretch;
    margin-top: 8px;
    margin-bottom: 8px;
    padding: 20px;
    min-width: 800px;

    .report-date {
        width: 10%;
        margin-left: 5px;
        margin-right: 5px;

        .report-date-year {
            font-size: 16px;
        }

        .report-date-monthdate {
            font-size: 34px;
        }
    }

    .forecasts {
        width: 90%;
        margin-left: 5px;
        margin-right: 5px;
        display: flex;
        align-items: flex-start;
    }
}

.card-skin {
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
</style>