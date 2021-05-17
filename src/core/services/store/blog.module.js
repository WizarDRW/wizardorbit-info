import ApiService from "@/core/services/api.service";
// action types
export const BLOG = "blog";
export const GET_API_BLOG = "getApiBlog";
export const BLOGS = "blogs";
export const GET_API_BLOGS = "getApiBlogs";
export const USER_BLOGS = "userBlogs";
export const GET_API_USER_BLOG = "getApiUserBlog";
export const IMPRESSION_BLOG_UPDATE = "impressionBlogUpdate"

// mutation types
export const SET_BLOG = "setBlog"
export const SET_BLOGS = "setBlogs"
export const SET_USER_BLOGS = "setUserBlogs"

export default {
  state: {
    blog: null,
    blogs: null,
    user_blogs: null
  },
  getters: {
    getBlog: (state) => state.blog,
    getBlogs: (state) => state.blogs,
    getUserBlogs: (state) => state.user_blogs,
  },
  actions: {
    [BLOG](context, payload) {
      context.commit(SET_BLOG, payload);
    },
    async [GET_API_BLOG](context, id) {
      var data = (await ApiService.get(`blogs/id/${id}`)).data
      context.commit(SET_BLOG, data);
    },
    [BLOGS](context, payload) {
      context.commit(SET_BLOGS, payload);
    },
    async [GET_API_BLOGS](context) {
      var data = (await ApiService.get(`blogs/`)).data
      context.commit(SET_BLOGS, data);
    },
    [USER_BLOGS](context, payload) {
      context.commit(SET_USER_BLOGS, payload);
    },
    async [GET_API_USER_BLOG](context, userid) {
      var data = (await ApiService.get(`blogs/userid/${userid}`)).data
      context.commit(SET_USER_BLOGS, data);
    },
    async [IMPRESSION_BLOG_UPDATE](context, data) {
      console.log(data);
      ApiService.put("/blogs/updateImpression/id/" + data.id, {
        ip_address: data.ip,
        blog_id: data.id,
      });
    }
  },
  mutations: {
    [SET_BLOG](state, payload) {
      state.blog = payload;
    },
    [SET_BLOGS](state, payload) {
      if (state.blogs != payload) {
        state.blogs = payload;
      }
    },
    [SET_USER_BLOGS](state, payload) {
      state.user_blogs = payload;
    },
  }
};
