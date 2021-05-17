import ApiService from "@/core/services/api.service";
// actions
export const NEWS = "news"
export const GET_API_NEWS = "getApiNews"
export const THE_NEWS = "theNews"
export const GET_API_THE_NEWS = "getApiTheNews"
export const USER_THE_NEWS = "theNews"
export const GET_API_USER_THE_NEWS = "getApiTheNews"

// mutations
const SET_NEWS = "setNews"
const SET_THE_NEWS = "setTheNews"
const SET_USER_THE_NEWS = "setTheNews"

export default {
    state: {
        news: null,
        the_news: null,
        user_the_news: null
    },
    getters: {
        getNews: (state) => state.news,
        getTheNews: (state) => state.the_news,
        getUserTheNews(state) { return state.user_the_news }
    },
    actions: {
        [NEWS]: (context, payload) => context.commit(SET_NEWS, payload),
        async [GET_API_NEWS](context, id) {
            var data = (await ApiService.get(`news/id/${id}`)).data;
            context.commit(SET_NEWS, data)
        },
        [THE_NEWS]: (context, payload) => context.commit(SET_THE_NEWS, payload),
        async [GET_API_THE_NEWS](context) {
            var data = (await ApiService.get(`news/`)).data;
            context.commit(SET_THE_NEWS, data)
        },
        [USER_THE_NEWS]: (context, payload) => context.commit(SET_USER_THE_NEWS, payload),
        async [GET_API_USER_THE_NEWS](context, userid) {
            var data = (await ApiService.get(`news/userid/${userid}`)).data;
            context.commit(SET_USER_THE_NEWS, data)
        },
    },
    mutations: {
        [SET_NEWS]: (state, payload) => state.news = payload,
        [SET_THE_NEWS]: (state, payload) => state.the_news = payload,
        [SET_USER_THE_NEWS]: (state, payload) => state.user_the_news = payload,
    }
}