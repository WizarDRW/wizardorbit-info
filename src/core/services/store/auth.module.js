import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";

// action types
export const VERIFY_AUTH = "verifyAuth";
export const CURRENT_USER = "currentUser";
export const LOGIN = "login";
export const GOOGLE_LOGIN = "googleLogin";
export const LOGOUT = "logout";
export const REGISTER = "register";
export const UPDATE_USER = "updateUser";

// mutation types
export const SET_CURRENT_USER = "setCurrentUser";
export const PURGE_AUTH = "logOut";
export const SET_AUTH = "setAuth";
export const SET_ERROR = "setError";

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken()
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
            context.commit(SET_AUTH, true);
            context.commit(CURRENT_USER);
            resolve(x);
          }
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  },
  [GOOGLE_LOGIN]: async (context) => {
    return new Promise((resolve, reject) => {
      ApiService.get("auth/urlgoogle").then(({ data }) => {
        resolve(data.url)
      }).catch(err => {
        reject(err)
      })
      context
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
    if (JwtService.getToken()) {
      console.log(JwtService.getToken());
      ApiService.setHeader();
      ApiService.get("auth/verify")
        .then((x) => {
          if (x) {
            context.commit(PURGE_AUTH);
          }
        })
        .catch(() => {
          context.commit(PURGE_AUTH);
        });
    } else {
      context.commit(PURGE_AUTH);
    }
  },
  [UPDATE_USER](context, payload) {
    const { email, username, password, image, bio } = payload;
    const user = { email, username, bio, image };
    if (password) {
      user.password = password;
    }

    return ApiService.put("user", user).then(({ data }) => {
      context.commit(SET_AUTH, data);
      return data;
    });
  },
  [CURRENT_USER](context) {
    return new Promise((resolve, reject) => {
      ApiService.get("users/whoami")
        .then(({ data }) => {
          context.commit(SET_CURRENT_USER, data);
          resolve(data);
        })
        .catch((response) => {
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
  [SET_AUTH](state, data) {
    state.isAuthenticated = data;
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
