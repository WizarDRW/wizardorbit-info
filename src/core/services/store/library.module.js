import ApiService from '@/core/services/api.service'
// actions
export const LIBRARY = "library";
export const GET_API_LIBRARY = "getApiLibrary";
export const LIBRARIES = "libraries";
export const GET_API_LIBRARIES = "getApiLibraries";
export const USER_LIBRARIES = "userLibraries"
export const GET_API_USER_LIBRARIES = "getApiUserLibraries"

// mutations
const SET_LIBRARY = "setLibrary";
const SET_LIBRARIES = "setLibraries";
const SET_USER_LIBRARIES = "setUserLibraries";

export default {
    state: {
        library: null,
        libraries: null,
        user_libraries: null
    },
    getters: {
        getLibrary: (state) => state.library,
        getLibraries: (state) => state.libraries,
        getUserLibraries: (state) => state.user_libraries
    },
    actions: {
        [LIBRARY]: (context, payload) => context.commit(SET_LIBRARY, payload),
        [GET_API_LIBRARY]: async (context, id) => context.commit(SET_LIBRARY, (await ApiService.get(`libraries/id/${id}`)).data),
        [LIBRARIES]: (context, payload) => context.commit(SET_LIBRARIES, payload),
        [GET_API_LIBRARIES]: async (context) => context.commit(SET_LIBRARIES, (await ApiService.get(`libraries/`)).data),
        [USER_LIBRARIES]: (context, payload) => context.commit(SET_USER_LIBRARIES, payload),
        [GET_API_USER_LIBRARIES]:async(context, id) => context.commit(SET_USER_LIBRARIES, (await ApiService.get(`libraries/userid/${id}`)).data),
    },
    mutations: {
        [SET_LIBRARY]: (state, payload) => state.library = payload,
        [SET_LIBRARIES]: (state, payload) => state.libraries = payload,
        [SET_USER_LIBRARIES]: (state, payload) => state.user_libraries = payload
    }
}