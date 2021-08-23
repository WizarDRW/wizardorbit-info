import ApiService from "@/core/services/api.service";

// action types
export const VERIFY_AUTH = "verifyAuth";
export const CURRENT_USER = "currentUser";
export const LOGIN = "login";
export const GOOGLE_LOGIN = "googleLogin";
export const LOGOUT = "logout";
export const REGISTER = "register";

// mutation types
export const SET_CURRENT_USER = "setCurrentUser";
export const PURGE_AUTH = "logOut";
export const SET_AUTH = "setAuth";
export const SET_ERROR = "setError";

const state = {
  errors: null,
  user: {},
  isAuthenticated: false
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};

const actions = {
  [LOGIN](context, credentials) {
    const user = {
      email: credentials.email,
      password: credentials.password
    }
    return new Promise((resolve, reject) => {
      ApiService.post("auth/dologin", user)
        .then((x) => {
          if (x.status == 200) {
            context.commit(SET_AUTH);
            context.commit(CURRENT_USER);
            context.dispatch("getApiContent", {
              url: `useroptions/theme/${context.getters.currentUser._id}`,
              content: "setUserTheme",
            });
            resolve(x);
          }
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  },
  [GOOGLE_LOGIN]: async () => {
    return new Promise((resolve, reject) => {
      ApiService.get("auth/urlgoogle").then(({ data }) => {
        resolve(data.url)
      }).catch(err => {
        reject(err)
      })
    })
  },
  [LOGOUT](context) {
    return new Promise((resolve, reject) => {
      ApiService.post("auth/destroysession").then(({ data }) => {
        context.commit(PURGE_AUTH);
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("auth/register", credentials)
        .then(({ data }) => {
          if (data) {
            context.commit(SET_AUTH, true);
            context.commit(CURRENT_USER);
            resolve(data);
          } else {
            context.commit(PURGE_AUTH);
            reject(data);
          }
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  },
  [VERIFY_AUTH](context) {
    return new Promise((resolve,reject) => {
      ApiService.get("auth/verify")
        .then((x) => {
          if (x.data) {
            context.commit(SET_AUTH);
          }
          resolve(x)
        })
        .catch(({response}) => {
          context.commit(PURGE_AUTH);
          reject(response)
        });
    })
  },
  [CURRENT_USER](context) {
    return new Promise((resolve,reject) => {
      ApiService.get("users/whoami")
        .then(({ data }) => {
          context.commit(SET_CURRENT_USER, data);
          resolve(data);
        })
        .catch(({response}) => {
          context.commit(PURGE_AUTH);
          reject(response);
        });
    })
  }
};

const mutations = {
  [SET_CURRENT_USER](state, data) {
    state.user = data;
    state.isAuthenticated = true;
  },
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state) {
    state.isAuthenticated = true;
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
