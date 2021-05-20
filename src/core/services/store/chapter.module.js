import ApiService from "@/core/services/api.service";

// action types
export const CHAPTER = "chapter";
export const GET_API_CHAPTER = "getApiChapter";
export const CHAPTERS = "chapters";
export const GET_API_CHAPTERS = "getApiChapters";
export const USER_CHAPTERS = "userChapters";
export const GET_API_USER_CHAPTERS = "getApiUserChapters";
export const IMPRESSION_CHAPTER_UPDATE = "impressionChapterUpdate"

// mutation types
const SET_CHAPTER = "setChapter"
const SET_CHAPTERS = "setChapters"
const SET_USER_CHAPTERS = "setUserChapters"

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
    [CHAPTER]: (context, payload) => context.commit(SET_CHAPTER, payload),
    [GET_API_CHAPTER]: async (context, id) => context.commit(SET_CHAPTER, (await ApiService.get(`chapters/id/${id}`)).data),
    [CHAPTERS]: (context, payload) => context.commit(SET_CHAPTERS, payload),
    [GET_API_CHAPTERS]: async (context) => context.commit(SET_CHAPTERS, (await ApiService.get(`chapters/client`)).data),
    [USER_CHAPTERS]: (context, payload) => context.commit(SET_USER_CHAPTERS, payload),
    [GET_API_USER_CHAPTERS]: async (context, userid) => context.commit(SET_USER_CHAPTERS, (await ApiService.get(`chapters/userid/${userid}`)).data),
    [IMPRESSION_CHAPTER_UPDATE]: async (context, data) =>
      ApiService.put("/blogs/updateImpression/id/" + data.id, {
        ip_address: data.ip,
        blog_id: data.id,
      })
  },
  mutations: {
    [SET_CHAPTER]: (state, payload) => state.chapter = payload,
    [SET_CHAPTERS]: (state, payload) => state.chapters != payload ? state.chapters = payload : null,
    [SET_USER_CHAPTERS]: (state, payload) => state.user_chapters = payload,
  }
};
