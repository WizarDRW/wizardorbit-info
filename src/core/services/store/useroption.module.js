import Vuetify from '@/plugins/vuetify'
import ApiService from '../api.service';
import theme from '@/core/themes'

export const GET_API_USER_THEME = "getApiUserTheme";
export const CHANGE_USER_THEME = "changeUserTheme";

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
        [CHANGE_USER_THEME]: (context, status) => {
            context.dispatch('theme', {
                isDark: status,
                name: status ? "dark" : "light",
            });
            if (context.getters.isAuthenticated)
                if (status)
                    Vuetify.framework.theme.themes.dark = context.state.user_theme.dark
                else
                    Vuetify.framework.theme.themes.light = context.state.user_theme.light
            else
                if (status)
                    Vuetify.framework.theme.themes.dark = { ...Vuetify.framework.theme.themes.dark, ...theme.dark };
                else
                    Vuetify.framework.theme.themes.light = { ...Vuetify.framework.theme.themes.light, ...theme.light };
        },
    },
    mutations: {
        [SET_USER_THEME]: (state, payload) => {
            if (payload) {
                Vuetify.framework.theme.themes.light = { ...Vuetify.framework.theme.themes.light, ...payload.light.color_scss }
                Vuetify.framework.theme.themes.dark = { ...Vuetify.framework.theme.themes.dark, ...payload.dark.color_scss }
                payload.light = Vuetify.framework.theme.themes.light
                payload.dark = Vuetify.framework.theme.themes.dark
                state.user_theme = payload;
            }
        },
    }
}