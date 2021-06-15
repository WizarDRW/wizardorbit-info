import ApiService from '../api.service'

export const GET_API_USER_THEME = "getApiUserTheme";

const SET_USER_THEME = "setUserTheme"

export default {
    state: {
        user_theme: null
    },
    getters: {
        getUserTheme: (state) => state.user_theme
    },
    actions: {
        [GET_API_USER_THEME]: async (context, userid) => {
            var response = await ApiService.get(`useroptions/theme/${userid}`);
            context.commit(SET_USER_THEME, response.data);
            return response.status;
        },
    },
    mutations: {
        [SET_USER_THEME]: (state, payload) => {
            state.user_theme = payload;
        },
    }
}