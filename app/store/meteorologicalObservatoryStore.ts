import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/store'
import { MeteorologicalObservatoryInterface } from '~/interfaces/MeteorologicalObservatoryInterface'

interface MeteorologicalObservatoryStateInterface {
    meteorologicalObservatories: Array<MeteorologicalObservatoryInterface> | null
}

export const state = (): MeteorologicalObservatoryStateInterface => ({
    meteorologicalObservatories: null,
})

export type MeteorologicalObservatoryState = ReturnType<typeof state>

export const getters: GetterTree<MeteorologicalObservatoryState, RootState> = {
    meteorologicalObservatories: state => state.meteorologicalObservatories,
}

export const mutations: MutationTree<MeteorologicalObservatoryState> = {
    setMeteorologicalObservatories: (state: MeteorologicalObservatoryState, meteorologicalObservatories: Array<MeteorologicalObservatoryInterface>) => {
        state.meteorologicalObservatories = meteorologicalObservatories
    }
}

export const actions: ActionTree<MeteorologicalObservatoryState, RootState> = {

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