<template>
    <div>
        {{ forecast.forecastTargetDate }}
        {{ forecast.reliability }}
        {{ forecast.weather }}
        {{ forecast.weatherFigUrl }}
        {{ forecast.pop }}
        {{ forecast.highestTemperature }}
        {{ forecast.highestTemperatureUpper }}
        {{ forecast.highestTemperatureLower }}
        {{ forecast.lowestTemperature }}
        {{ forecast.lowestTemperatureUpper }}
        {{ forecast.lowestTemperatureLower }}
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { ForecastInterface } from '~/interfaces/weatherForecast/WeatherForecastInterface'

export default Vue.extend({
    props: {
        forecast: {
            type: Object as PropType<ForecastInterface>,
            required: true,
        }
    }
})

</script>