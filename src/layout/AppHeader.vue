<template>
  <div class="overflow-hidden" style="height: 90px">
    <v-app-bar
      color="#43a047"
      dark
      dense
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-5"
      :class="`${headerStyle}`"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(55,236,186,.8), rgba(25,32,72,1)"
        ></v-img>
      </template>

      <img :src="logo" width="200px" alt="sihirbaz" />
      <v-spacer></v-spacer>
      <div class="nav-close">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      </div>
      <div class="navbar-nav">
        <v-menu
          v-for="item in categories"
          :key="item._id"
          dark
          tile
          open-on-hover
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <a class="router-parent" v-bind="attrs" v-on="on">
              {{ item.name }}
            </a>
          </template>

          <v-list>
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
    </v-app-bar>
    <app-sub-header></app-sub-header>
    <v-navigation-drawer v-model="drawer" absolute temporary>
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

export default {
  components: {
    AppSubHeader: () => import("./AppSubHeader"),
  },
  data() {
    return {
      logo: "",
      categories: [],
      socials: [],
      user: null,
      find: "",
      drawer: false,
      group: null,
      windowTop: 0,
      headerStyle: "pos-rel",
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
    isLogin() {
      var u = localStorage.getItem("USER_INFO");
      if (u) {
        this.user = u;
        return true;
      } else return false;
    },
    logout() {
      localStorage.removeItem("USER_INFO");
      this.$router.push({ name: "Home" });
    },
    search() {
      if (this.find != "") this.$router.push("/find/" + this.find);
    },
    onScroll() {
      this.windowTop = window.top.scrollY;
    },
  },
  watch: {
    windowTop(newValue, oldValue) {
      if (newValue == 0) this.headerStyle = "pos-rel";
      else if (newValue < oldValue && newValue > 65) this.headerStyle = "pos-fix";
      else if (newValue > oldValue && newValue >= 65) this.headerStyle = "pos-fix-hidden";
    },
  },
};
</script>


<style scoped>
.navbar-nav {
  display: flex;
  padding: 12px;
}
.nav-close {
  padding: 5px;
}
.search {
  padding: 10px;
}
a {
  color: #fff !important;
  text-decoration: none;
  margin-right: 20px;
}
a span {
  color: #b4b4b4;
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
.v-list-item:hover {
  background-color: #383838;
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
.pos-rel {
  height: 65px !important;
  position: relative;
  transition: all .5s;
}
.pos-fix {
  height: 65px !important;
  position: fixed;
  top: 0;
  z-index: 999;
  animation: smoothScroll 0.5s forwards;
}
.pos-fix-hidden {
  height: 65px !important;
  position: fixed;
  z-index: 999;
  animation: smoothScrollHidden 0.5s forwards;
}
@keyframes smoothScroll {
  0% {
    transform: translateY(-65px);
  }
  100% {
    transform: translateY(0px);
  }
}
@keyframes smoothScrollHidden {
  0% {
    top: 0px;
  }
  100% {
    top: -65px;
  }
}
</style>