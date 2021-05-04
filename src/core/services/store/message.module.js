import ApiService from "@/core/services/api.service";
// action types
export const MESSAGE = "message";

// mutation types
export const SET_MESSAGE = "setMessage";
export const PURGE_MESSAGE = "purgeMessage";

export default {
    state: {
        message: {},
        err: null
    },
    getters: {
        getMessage(state) {
            return state.message;
        }
    },
    actions: {
        [MESSAGE](context) {
            ApiService.get(
                `messages/userid/${this.getters.currentUser._id}`
            ).then(result => {
                context.commit(SET_MESSAGE, result.data);
            }).catch(err => {
                context.commit(PURGE_MESSAGE, err)
            });
        },
    },
    mutations: {
        [SET_MESSAGE](state, data) {
            state.message = data;
        },
        [PURGE_MESSAGE](state, err) {
            state.message = {};
            state.err = err;
        }
    }
};
