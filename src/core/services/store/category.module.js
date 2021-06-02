import ApiService from "@/core/services/api.service"

// action get
export const CATEGORY = "category"
export const GET_API_CATEGORY = "getApiCategory"
export const CATEGORIES = "categories"
export const GET_API_CATEGORIES = "getApiCategories"
export const SELECT_CATEGORIES = "selectCategories"

// mutations
const SET_CATEGORY = "setCategory"
const SET_CATEGORIES = "setCategories"
const SET_SELECT_CATEGORIES = "setSelectCategories"

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
    actions: {
        [CATEGORY]: (context, payload) => context.commit(SET_CATEGORY, payload),
        [GET_API_CATEGORY]: async (context, payload) => context.commit(SET_CATEGORY, (await ApiService.get(`categories/type/${payload}`)).data),
        [CATEGORIES]: (context, payload) => context.commit(SET_CATEGORIES, payload),
        [GET_API_CATEGORIES]: async (context, payload) => context.commit(SET_CATEGORIES, (await ApiService.get(`categories/type/${payload}`)).data),
        [SELECT_CATEGORIES]: async (context, datas) => context.commit(SET_SELECT_CATEGORIES, datas),

    },
    mutations: {
        [SET_CATEGORY]: (state, payload) => state.category = payload,
        [SET_CATEGORIES]: (state, payload) => state.categories = payload,
        [SET_SELECT_CATEGORIES]: (state, payload) => state.select_categories = payload,
    }
}