<template>
    <v-card class="mx-auto" max-width="400">
        {{ report.reportDate }}
        <template v-for="(forecast) in report.forecasts">
            <WeatherForecastOnedayInCard :forecast="forecast"></WeatherForecastOnedayInCard>
        </template>
    </v-card>
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