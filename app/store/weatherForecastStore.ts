import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/store'
import { WeatherForecastInterface } from '~/interfaces/weatherForecast/WeatherForecastInterface'
import { MeteorologicalObservatoryInterface } from '~/interfaces/weatherForecast/MeteorologicalObservatoryInterface'
import { WeatherForecastQueryParamsInterface } from '~/interfaces/weatherForecast/WeatherForecastQueryParamsInterface'
import { StartDateQueryParamsInterface } from '~/interfaces/weatherForecast/StartDateQueryParamsInterface'
import { StartDateInterface } from '~/interfaces/weatherForecast/StartDateInterface'

interface WeatherForecastStateInterface {
    weatherForecast: WeatherForecastInterface | null
    meteorologicalObservatories: Array<MeteorologicalObservatoryInterface> | null
    startDate: string | null
}

export const state = (): WeatherForecastStateInterface => ({
    weatherForecast: null,
    meteorologicalObservatories: null,
    startDate: null,
})

export type WeatherForecastState = ReturnType<typeof state>

export const getters: GetterTree<WeatherForecastState, RootState> = {
    weatherForecast: state => state.weatherForecast,
    meteorologicalObservatories: state => state.meteorologicalObservatories,
    startDate: state => state.startDate,
}

export const mutations: MutationTree<WeatherForecastState> = {
    setWeatherForecast: (state: WeatherForecastState, weatherForecast: WeatherForecastInterface) => {
        state.weatherForecast = weatherForecast
    },
    setMeteorologicalObservatories: (state: WeatherForecastState, meteorologicalObservatories: Array<MeteorologicalObservatoryInterface>) => {
        state.meteorologicalObservatories = meteorologicalObservatories
    },
    setStartDate: (state: WeatherForecastState, startDate: string) => {
        state.startDate = startDate
    },

}

export const actions: ActionTree<WeatherForecastState, RootState> = {

    /**
    * 予報情報を取得
    * @param weatherForecastQueryParams クエリパラメータ
    */
    async fetchWeatherForecast({ commit }, weatherForecastQueryParams: WeatherForecastQueryParamsInterface) {
        try {
            const weatherForecast: WeatherForecastInterface = await this.$axios.$get('/api/weatherforecast/', { params: weatherForecastQueryParams })
            commit('setWeatherForecast', weatherForecast)
        } catch (e) {
            console.log(`予報取得失敗 ${e}`);
        }
    },

    /**
    * 気象庁及び地域一覧を取得
    */
    async fetchMeteorologicalObservatories({ commit }) {
        try {
            const response = await this.$axios.$get('/api/weatherforecast/meteorologicalobservatory')
            const meteorologicalObservatories: Array<MeteorologicalObservatoryInterface> = response.meteorological_observatories
            commit('setMeteorologicalObservatories', meteorologicalObservatories)
        } catch (e) {
            console.log(`気象庁及び地域一覧取得失敗 ${e}`);
        }
    },

    /**
    * 地域の集計開始日を取得
    * @param startDateQueryParams クエリパラメータ
    */
    async fetchStartDate({ commit }, startDateQueryParams: StartDateQueryParamsInterface) {
        try {
            const startDate: StartDateInterface = await this.$axios.$get('/api/weatherforecast/startdate', { params: startDateQueryParams })
            commit('setStartDate', startDate.startDate.toString())
        } catch (e) {
            console.log(`startDate取得失敗 ${e}`);
        }
    },
}