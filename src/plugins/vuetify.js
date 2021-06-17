import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'
import store from "@/core/services/store/store"
import themes from "../core/themes"

const vuetify = new Vuetify()

Vue.use(Vuetify);

Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: 'mdi'
})

const st_ = store.getters.getUserTheme;

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: st_ ? st_.light.color_scss:themes.light,
      dark: st_ ? st_.dark.color_scss:themes.dark
    },
    dark: store.getters.getTheme.isDark
  }
});
