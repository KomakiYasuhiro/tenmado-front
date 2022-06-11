import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/store'
import { WeatherForecastInterface } from '~/interfaces/weatherForecast/WeatherForecastInterface'
import { KubunInterface, FlattenKubunInterface, KubunResponseInterface } from '~/interfaces/weatherForecast/KubunInterface'
import { WeatherForecastQueryParamsInterface } from '~/interfaces/weatherForecast/WeatherForecastQueryParamsInterface'
import { StartDateQueryParamsInterface } from '~/interfaces/weatherForecast/StartDateQueryParamsInterface'
import { StartDateInterface } from '~/interfaces/weatherForecast/StartDateInterface'
import { WeatherForecastConditionInterface } from '~/interfaces/weatherForecast/WeatherForecastConditionInterface'
import { convertDateToString, convertToLastDayOfTheMonth } from '~/utils/date'

interface WeatherForecastStateInterface {
    weatherForecast: WeatherForecastInterface | null
    kubuns: Array<KubunInterface> | null
    flattenKubuns: Array<FlattenKubunInterface> | null
    startDate: Date | null
    today: Date
}

export const state = (): WeatherForecastStateInterface => ({
    weatherForecast: null,
    kubuns: null,
    flattenKubuns: null,
    startDate: null,
    today: new Date(),
})

export type WeatherForecastState = ReturnType<typeof state>

export const getters: GetterTree<WeatherForecastState, RootState> = {
    weatherForecast: state => state.weatherForecast,
    kubuns: state => state.kubuns,
    flattenKubuns: state => state.flattenKubuns,
    startDate: state => state.startDate,
    today: state => state.today,
    displayYearMonthList: state => {
        if (state.startDate == null) {
            return []
        }

        const todayYear = state.today.getFullYear()
        // getMonthだけなぜか0~11の範囲をとる
        const todayMonth = state.today.getMonth() + 1

        const startDateYear = state.startDate.getFullYear()
        const startDateMonth = state.startDate.getMonth() + 1
        // 何年分か
        const betweenYears: number = todayYear - startDateYear + 1
        // startDateの年の月の数
        const betweenFirstYearsMonth: number = 12 - startDateMonth + 1
        // 表示する月の数
        const betweenMonth: number = (todayYear != startDateYear) ? betweenFirstYearsMonth + (betweenYears - 2) * 12 + todayMonth : todayMonth - startDateMonth + 1

        return new Array(betweenMonth).fill(null).map((_, i) => new Date(startDateYear, startDateMonth - 1 + i, 1))

    },
    findFlattenKubunByLargeAreaCode: state => (largeAreaCode: string) => {
        if (state.flattenKubuns == null) {
            return
        }
        return state.flattenKubuns.find((flattenKubun) => flattenKubun.largeAreaCode == largeAreaCode)
    }
}

export const mutations: MutationTree<WeatherForecastState> = {
    setWeatherForecast: (state: WeatherForecastState, weatherForecast: WeatherForecastInterface) => {
        state.weatherForecast = weatherForecast
    },
    setKubuns: (state: WeatherForecastState, kubuns: Array<KubunInterface>) => {
        state.kubuns = kubuns
    },
    setFlattenKubuns: (state: WeatherForecastState, flattenKubuns: Array<FlattenKubunInterface>) => {
        state.flattenKubuns = flattenKubuns
    },
    setStartDate: (state: WeatherForecastState, startDate: Date) => {
        state.startDate = startDate
    },

}

export const actions: ActionTree<WeatherForecastState, RootState> = {

    /**
    * 予報区分, 気象台, 地域一覧を取得
    */
    async fetchKubuns({ commit }) {
        try {
            const kubunresponse: KubunResponseInterface = await this.$axios.$get('/api/weatherforecast/kubun')
            commit('setKubuns', kubunresponse.kubuns)
            commit('setFlattenKubuns', kubunresponse.flattenkubuns)
        } catch (e) {
            console.log(`予報区分, 気象台, 地域一覧取得失敗 ${e}`);
        }
    },

    /**
    * 地域の集計開始日を取得
    * @param startDateQueryParams クエリパラメータ
    */
    async fetchStartDate({ commit }, startDateQueryParams: StartDateQueryParamsInterface) {
        try {
            const startDate: StartDateInterface = await this.$axios.$get('/api/weatherforecast/startdate', { params: startDateQueryParams })
            commit('setStartDate', new Date(startDate.startDate))
        } catch (e) {
            console.log(`startDate取得失敗 ${e}`);
        }
    },

    /**
    * 予報情報を取得
    * @param largeAreaCode 地域コード
    * @param yearMonthStr 年月文字列
    */
    async fetchWeatherForecast({ commit }, weatherForecastCondition: WeatherForecastConditionInterface) {

        const intervalSourceDate = new Date(Number(weatherForecastCondition.yearMonthStr.substring(0, 4)), Number(weatherForecastCondition.yearMonthStr.substring(4, 6)) - 1, 1)
        const intervalTargetDate = convertToLastDayOfTheMonth(intervalSourceDate)

        const weatherForecastQueryParams: WeatherForecastQueryParamsInterface = {
            largeAreaCode: weatherForecastCondition.largeAreaCode,
            reportDateFrom: convertDateToString(intervalSourceDate),
            reportDateTo: convertDateToString(intervalTargetDate),
            forecastdays: "7",
        };

        try {
            const weatherForecast: WeatherForecastInterface = await this.$axios.$get('/api/weatherforecast/', { params: weatherForecastQueryParams })
            commit('setWeatherForecast', weatherForecast)
        } catch (e) {
            console.log(`予報取得失敗 ${e}`);
        }
    },
}