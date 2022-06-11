<template lang="pug">
.forecast
    .forecast-target-date {{ forecast.forecastTargetDate.toString().substring(5, 10).replace('-', '/') }}
    //- .reliability {{ forecast.reliability }}
    img.weather-fig(:src="forecast.weatherFigUrl")
    .weather {{ forecast.weather }}
    .pop
        .pop-num {{ forecast.pop }}
        .pop-percent &#37;
    .temperature-area.highest-temperature-area
        .temperature.highest-temperature {{ forecast.highestTemperature }} &#8451;
        .temprature-interval.highest-temprature-interval(v-if="forecast.highestTemperatureUpper != null")
            | &#40;
            | {{ forecast.highestTemperatureUpper }}&#8451; &#126;
            | {{ forecast.highestTemperatureLower }}&#8451;
            | &#41;
    .temperature-area.lowest-temperature-area
        .temperature.lowest-temperature {{ forecast.lowestTemperature }} &#8451;
        .temprature-interval.lowest-temprature-interval(v-if="forecast.lowestTemperatureUpper != null")
            | &#40;
            | {{ forecast.lowestTemperatureUpper }}&#8451; &#126;
            | {{ forecast.lowestTemperatureLower }}&#8451;
            | &#41;
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

<style lang="scss" scoped>
.forecast {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 140px;
    color: #333333;

    .forecast-target-date {
        font-size: 16px;
    }

    .weather-fig {
        margin: 6px 0;
        padding: 0 6px;
        width: 80%
    }

    .weather {
        font-size: 16px;
        margin-top: 8px;
        margin-bottom: 16px;
    }

    .pop {
        margin-top: 8px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;

        .pop-num {
            font-size: 12px;
        }
        .pop-percent {
            margin-left: 5px;
            font-size: 12px;
        }
    }

    .temperature-area {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 56px;

        .temperature {
            font-size: 20px;
            margin-right: 5px;
        }

        .temprature-interval {
            font-size: 8px;
        }
    }

    .highest-temperature-area {
        color: #d3504e;
    }

    .lowest-temperature-area {
        color: #4e8fd3;
    }
}
</style>