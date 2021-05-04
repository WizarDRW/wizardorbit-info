import Vuetify from '@/plugins/vuetify'
// action types
export const THEME = "setOption";

// mutation types
const SET_THEME = "setOption";
export default {
    state: {
        option: localStorage.getItem("option"),
        theme: localStorage.getItem("theme") ?
            JSON.parse(localStorage.getItem("theme")) : {
                dark: true
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
        [THEME](context, theme) {
            localStorage.setItem("theme", JSON.stringify(theme))
            context.commit(SET_THEME, theme)
        }
    },
    mutations: {
        [SET_THEME](state, theme) {
            state.theme = theme;
            Vuetify.framework.theme.dark = theme.dark;
        }
    }
};
