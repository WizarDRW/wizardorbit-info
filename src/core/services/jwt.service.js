import Vue from 'vue'
const KEY = "connect.sid";

export const getToken = () => {
  return Vue.$cookies && Vue.$cookies.get(KEY);
};

export const saveToken = token => {
  Vue.$cookies && Vue.$cookies.set(KEY, token)
};

export const destroyToken = () => {
  Vue.$cookies && Vue.$cookies.remove(KEY)
};

export default { getToken, saveToken, destroyToken };
