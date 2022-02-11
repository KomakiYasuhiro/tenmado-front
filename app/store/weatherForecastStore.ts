import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/store'
import { WeatherForecastInterface } from '~/interfaces/weatherForecast/WeatherForecastInterface'
import { MeteorologicalObservatoryInterface } from '~/interfaces/weatherForecast/MeteorologicalObservatoryInterface'
import { WeatherForecastQueryParamsInterface } from '~/interfaces/weatherForecast/WeatherForecastQueryParamsInterface'

interface WeatherForecastStateInterface {
    weatherForecast: WeatherForecastInterface | null
    meteorologicalObservatories: Array<MeteorologicalObservatoryInterface> | null
}

export const state = (): WeatherForecastStateInterface => ({
    weatherForecast: null,
    meteorologicalObservatories: null,
})

export type WeatherForecastState = ReturnType<typeof state>

export const getters: GetterTree<WeatherForecastState, RootState> = {
    weatherForecast: state => state.weatherForecast,
    meteorologicalObservatories: state => state.meteorologicalObservatories,
}

export const mutations: MutationTree<WeatherForecastState> = {
    setWeatherForecast: (state: WeatherForecastState, weatherForecast: WeatherForecastInterface) => {
        state.weatherForecast = weatherForecast
    },
    setMeteorologicalObservatories: (state: WeatherForecastState, meteorologicalObservatories: Array<MeteorologicalObservatoryInterface>) => {
        state.meteorologicalObservatories = meteorologicalObservatories
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

    async fetchMeteorologicalObservatories({ commit }) {
        try {
            const response = await this.$axios.$get('/api/weatherforecast/meteorologicalobservatory')
            const meteorologicalObservatories: Array<MeteorologicalObservatoryInterface> = response.meteorological_observatories
            commit('setMeteorologicalObservatories', meteorologicalObservatories)
        } catch (e) {
            console.log(`気象庁及び地域一覧取得失敗 ${e}`);
        }
    },
}