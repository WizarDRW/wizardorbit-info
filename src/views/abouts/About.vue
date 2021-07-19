<template>
  <v-container>
    <v-row v-masonry>
      <v-col cols="12" sm="4" md="2" lg="2" xl="2">
        <v-navigation-drawer color="header" permanent width="100%">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{ title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense nav>
            <v-list-item @click="$router.push({ path: '/about/who-we-are' })" link>
              <v-list-item-icon>
                <v-icon> mdi-account-group </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('phrases.who_we_are') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="$router.push({ path: '/about/ourhistory' })" link>
              <v-list-item-icon>
                <v-icon> mdi-history </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('phrases.our_history') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="$router.push({ path: '/about/ourplan' })" link>
              <v-list-item-icon>
                <v-icon> mdi-floor-plan </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('phrases.our_plan') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="$router.push({ path: '/about/contact' })" link>
              <v-list-item-icon>
                <v-icon> mdi-human-greeting-proximity </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('keywords.contact') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="$router.push({ path: '/about/release' })" link>
              <v-list-item-icon>
                <v-icon> mdi-note-text-outline </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('phrases.release_notes') }}</v-list-item-title>
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
      right: null,
    };
  },
  async created() {
    if (!this.$store.getters.getAbouts)
      await this.$store.dispatch("getApiContent", {
        url: `abouts`,
        content: "setAbouts",
      });
  },
  computed: {
    title() {
      return this.$i18n.t(this.$route.meta.i18n)
    }
  }
};
</script>

<style lang="">
</style>