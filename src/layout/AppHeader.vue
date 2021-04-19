<template>
  <div class="overflow-hidden" style="height: 90px">
    <v-app-bar
      dark
      dense
      app
    >
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
    <v-navigation-drawer v-model="drawer" absolute temporary app>
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
}
.nav-close {
  padding: 5px;
}
.search {
  padding: 10px;
  margin: 25px 0 0 0;
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
  background-color: #252525;
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
</style>