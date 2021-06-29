// mutations
export const SET_NEWS = "setNews"
export const SET_THE_NEWS = "setTheNews"
export const SET_USER_THE_NEWS = "setUserTheNews"

export default {
    state: {
        news: null,
        the_news: null,
        user_the_news: null
    },
    getters: {
        getNews: (state) => state.news,
        getTheNews: (state) => state.the_news,
        getUserTheNews: (state) => state.user_the_news
    },
    mutations: {
        [SET_NEWS](state, payload) { state.news = payload },
        [SET_THE_NEWS](state, payload) { state.the_news = payload },
        [SET_USER_THE_NEWS](state, payload) { state.user_the_news = payload },
    }
}