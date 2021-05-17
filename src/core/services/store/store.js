import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth.module";
import user from "./user.module";
import blog from "./blog.module";
import news from "./news.module";
import library from "./library.module";
import option from "./option.module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    blog,
    option,
    user,
    news,
    library
  }
});
