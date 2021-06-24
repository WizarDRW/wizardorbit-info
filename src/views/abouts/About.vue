<template>
  <v-container>
    <v-row v-masonry>
      <v-col cols="12" sm="4" md="2" lg="2" xl="2">
        <v-navigation-drawer color="header" permanent width="100%">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{ $route.meta.description }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense nav>
            <v-list-item
              v-for="item in items"
              :key="item.title"
              @click="$router.push(item.path)"
              link
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-col>
      <v-col cols="12" sm="8" md="10" lg="10" xl="10">
        <router-view v-if="$store.getters.getAbouts"></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Hikayemiz",
          icon: "mdi-history",
          path: "/about/ourhistory",
        },
        { title: "Planlarımız", icon: "mdi-floor-plan", path: "/about/ourplan" },
        { title: "İletişim", icon: "mdi-human-greeting-proximity", path: "/about/contact" },
        { title: "Sürüm Notları", icon: "mdi-note-text-outline", path: "/about/release" },
      ],
      right: null,
    };
  },
  async created() {
    if(!this.$store.getters.getAbouts) await this.$store.dispatch('getApiAbouts')
  },
};
</script>

<style lang="">
</style>