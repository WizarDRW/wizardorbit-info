<template>
  <div class="overflow-hidden" style="height: 90px">
    <v-app-bar color="header" app>
      <router-link to="/">
        <img src="@/assets/sihirbazforum.png" width="150px" alt="sihirbaz" />
      </router-link>
      <v-spacer></v-spacer>
      <div class="nav-close">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      </div>
      <div class="navbar-nav">
        <v-menu
          v-for="item in categories"
          :key="item._id"
          tile
          open-on-hover
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <a :class="`router-parent`" v-bind="attrs" v-on="on">
              {{ item.name }}
            </a>
          </template>

          <v-list color="header">
            <v-list-item
              v-for="(child, index) in item.children.filter((x) => x.status)"
              :key="index"
            >
              <v-list-item-title>
                <router-link :to="child.path">
                  {{ child.name }} <br />
                  <span>{{ child.description }}</span>
                </router-link>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div class="theme-mode navbar-nav">
        <v-btn name="themeBtn" color="header_theme_btn" @click="themeMode(!$store.getters.getTheme.isDark)" icon>
          <v-icon>{{
            $store.getters.getTheme.isDark
              ? "mdi-weather-sunny"
              : "mdi-weather-night"
          }}</v-icon>
        </v-btn>
      </div>
      <div class="search navbar-nav">
        <v-text-field
          v-model="find"
          outlined
          dense
          color=""
          placeholder="Ara"
          @keypress.enter="search()"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
      </div>
      <div v-if="$store.getters.isAuthenticated">
        <v-menu left bottom offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar
              v-if="$store.getters.currentUser.image_path"
              v-bind="attrs"
              v-on="on"
            >
              <img
                :src="$store.getters.currentUser.image_path"
                :alt="$store.getters.currentUser.first_name"
              />
            </v-avatar>
            <v-avatar v-else v-bind="attrs" v-on="on">
              <span class="white--text headline">{{
                firstChar(
                  $store.getters.currentUser.first_name
                    ? $store.getters.currentUser.first_name
                    : "",
                  $store.getters.currentUser.last_name
                    ? $store.getters.currentUser.last_name
                    : ""
                )
              }}</span>
            </v-avatar>
          </template>
          <v-list>
            <v-list-item @click="open()">
              <v-list-item-title
                ><v-icon>mdi-solar-panel</v-icon>&nbsp;Panele
                Git</v-list-item-title
              >
            </v-list-item>
            <v-list-item @click="() => {}">
              <v-list-item-title
                ><v-icon>mdi-message</v-icon>&nbsp; Mesajlar</v-list-item-title
              >
            </v-list-item>
            <v-list-item @click="toProfile()">
              <v-list-item-title
                ><v-icon>mdi-account</v-icon>&nbsp; Profilim</v-list-item-title
              >
            </v-list-item>
            <v-list-item
              @click="
                () => {
                  resetDialog = true;
                }
              "
            >
              <v-list-item-title
                ><v-icon>mdi-lock-reset</v-icon>&nbsp; Şifre
                Değiştir</v-list-item-title
              >
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="logout()">
              <v-list-item-title
                ><v-icon>mdi-lock</v-icon>&nbsp;Çıkış</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div class="auth" v-else>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn name="loginBtn" color="header_login_btn" text dark v-bind="attrs" v-on="on">
              Giriş
            </v-btn>
          </template>
          <v-card>
            <v-tabs
              v-model="tab"
              background-color="primary accent-4"
              align-with-title
              color="purple"
            >
              <v-tabs-slider color="yellow"></v-tabs-slider>
              <v-tab href="#login"> Kullanıcı Girişi </v-tab>
              <v-tab href="#register"> Kayıt Ol </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item value="login">
                <v-card flat>
                  <login></login>
                </v-card>
              </v-tab-item>
              <v-tab-item value="register">
                <v-card flat>
                  <register></register>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>
    <v-navigation-drawer color="header" v-model="drawer" temporary app>
      <div class="theme-mode">
        <v-btn name="themeBtn" color="header_theme_btn" @click="themeMode()" icon>
          <v-icon>{{
            $store.getters.getTheme.dark
              ? "mdi-weather-sunny"
              : "mdi-weather-night"
          }}</v-icon>
        </v-btn>
      </div>
      <div class="search">
        <v-text-field
          v-model="find"
          outlined
          dense
          dark
          placeholder="Ara"
          @keypress.enter="search()"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
      </div>
      <v-list nav dense>
        <div v-for="item in categories" :key="item._id">
          <h3>{{ item.name }}</h3>
          <ul>
            <li
              v-for="child in item.children.filter((x) => x.status)"
              :key="child.name"
            >
              <router-link :to="child.path">{{ child.name }}</router-link>
            </li>
          </ul>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>


<script>
import ApiService from "@/core/services/api.service.js";
import { LOGOUT } from "@/core/services/store/auth.module";
import { THEME } from "@/core/services/store/option.module";

export default {
  components: {
    Login: () => import("@/views/auth/Login.vue"),
    Register: () => import("@/views/auth/Register.vue"),
  },
  data() {
    return {
      logo: "",
      categories: [],
      socials: [],
      find: "",
      drawer: false,
      group: null,
      windowTop: 0,
      headerStyle: "pos-rel",
      menu: false,
      tab: "login",
      isLogin: false,
    };
  },
  created() {
    window.addEventListener("scroll", this.onScroll);
    ApiService.get("/menus/").then((x) => {
      this.categories = x.data
        .filter((y) => y.status)
        .sort((a, b) => a.sort - b.sort);
    });
    var result = JSON.parse(localStorage.getItem("option"));
    var json = result.find((x) => x.key == "header").json;
    this.logo = json.header_logo;
    this.socials = json.json_social;
    document.title = json.title;
  },
  methods: {
    /**
     * User Logout
     */
    async logout() {
      await this.$store.dispatch(LOGOUT);
    },
    /**
     * Return user's full name with user's data
     * @param {String} first_name
     * @param {String} last_name
     */
    firstChar(first_name, last_name) {
      let first_char = first_name.split("")[0] + "" + last_name.split("")[0];
      return first_char;
    },
    /**
     * Search objects
     */
    search() {
      if (this.find != "") this.$router.push("/find/" + this.find);
    },
    /**
     * Admin panel open
     */
    open() {
      window.open(
        `https://panel.sihirbazforum.com/auth/${localStorage.getItem(
          "id_token"
        )}`
      );
    },
    /** Theme Mode */
    themeMode(status) {
      this.$store.dispatch(THEME, {
        isDark: status,
        name: status ? "dark" : "light",
      });
    },
    /**
     * to Profile
     */
    toProfile(){
      
    },
    afternoon() {
      this.$store.dispatch(THEME, {
        isDark: false,
        name: "morning"
      })
    }
  },
  watch: {
    windowTop(newValue, oldValue) {
      if (newValue == 0) this.headerStyle = "pos-rel";
      else if (newValue < oldValue && newValue > 65)
        this.headerStyle = "pos-fix";
      else if (newValue > oldValue && newValue >= 65)
        this.headerStyle = "pos-fix-hidden";
    },
  },
};
</script>


<style lang="scss" scoped>
.nav-close {
  padding: 5px;
}
.search {
  padding: 10px;
  margin: 25px 0 0 0;
}
a {
  color: var(--v-header-lighten5) !important;
  text-decoration: none;
  margin-right: 20px;
}
.dropdown-menu-inner {
  display: none;
  position: absolute;
}
.nav-item:hover .dropdown-menu-inner {
  display: block;
}
.nav-close {
  display: none;
}
.media-body:hover > .dropdown-menu-inner {
  display: block;
}
@media only screen and (max-width: 960px) {
  .navbar-nav {
    display: none;
  }
  .nav-close {
    display: block;
  }
}
ul li {
  list-style-type: none;
  padding: 5px 0 0 0;
}
.message {
  position: fixed;
  bottom: 0;
  right: 10px;
  z-index: 9;
}
</style>