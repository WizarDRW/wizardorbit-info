import Vuetify from '@/plugins/vuetify';
import themes from '../../themes'

// action types
export const THEME = "theme";
export const AUTO_THEME = "autoTheme";

// mutation types
const SET_THEME = "setTheme";

export default {
    state: {
        option: localStorage.getItem("option"),
        theme: localStorage.getItem("theme") ?
            JSON.parse(localStorage.getItem("theme")) : {
                name: "dark",
                isDark: true,
                auto: true
            }
    },
    getters: {
        getOption(state) {
            return state.option;
        },
        getTheme(state) {
            return state.theme;
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
        }
    }
};
