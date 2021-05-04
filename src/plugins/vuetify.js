import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'
import store from "@/core/services/store/store"
import themes from "./themes"

const vuetify = new Vuetify()
Vue.use(Vuetify);
Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: 'mdi'
})

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: themes,
    dark: store.getters.getTheme.dark
  }
});
