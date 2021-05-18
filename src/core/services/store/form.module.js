import ApiService from "@/core/services/api.service";
// action types
export const FORM = "form";
export const GET_API_FORM = "getApiForm";
export const FORMS = "forms";
export const GET_API_FORMS = "getApiForms";
export const USER_FORMS = "userForms";
export const GET_API_USER_FORMS = "getApiUserForms";
export const IMPRESSION_FORM_UPDATE = "impressionFormUpdate"
export const FORM_CATEGORIES = "formCategories"
export const GET_API_FORM_CATEGORIES = "getApiFormCategories"

// mutation types
export const SET_FORM = "setForm"
export const SET_FORMS = "setForms"
export const SET_USER_FORMS = "setUserForms"
export const SET_FORM_CATEGORIES = "setFormCategories"

export default {
  state: {
    form: null,
    forms: null,
    user_forms: null,
    form_categories: null
  },
  getters: {
    getForm: (state) => state.form,
    getForms: (state) => state.forms,
    getUserForms: (state) => state.user_forms,
    getFormCategories: (state) => state.form_categories,
  },
  actions: {
    [FORM](context, payload) {
      context.commit(SET_FORM, payload);
    },
    async [GET_API_FORM](context, id) {
      var data = (await ApiService.get(`forms/id/${id}`)).data
      context.commit(SET_FORM, data);
    },
    [FORMS](context, payload) {
      context.commit(SET_FORMS, payload);
    },
    async [GET_API_FORMS](context) {
      var data = (await ApiService.get(`forms/client`)).data
      context.commit(SET_FORMS, data);
    },
    [USER_FORMS](context, payload) {
      context.commit(SET_USER_FORMS, payload);
    },
    async [GET_API_USER_FORMS](context, userid) {
      var data = (await ApiService.get(`forms/userid/${userid}`)).data
      context.commit(SET_USER_FORMS, data);
    },
    async [IMPRESSION_FORM_UPDATE](context, data) {
      ApiService.put("/forms/updateImpression/id/" + data.id, {
        ip_address: data.ip,
        blog_id: data.id,
      });
    },
    [FORM_CATEGORIES](context, payload) {
      context.commit(SET_FORM_CATEGORIES, payload);
    },
    async [GET_API_FORM_CATEGORIES](context) {
      var data = (await ApiService.get(`formcategories/notnested`)).data
      context.commit(SET_FORM_CATEGORIES, data);
    }
  },
  mutations: {
    [SET_FORM](state, payload) {
      state.form = payload;
    },
    [SET_FORMS](state, payload) {
      if (state.forms != payload) state.forms = payload;
    },
    [SET_USER_FORMS](state, payload) {
      state.user_forms = payload;
    },
    [SET_FORM_CATEGORIES]: (state, payload) => state.form_categories = payload,
  }
};
