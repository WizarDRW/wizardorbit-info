<template>
  <v-app>
    <router-view name="header"></router-view>
    <v-main>
      <router-view :key="$route.path"></router-view>
    </v-main>
    <router-view name="footer"></router-view>
  </v-app>
</template>

<script>
export default {
  async beforeCreate() {
    await this.$store.dispatch("currentUser");
    if (this.$store.getters["isAuthenticated"])
      await this.$store.dispatch("getApiContent", {
        url: `useroptions/theme/${this.$store.getters.currentUser._id}`,
        content: "setUserTheme",
      });
  },
  metaInfo() {
    return {
      title: `${this.$i18n.t("title")}`,
      meta: [
        {
          name: "description",
          content:
            "En yeni teknoloji haberleri, Bilgi öğrenmek için yazılar ve sorunlarınıza çözüm bulur. ",
        },
        {
          property: "og:title",
          content: "Wizard Orbit",
        },
        { property: "og:wizardorbit.com", content: "Sihirbaz" },
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