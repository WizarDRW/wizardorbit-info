import ApiService from "@/core/services/api.service";

// action types
export const GET_API_CONTENT = "getApiContent";
export const POST_API_CONTENT = "postApiContent";
export const IMPRESSION_CONTENT_UPDATE = "impressionContentUpdate"

export default {
    actions: {
        [GET_API_CONTENT]: async (context, { url, content }) => context.commit(content, (await ApiService.get(`${url}`)).data),
        [IMPRESSION_CONTENT_UPDATE]: async (context, { content, data }) =>
            ApiService.put(`/${content}/updateImpression/id/${data.id}`, {
                ip_address: data.ip,
                id: data.id,
            }),
        [POST_API_CONTENT]: async (context, { url, content, data }) => {
            var result = (await ApiService.post(`${url}`, data))
            context.commit(content, result.data)
            return result;
        },
    }
};
