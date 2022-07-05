<template lang="pug">
.forecast.card.card-skin
    .forecast-target-date {{ forecast.forecastTargetDate.toString().substring(5, 10).replace('-', '/') }}
    .weather-pop-content
        //- .reliability {{ forecast.reliability }}
        img.weather-fig(:src="forecast.weatherFigUrl")
        .weather {{ forecast.weather }}
        .pop
            .pop-num {{ forecast.pop }}
            .pop-percent &#37;
    .temperature-content
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
.card {
    display: flex;
    align-items: stretch;
    margin-top: 8px;
    margin-bottom: 8px;
    padding: 15px 20px;
}


.card-skin {
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.forecast {
    display: flex;
    align-items: stretch;
    width: 100%;
    color: #333333;
}

.forecast-target-date {
    width: 30%;
    color: #555555;
    font-size: 30px;
}

.weather-pop-content {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.weather-fig {
    margin: 6px 0;
    padding: 0 6px;
    width: 60%;
}

.weather {
    font-size: 16px;
    margin-top: 8px;
    margin-bottom: 8px;
}

.pop {
    margin-top: 8px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
}

.pop-num {
    font-size: 12px;
}
.pop-percent {
    margin-left: 5px;
    font-size: 12px;
}

.temperature-content {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.temperature-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 40px;
    padding: 12px 0px;
}

.temperature {
    font-size: 20px;
}

.temprature-interval {
    font-size: 8px;
}

.highest-temperature-area {
    color: #d3504e;
}

.lowest-temperature-area {
    color: #4e8fd3;
}


@media screen and (max-width: 500px) {

    .card {
        padding: 20px 10px;
    }

    .forecast-target-date {
        font-size: 24px;
    }

}

</style>