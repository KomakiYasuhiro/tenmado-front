<template>
    <div class="forecast">
        <div class="forecast-target-date">{{ forecast.forecastTargetDate }}</div>
        <!-- <div>{{ forecast.reliability }}</div> -->
        <img class="weather-fig" :src="forecast.weatherFigUrl" />
        <div class="weather">{{ forecast.weather }}</div>
        <div class="pop">{{ forecast.pop }}</div>
        <div class="highest-temperature-area">
            {{ forecast.highestTemperature }}
            {{ forecast.highestTemperatureUpper }}
            {{ forecast.highestTemperatureLower }}
        </div>
        <div class="lowest-temperature-area">
            {{ forecast.lowestTemperature }}
            {{ forecast.lowestTemperatureUpper }}
            {{ forecast.lowestTemperatureLower }}
        </div>
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

<style>
.forecast {
    display: flex;
    flex-direction: column;
    margin-left: 5px;
    margin-right: 5px;
    width: 14.28%;
}
</style>