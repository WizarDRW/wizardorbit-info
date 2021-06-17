<template>
  <v-app>
    <router-view name="header"></router-view>
    <v-main>
      <div class="content">
        <router-view :key="$route.path"></router-view>
      </div>
    </v-main>
    <router-view name="footer"></router-view>
  </v-app>
</template>

<script>
import ApiService from "@/core/services/api.service.js";
import { CURRENT_USER } from "@/core/services/store/auth.module";
export default {
  components: {},
  data() {
    return {
      option: {},
      loading: true,
    };
  },
  async beforeCreate() {
    await this.$store.dispatch(CURRENT_USER);
    ApiService.get("/options").then((x) => {
      localStorage.setItem("option", JSON.stringify(x.data));
      this.loading = false;
    });
    if (this.$store.getters["isAuthenticated"])
      await this.$store.dispatch(
        "getApiUserTheme",
        this.$store.getters.currentUser._id
      );
  },
  metaInfo() {
    return {
      title: "Sihirbaz Forum",
      meta: [
        {
          name: "description",
          content:
            "En yeni teknoloji haberleri, Bilgi öğrenmek için yazılar ve sorunlarınıza çözüm bulur. ",
        },
        {
          property: "og:title",
          content: "Sihirbaz Forum",
        },
        { property: "og:sihirbazforum.com", content: "Sihirbaz" },
        { property: "og:type", content: "website" },
        { name: "robots", content: "index,follow" },
      ],
    };
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400;1,500&display=swap");
#app {
  font-family: "Montserrat", sans-serif;
  background-color: var(--v-background-base);
}
.content {
  margin-top: 30px;
}
.v-tabs-slider-wrapper {
  height: 5px !important;
}
.v-tab {
  color: var(--v-v_tabs_iactive_color-base) !important;
}
.v-tab--active {
  font-weight: bold !important;
}
</style>