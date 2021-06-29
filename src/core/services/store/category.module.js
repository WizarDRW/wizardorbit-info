// mutations
export const SET_CATEGORY = "setCategory"
export const SET_CATEGORIES = "setCategories"
export const SET_SELECT_CATEGORIES = "setSelectCategories"

export default {
    state: {
        category: null,
        categories: null,
        select_categories: null
    },
    getters: {
        getCategory: (state) => state.category,
        getCategories: (state) => state.categories,
        getSelectCategories: (state) => state.select_categories
    },
    mutations: {
        [SET_CATEGORY]: (state, payload) => state.category = payload,
        [SET_CATEGORIES]: (state, payload) => state.categories = payload,
        [SET_SELECT_CATEGORIES]: (state, payload) => state.select_categories = payload,
    }
}