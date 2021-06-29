<template>
  <v-container fluid>
    <div v-if="loading">
      <skeleton-loader></skeleton-loader>
    </div>
    <v-row v-else>
      <v-col cols="12" sm="12" md="6" lg="6">
        <h2>En popüler kitaplar</h2>
        <top :_libraries="libraries"></top>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="6">
        <h2>Bu hafta en çok okunanlar</h2>
        <top :_libraries="libraries"></top>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {
    SkeletonLoader: () => import("@/components/SkeletonLoader"),
    Top: () => import(`./showcases/Top`),
  },
  data() {
    return {
      libraries: [],
      loading: true,
    };
  },
  async created() {
    if (!this.$store.getters.getLibraries)
      await this.$store.dispatch("getApiContent", {
        url: `libraries`,
        content: "setLibraries",
      });
    this.libraries = this.$store.getters.getLibraries;
    if (this.libraries) this.loading = false;
  },
  methods: {
    toContent(content) {
      this.$store.commit('setLibrary', content);
      this.$router.push({
        name: "LibraryContent",
        params: { id: content._id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>