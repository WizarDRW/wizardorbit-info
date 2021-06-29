// mutation types
export const SET_FORUM = "setForum"
export const SET_FORUMS = "setForums"
export const SET_USER_FORUMS = "setUserForums"

export default {
  state: {
    forum: null,
    forums: null,
    user_forums: null,
  },
  getters: {
    getForum: (state) => state.forum,
    getForums: (state) => state.forums,
    getUserForums: (state) => state.user_forums,
  },
  mutations: {
    [SET_FORUM]: (state, payload) => state.forum = payload,
    [SET_FORUMS]: (state, payload) => state.forums != payload ? state.forums = payload:null,
    [SET_USER_FORUMS]: (state, payload) => state.user_forums = payload
  }
};