import Vuetify from '@/plugins/vuetify';
import themes from '../../themes'

// action types
export const THEME = "theme";
export const AUTO_THEME = "autoTheme";

// mutation types
const SET_THEME = "setTheme";
const SET_ABOUTS = "setAbouts"
const SET_RELEASES = "setReleases"
const SET_MENUS = "setMenus"

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
        releases: null,
        menus: null
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
        },
        getMenus(state) {
            return state.menus;
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
        }
    },
    mutations: {
        [SET_THEME](state, theme) {
            var light = Vuetify.framework.theme.themes.light
            Vuetify.framework.theme.themes.light = { ...light, ...themes[theme.name] }
            state.theme = { auto: state.theme.auto ? state.theme.auto : false, ...theme }
            Vuetify.framework.theme.dark = theme.isDark;
        },
        [SET_ABOUTS]: (state, payload) => {
            state.abouts = payload;
        },
        [SET_RELEASES]: (state, payload) => {
            state.releases = payload;
        },
        [SET_MENUS]: (state, payload) => state.menus = payload
    }
};
