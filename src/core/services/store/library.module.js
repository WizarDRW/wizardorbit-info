// mutations
export const SET_LIBRARY = "setLibrary";
export const SET_LIBRARIES = "setLibraries";
export const SET_USER_LIBRARIES = "setUserLibraries";

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
    mutations: {
        [SET_LIBRARY]: (state, payload) => state.library = payload,
        [SET_LIBRARIES]: (state, payload) => state.libraries = payload,
        [SET_USER_LIBRARIES]: (state, payload) => state.user_libraries = payload
    }
}