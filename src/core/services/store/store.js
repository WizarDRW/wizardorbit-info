import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth.module";
import user from "./user.module";
import blog from "./chapter.module";
import news from "./news.module";
import forum from "./forum.module";
import library from "./library.module";
import option from "./option.module";
import category from "./category.module";

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
    library,
    forum,
    category
  }
});
