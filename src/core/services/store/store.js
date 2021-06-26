import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth.module.js";
import user from "./user.module.js";
import blog from "./chapter.module.js";
import news from "./news.module.js";
import forum from "./forum.module.js";
import library from "./library.module.js";
import option from "./option.module.js";
import category from "./category.module.js";
import userOption from './useroption.module.js'

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
    category,
    userOption
  }
});
