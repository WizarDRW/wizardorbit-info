import Vuetify from '@/plugins/vuetify';
import themes from '../../themes'
import ApiService from "@/core/services/api.service";

// action types
export const THEME = "theme";
export const AUTO_THEME = "autoTheme";
export const GET_API_ABOUTS = "getApiAbouts";
export const GET_API_RELEASES = "getApiReleases";

// mutation types
const SET_THEME = "setTheme";
const SET_ABOUTS = "setAbouts"
const SET_RELEASES = "setReleases"

export default {
    state: {
        option: localStorage.getItem("option"),
        theme: localStorage.getItem("theme") ?
            JSON.parse(localStorage.getItem("theme")) : {
                name: "dark",
                isDark: true,
                auto: true
            },
        abouts: null,
        releases: null
    },
    getters: {
        getOption(state) {
            return state.option;
        },
        getTheme(state) {
            return state.theme;
        },
        getAbouts(state) {
            return state.abouts;
        },
        getReleases(state) {
            return state.releases;
        }
    },
    actions: {
        [AUTO_THEME](context) {
            localStorage.setItem("theme", JSON.stringify({ auto: true, ...context.state.theme }))
            context.commit(SET_THEME, context.state.theme)
        },
        [THEME](context, theme) {
            localStorage.setItem("theme", JSON.stringify({ auto: false, ...theme }))
            context.commit(SET_THEME, theme)
        },
        [GET_API_ABOUTS]: async (context) => {
            var response = (await ApiService.get("abouts/"));
            context.commit(SET_ABOUTS, response.data)
        },
        [GET_API_RELEASES]: async (context) => {
            var response = (await ApiService.get(`abouts/releases/`));
            context.commit(SET_RELEASES, response.data)
        }
    },
    mutations: {
        [SET_THEME](state, theme) {
            var light = Vuetify.framework.theme.themes.light
            Vuetify.framework.theme.themes.light = { ...light, ...themes[theme.name] }
            state.theme = { auto: state.theme.auto ? state.theme.auto : false, ...theme }
            Vuetify.framework.theme.dark = theme.isDark;
        },
        [SET_ABOUTS]:  (state, payload) => {
            state.abouts = payload;
        },
        [SET_RELEASES]:  (state, payload) => {
            state.releases = payload;
        },
    }
};
