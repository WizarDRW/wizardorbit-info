import ApiService from "@/core/services/api.service";

// action types
export const FORUM = "forum";
export const GET_API_FORUM = "getApiForum";
export const FORUMS = "forums";
export const GET_API_FORUMS = "getApiForums";
export const USER_FORUMS = "userForums";
export const GET_API_USER_FORUMS = "getApiUserForums";
export const IMPRESSION_FORUM_UPDATE = "impressionForumUpdate"

export const FORUM_SENT_COMMENT = "forumSentComment";

// mutation types
const SET_FORUM = "setForum"
const SET_FORUMS = "setForums"
const SET_USER_FORUMS = "setUserForums"

export default {
  state: {
    forum: null,
    forums: null,
    user_forums: null,
    forum_categories: null
  },
  getters: {
    getForum: (state) => state.forum,
    getForums: (state) => state.forums,
    getUserForums: (state) => state.user_forums,
    getForumCategories: (state) => state.forum_categories,
  },
  actions: {
    [FORUM]:(context, payload) => context.commit(SET_FORUM, payload),
    [GET_API_FORUM]: async (context, id) => context.commit(SET_FORUM, (await ApiService.get(`forums/id/${id}`)).data),
    [FORUMS]: (context, payload) => context.commit(SET_FORUMS, payload),
    [GET_API_FORUMS]: async (context) => context.commit(SET_FORUMS, (await ApiService.get(`forums/client`)).data),
    [USER_FORUMS]: (context, payload) => context.commit(SET_USER_FORUMS, payload),
    [GET_API_USER_FORUMS]: async (context, userid) => context.commit(SET_USER_FORUMS, (await ApiService.get(`forums/userid/${userid}`)).data),
    [IMPRESSION_FORUM_UPDATE]: async (context, data) => {
      ApiService.put("/forums/updateImpression/id/" + data.id, {
        ip_address: data.ip,
        forum_id: data.id,
      });
    },
    [FORUM_SENT_COMMENT]: async (context, { id, comment }) => (await ApiService.post(`forums/comment/${id}`, comment)),
  },
  mutations: {
    [SET_FORUM]: (state, payload) => state.forum = payload,
    [SET_FORUMS]: (state, payload) => state.forums != payload ? state.forums = payload:null,
    [SET_USER_FORUMS]: (state, payload) => state.user_forums = payload,
  }
};
