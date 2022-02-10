import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/store'
import { WeatherForecastInterface } from '~/interfaces/WeatherForecastInterface'
import { WeatherForecastQueryParamsInterface } from '~/interfaces/WeatherForecastQueryParamsInterface'

interface WeatherForecastStateInterface {
    weatherForecast: WeatherForecastInterface | null
}

export const state = (): WeatherForecastStateInterface => ({
    weatherForecast: null,
})

export type WeatherForecastState = ReturnType<typeof state>

export const getters: GetterTree<WeatherForecastState, RootState> = {
    weatherForecast: state => state.weatherForecast,
}

export const mutations: MutationTree<WeatherForecastState> = {
    setWeatherForecast: (state: WeatherForecastState, weatherForecast: WeatherForecastInterface) => {
        state.weatherForecast = weatherForecast
    }
}

export const actions: ActionTree<WeatherForecastState, RootState> = {

    async fetchWeatherForecast({ commit }, weatherForecastQueryParams: WeatherForecastQueryParamsInterface) {
        try {
            const weatherForecast: WeatherForecastInterface = await this.$axios.$get('/api/weatherforecast/', { params: weatherForecastQueryParams })
            commit('setWeatherForecast', weatherForecast)
        } catch (e) {
            console.log(`予報取得失敗 ${e}`);
        }
    },
}