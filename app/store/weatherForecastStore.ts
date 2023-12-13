import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { KubunInterface } from '~/interfaces/weatherForecast/KubunInterface'
import { LargeAreaConditionInterface } from '~/interfaces/weatherForecast/LargeAreaConditionInterface'
import { LargeAreaInterface } from '~/interfaces/weatherForecast/LargeAreaInterface'
import { LargeAreaQueryParamsInterface } from '~/interfaces/weatherForecast/LargeAreaQueryParamsInterface'
import { StartDateInterface } from '~/interfaces/weatherForecast/StartDateInterface'
import { StartDateQueryParamsInterface } from '~/interfaces/weatherForecast/StartDateQueryParamsInterface'
import { WeatherForecastConditionInterface } from '~/interfaces/weatherForecast/WeatherForecastConditionInterface'
import { WeatherForecastInterface } from '~/interfaces/weatherForecast/WeatherForecastInterface'
import { WeatherForecastQueryParamsInterface } from '~/interfaces/weatherForecast/WeatherForecastQueryParamsInterface'
import { RootState } from '~/store'
import { convertDateToString, convertToLastDayOfTheMonth } from '~/utils/date'

interface WeatherForecastStateInterface {
    weatherForecast: WeatherForecastInterface | null
    kubuns: Array<KubunInterface> | null
    startDate: Date | null
    largeAreas: Array<LargeAreaInterface> | null
    today: Date
}

export const state = (): WeatherForecastStateInterface => ({
    weatherForecast: null,
    kubuns: null,
    startDate: null,
    largeAreas: null,
    today: new Date(),
})

export type WeatherForecastState = ReturnType<typeof state>

export const getters: GetterTree<WeatherForecastState, RootState> = {
    weatherForecast: state => state.weatherForecast,
    kubuns: state => state.kubuns,
    startDate: state => state.startDate,
    largeAreas: state => state.largeAreas,
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
    displayDayList: state => (selectedYear: number, selectedMonth: number) => {
        if (state.startDate == null) {
            return []
        }

        const todayYear = state.today.getFullYear()
        // getMonthだけなぜか0~11の範囲をとる
        const todayMonth = state.today.getMonth() + 1
        const todayDate = state.today.getDate()

        const startDateYear = state.startDate.getFullYear()
        const startDateMonth = state.startDate.getMonth() + 1
        const startDateDate = state.startDate.getDate()

        let startday: number
        let endday: number

        if (startDateYear == selectedYear && startDateMonth == selectedMonth) {
            startday = startDateDate
        } else {
            startday = 1
        }

        if (selectedYear == todayYear && selectedMonth == todayMonth) {
            // 翌日に反映されるので表示するのは前日までとする
            endday = todayDate - 1
        } else {
            endday = convertToLastDayOfTheMonth(new Date(selectedYear, selectedMonth - 1, 1)).getDate()
        }
        return new Array(endday - startday + 1).fill(null).map((_, i) => i + startday)
    },
}

export const mutations: MutationTree<WeatherForecastState> = {
    setWeatherForecast: (state: WeatherForecastState, weatherForecast: WeatherForecastInterface) => {
        state.weatherForecast = weatherForecast
    },
    setKubuns: (state: WeatherForecastState, kubuns: Array<KubunInterface>) => {
        state.kubuns = kubuns
    },
    setStartDate: (state: WeatherForecastState, startDate: Date) => {
        state.startDate = startDate
    },
    setLargeAreas: (state: WeatherForecastState, largeAreas: Array<LargeAreaInterface>) => {
        state.largeAreas = largeAreas
    },

}

export const actions: ActionTree<WeatherForecastState, RootState> = {

    /**
    * 予報区分, 気象台を取得
    */
    async fetchKubuns({ commit }) {
        try {
            const kubuns: Array<KubunInterface> = await this.$axios.$get('/api/weatherforecast/kubun')
            commit('setKubuns', kubuns)
        } catch (e) {
            commit('setKubuns', null)
            console.log(`予報区分, 気象台 取得失敗 ${e}`);
        }
    },

    /**
    * 気象台の集計開始日を取得
    * @param startDateQueryParams クエリパラメータ
    */
    async fetchStartDate({ commit }, startDateQueryParams: StartDateQueryParamsInterface) {
        try {
            const startDate: StartDateInterface = await this.$axios.$get('/api/weatherforecast/startdate', { params: startDateQueryParams })
            commit('setStartDate', new Date(startDate.startDate))
        } catch (e) {
            commit('setStartDate', null)
            console.log(`startDate取得失敗 ${e}`);
        }
    },

    /**
    * 地域を取得
    * @param meteorologicalObservatoryName 気象地点名
    * @param yearMonthStr 年月文字列
    * @param daystr 日文字列
    */
    async fetchLargeArea({ commit }, largeAreaCondition: LargeAreaConditionInterface) {

        const targetDate = new Date(Number(largeAreaCondition.yearMonthStr.substring(0, 4)), Number(largeAreaCondition.yearMonthStr.substring(4, 6)) - 1, Number(largeAreaCondition.daystr))

        const largeAreaQueryParams: LargeAreaQueryParamsInterface = {
            meteorologicalObservatoryName: largeAreaCondition.meteorologicalObservatoryName,
            reportDate: convertDateToString(targetDate)
        }

        try {
            const largeareas: Array<LargeAreaInterface> = await this.$axios.$get('/api/weatherforecast/largearea', { params: largeAreaQueryParams })
            commit('setLargeAreas', largeareas)
        } catch (e) {
            commit('setLargeAreas', null)
            console.log(`largeArea取得失敗 ${e}`);
        }
    },

    /**
    * 予報情報を取得
    * @param largeAreaCode 地域コード
    * @param yearMonthStr 年月文字列
    * @param daystr 日文字列
    */
    async fetchWeatherForecast({ commit }, weatherForecastCondition: WeatherForecastConditionInterface) {

        const targetDate = new Date(Number(weatherForecastCondition.yearMonthStr.substring(0, 4)), Number(weatherForecastCondition.yearMonthStr.substring(4, 6)) - 1, Number(weatherForecastCondition.daystr))

        const weatherForecastQueryParams: WeatherForecastQueryParamsInterface = {
            meteorologicalObservatoryName: weatherForecastCondition.meteorologicalObservatoryName,
            largeAreaCode: weatherForecastCondition.largeAreaCode,
            reportDate: convertDateToString(targetDate)
        };

        try {
            const weatherForecast: WeatherForecastInterface = await this.$axios.$get('/api/weatherforecast', { params: weatherForecastQueryParams })
            commit('setWeatherForecast', weatherForecast)
        } catch (e) {
            commit('setWeatherForecast', null)
            console.log(`予報取得失敗 ${e}`);
        }
    },
}