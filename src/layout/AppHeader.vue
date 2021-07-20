<template>
  <div class="overflow-hidden" style="height: 90px">
    <v-app-bar color="header" app>
      <router-link to="/">
        <v-img src="@/assets/logo.png" width="55px" alt="Wizard-Orbit"></v-img>
      </router-link>
      <h2>{{ $t("title") }}</h2>
      <v-spacer></v-spacer>
      <div class="nav-close">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      </div>
      <div class="navbar-nav">
        <v-menu tile open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <a :class="`router-parent`" v-bind="attrs" v-on="on">
              {{ $t("menus.chapter") }}
            </a>
          </template>

          <v-list color="header">
            <v-list-item>
              <v-list-item-title>
                <router-link to="/chapter/showcase">
                  {{ $tc("keywords.showcase") }} <br />
                </router-link>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <router-link to="/chapter/category">
                  {{ $tc("keywords.category") }} <br />
                </router-link>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu tile open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <a :class="`router-parent`" v-bind="attrs" v-on="on">
              {{ $t("menus.news") }}
            </a>
          </template>

          <v-list color="header">
            <v-list-item>
              <v-list-item-title>
                <router-link to="/news/showcase">
                  {{ $tc("keywords.showcase") }} <br />
                </router-link>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <router-link to="/news/category">
                  {{ $tc("keywords.category") }} <br />
                </router-link>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu tile open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <a :class="`router-parent`" v-bind="attrs" v-on="on">
              {{ $t("menus.forum") }}
            </a>
          </template>

          <v-list color="header">
            <v-list-item>
              <v-list-item-title>
                <router-link to="/forum/showcase">
                  {{ $tc("keywords.showcase") }} <br />
                </router-link>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <router-link to="/forum/category">
                  {{ $tc("keywords.category") }} <br />
                </router-link>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <router-link
          :class="`router-parent`"
          to="/about"
          v-bind="attrs"
          v-on="on"
        >
          {{ $t("menus.about") }}
        </router-link>
      </div>
      <div class="theme-mode navbar-nav">
        <v-btn
          name="themeBtn"
          color="header_theme_btn"
          @click="themeMode(!$store.getters.getTheme.isDark)"
          icon
        >
          <v-icon>{{
            $store.getters.getTheme.isDark
              ? "mdi-weather-sunny"
              : "mdi-weather-night"
          }}</v-icon>
        </v-btn>
      </div>
      <div class="navbar-nav">
        <!-- I18N -->
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn fab x-small dark v-bind="attrs" v-on="on">
              <v-img width="0px" :src="$store.getters.getLang.icon"></v-img>
            </v-btn>
          </template>
          <div
            v-for="(item, index) in languages.filter(
              (x) => x.name != $store.getters.getLang.name
            )"
            :key="index"
            style="margin-top: 10px"
          >
            <v-btn
              fab
              x-small
              dark
              v-bind="attrs"
              v-on="on"
              @click="setLang(item)"
            >
              <v-img width="0px" :src="item.icon"></v-img>
            </v-btn>
          </div>
        </v-menu>
      </div>
      <div class="search navbar-nav">
        <v-text-field
          v-model="find"
          outlined
          dense
          color=""
          :placeholder="$t('keywords.find')"
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
            <v-list-item @click="open('https://panel.wizardorbit.com')">
              <v-list-item-title
                ><v-icon>mdi-solar-panel</v-icon>&nbsp;{{
                  $t("phrases.to_panel")
                }}</v-list-item-title
              >
            </v-list-item>
            <v-list-item @click="() => {}">
              <v-list-item-title
                ><v-icon>mdi-message</v-icon>&nbsp;
                {{ $t("keywords.messages") }}</v-list-item-title
              >
            </v-list-item>
            <v-list-item @click="toProfile()">
              <v-list-item-title
                ><v-icon>mdi-account</v-icon>&nbsp;
                {{ $t("phrases.my_profile") }}</v-list-item-title
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
                ><v-icon>mdi-lock-reset</v-icon>&nbsp;
                {{ $t("phrases.reset_password") }}</v-list-item-title
              >
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="logout()">
              <v-list-item-title
                ><v-icon>mdi-lock</v-icon>&nbsp;{{
                  $t("keywords.logout")
                }}</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div class="auth" v-else>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="500"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              name="loginBtn"
              color="header_login_btn"
              text
              dark
              v-bind="attrs"
              v-on="on"
            >
              {{ $t("keywords.login") }}
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
              <v-tab href="#login"> {{ $t("phrases.signin") }} </v-tab>
              <v-tab href="#register">
                {{ $t("phrases.signup") }}
              </v-tab>
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
        <v-btn
          name="themeBtn"
          color="header_theme_btn"
          @click="themeMode(!$store.getters.getTheme.isDark)"
          icon
        >
          <v-icon>{{
            $store.getters.getTheme.isDark
              ? "mdi-weather-sunny"
              : "mdi-weather-night"
          }}</v-icon>
        </v-btn>
        <!-- I18N -->
        <v-menu right offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn fab x-small dark v-bind="attrs" v-on="on">
              <v-img width="0px" :src="$store.getters.getLang.icon"></v-img>
            </v-btn>
          </template>
          <div
            v-for="(item, index) in languages.filter(
              (x) => x.name != $store.getters.getLang.name
            )"
            :key="index"
            style="margin-top: 10px"
          >
            <v-btn
              fab
              x-small
              dark
              v-bind="attrs"
              v-on="on"
              @click="setLang(item)"
            >
              <v-img width="0px" :src="item.icon"></v-img>
            </v-btn>
          </div>
        </v-menu>
      </div>
      <div class="search">
        <v-text-field
          v-model="find"
          outlined
          dense
          dark
          hide-details
          :placeholder="$t('keywords.find')"
          @keypress.enter="search()"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
      </div>
      <!-- Menus -->
      <v-list>
        <v-list-group :value="false">
          <template v-slot:activator>
            <v-list-item-title>{{ $t("menus.chapter") }}</v-list-item-title>
          </template>

          <v-list-item to="/chapter/showcase" link>
            <v-list-item-title>{{ $t("keywords.showcase") }}</v-list-item-title>
          </v-list-item>
          <v-list-item to="/chapter/category" link>
            <v-list-item-title>{{ $t("keywords.category") }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group :value="false">
          <template v-slot:activator>
            <v-list-item-title>{{ $t("menus.news") }}</v-list-item-title>
          </template>

          <v-list-item to="/news/showcase" link>
            <v-list-item-title>{{ $t("keywords.showcase") }}</v-list-item-title>
          </v-list-item>
          <v-list-item to="/news/category" link>
            <v-list-item-title>{{ $t("keywords.category") }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group :value="false">
          <template v-slot:activator>
            <v-list-item-title>{{ $t("menus.forum") }}</v-list-item-title>
          </template>

          <v-list-item to="/forum/showcase" link>
            <v-list-item-title>{{ $t("keywords.showcase") }}</v-list-item-title>
          </v-list-item>
          <v-list-item to="/forum/category" link>
            <v-list-item-title>{{ $t("keywords.category") }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item link>
          <v-list-item-title>{{ $t("menus.about") }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
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
      languages: [
        {
          name: "en",
          icon: require("../assets/vendor/svg/en.svg"),
        },
        {
          name: "de",
          icon: require("../assets/vendor/svg/de.png"),
        },
        {
          name: "fr",
          icon: require("../assets/vendor/svg/fr.svg"),
        },
        {
          name: "tr",
          icon: require("../assets/vendor/svg/tr.svg"),
        },
      ],
    };
  },
  async created() {
    window.addEventListener("scroll", this.onScroll);
    this.categories = this.$store.getters.getMenus
      .filter((y) => y.status)
      .sort((a, b) => a.sort - b.sort);
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
      await this.$store.dispatch("logout");
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
    /** Theme Mode */
    themeMode(status) {
      this.$store.dispatch("changeUserTheme", status);
    },
    /**
     * to Profile
     */
    toProfile() {
      this.$router.push({
        name: "Profile",
        params: { id: this.$store.getters.currentUser._id },
      });
    },
    open(path) {
      window.open(path);
    },
    afternoon() {
      this.$store.dispatch("theme", {
        isDark: false,
        name: "morning",
      });
    },
    setLang(item) {
      this.$store.dispatch("lang", item);
    },
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
.navbar-nav {
  margin-right: 10px;
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
.v-menu__content{
  box-shadow: none !important;
}
.v-menu__content .v-btn--is-elevated.v-btn--fab{
  box-shadow: none !important;
}
.v-menu__content .theme--dark.v-btn.v-btn--has-bg{
  background-color: transparent;
}
</style>