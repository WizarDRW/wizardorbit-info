// mutations
export const SET_USER = "setUser"

export default {
    state: {
        user_data: null
    },
    getters: {
        getUser(state) {
            return state.user_data
        }
    },
    mutations: {
        [SET_USER](state, payload) {
            state.user_data = payload;
        }
    }
}