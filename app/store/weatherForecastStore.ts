import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/store'
import { WeatherForecastInterface } from '~/interfaces/weatherForecast/WeatherForecastInterface'
import { MeteorologicalObservatoryInterface } from '~/interfaces/weatherForecast/MeteorologicalObservatoryInterface'
import { WeatherForecastQueryParamsInterface } from '~/interfaces/weatherForecast/WeatherForecastQueryParamsInterface'
import { StartDateQueryParamsInterface } from '~/interfaces/weatherForecast/StartDateQueryParamsInterface'
import { StartDateInterface } from '~/interfaces/weatherForecast/StartDateInterface'
import { WeatherForecastConditionInterface } from '~/interfaces/weatherForecast/WeatherForecastConditionInterface'
import { convertDateToString, convertToLastDayOfTheMonth } from '~/utils/date'

interface WeatherForecastStateInterface {
    weatherForecast: WeatherForecastInterface | null
    meteorologicalObservatories: Array<MeteorologicalObservatoryInterface> | null
    startDate: Date | null
    today: Date
    condition: WeatherForecastConditionInterface | null
}

export const state = (): WeatherForecastStateInterface => ({
    weatherForecast: null,
    meteorologicalObservatories: null,
    startDate: null,
    today: new Date(),
    condition: null,
})

export type WeatherForecastState = ReturnType<typeof state>

export const getters: GetterTree<WeatherForecastState, RootState> = {
    weatherForecast: state => state.weatherForecast,
    meteorologicalObservatories: state => state.meteorologicalObservatories,
    startDate: state => state.startDate,
    today: state => state.today,
    condition: state => state.condition,
    selectSourceYears: state => {
        if (state.startDate == null) {
            return []
        }
        return new Array(state.today.getFullYear() - state.startDate.getFullYear() + 1).fill(null).map(
            (_, i) => state.startDate ? i + state.startDate.getFullYear() : null
        )
    },
    selectSourceMonths: state => (selectedIntervalSourceYear) => {
        if (state.startDate == null) {
            return []
        }
        const todayYear = state.today.getFullYear()
        // getMonthだけなぜか0~11の範囲をとる
        const todayMonth = state.today.getMonth() + 1

        let startDateYear = state.startDate.getFullYear()
        let startDateMonth = state.startDate.getMonth() + 1

        let rangeStartMonth: number = 1
        let rangeEndMonth: number = 12
        if (selectedIntervalSourceYear == startDateYear) {
            // 選択した年がstartDateと同じならば、startDateの月を最小値とする
            rangeStartMonth = startDateMonth
        }
        if (selectedIntervalSourceYear == todayYear) {
            // 選択した年が本日と同じならば、startDateの月を最小値とする
            rangeEndMonth = todayMonth
        }

        return new Array(rangeEndMonth - rangeStartMonth + 1).fill(null).map((_, i) => i + rangeStartMonth)
    }
}

export const mutations: MutationTree<WeatherForecastState> = {
    setWeatherForecast: (state: WeatherForecastState, weatherForecast: WeatherForecastInterface) => {
        state.weatherForecast = weatherForecast
    },
    setMeteorologicalObservatories: (state: WeatherForecastState, meteorologicalObservatories: Array<MeteorologicalObservatoryInterface>) => {
        state.meteorologicalObservatories = meteorologicalObservatories
    },
    setStartDate: (state: WeatherForecastState, startDate: Date) => {
        state.startDate = startDate
    },
    setCondition: (state: WeatherForecastState, condition: WeatherForecastConditionInterface) => {
        state.condition = condition
    },

}

export const actions: ActionTree<WeatherForecastState, RootState> = {

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
            commit('setStartDate', new Date(startDate.startDate))
        } catch (e) {
            console.log(`startDate取得失敗 ${e}`);
        }
    },

    /**
    * 検索条件をセット
    * @param condition 条件
    */
    async setCondition({ commit }, condition: WeatherForecastConditionInterface) {
        await commit('setCondition', condition)
        await this.dispatch('weatherForecastStore/fetchWeatherForecast')
    },

    /**
    * 予報情報を取得
    * @param weatherForecastQueryParams クエリパラメータ
    */
    async fetchWeatherForecast({ commit }) {

        const condition: WeatherForecastConditionInterface = this.getters['weatherForecastStore/condition']
        const intervalSourceDate = new Date(Number(condition.intervalSourceYear), Number(condition.intervalSourceMonth) - 1, 1)
        const intervalTargetDate = convertToLastDayOfTheMonth(intervalSourceDate)

        const weatherForecastQueryParams: WeatherForecastQueryParamsInterface = {
            largeAreaCode: condition.largeAreaCode,
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