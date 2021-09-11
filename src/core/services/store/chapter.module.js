export const CLIENT_CHAPTERS = 'clientChapters'

// mutation types
export const SET_CHAPTER = "setChapter"
export const SET_CHAPTERS = "setChapters"
export const SET_USER_CHAPTERS = "setUserChapters"

export default {
  state: {
    chapter: null,
    chapters: null,
    user_chapters: null
  },
  getters: {
    getChapter: (state) => state.chapter,
    getChapters: (state) => state.chapters,
    getUserChapters: (state) => state.user_chapters,
  },
  actions: {
    [CLIENT_CHAPTERS]: (context) => context.dispatch('getApiContent', {
      url: "chapters/client",
      content: SET_CHAPTERS,
    })
  },
  mutations: {
    [SET_CHAPTER]: (state, payload) => state.chapter = payload,
    [SET_CHAPTERS]: (state, payload) => state.chapters != payload ? state.chapters = payload : null,
    [SET_USER_CHAPTERS]: (state, payload) => state.user_chapters = payload,
  }
};
