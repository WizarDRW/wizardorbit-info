import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/core/services/jwt.service";

/**
 * Service to call HTTP request via Axios
 */
const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = "/service/api/v1/";
    // Vue.axios.defaults.baseURL = "http://localhost:3000/api/v1/";
    // Vue.axios.defaults.baseURL = "http://192.168.1.3:3000/api/v1/";
  },

  /**
   * Set the default HTTP request headers
   */
  setHeader() {
    // Vue.axios.defaults.headers.common[
    //   "Authorization"
    // ] = `Bearer ${JwtService.getToken()}`;
    Vue.axios.defaults.withCredentials = true;
  },
  query(resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      // console.log(error);
      throw new Error(`ApiService ${error}`);
    });
  },

  /**
   * Send the GET HTTP request
   * @param resource
   * @param slug
   * @returns {*}
   */
  async get(resource, slug = "") {
    return await Vue.axios.get(`${resource}/${slug}`, this.setHeader()).catch(error => {
      // console.log(error);
      throw new Error(`ApiService ${error}`);
    });
  },

  /**
   * Set the POST HTTP request
   * @param resource
   * @param params
   * @returns {*}
   */
  async post(resource, params) {
    return await Vue.axios.post(`${resource}`, params);
  },

  async postImage(resource, params) {
    return await Vue.axios.post(`${resource}`, params, { "Authorization": `Bearer ${JwtService.getToken()}`, "Content-Type": "multipart/form-data" });
  },
  /**
   * Send the UPDATE HTTP request
   * @param resource
   * @param slug
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  async update(resource, slug, params) {
    return await Vue.axios.put(`${resource}/${slug}`, params);
  },

  /**
   * Send the PUT HTTP request
   * @param resource
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  async put(resource, params) {
    return await Vue.axios.put(`${resource}`, params);
  },

  /**
   * Send the DELETE HTTP request
   * @param resource
   * @returns {*}
   */
  async delete(resource) {
    return await Vue.axios.delete(resource).catch(error => {
      // console.log(error);
      throw new Error(`ApiService ${error}`);
    });
  }
};

export default ApiService;