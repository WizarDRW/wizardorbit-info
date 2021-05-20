<template>
  <v-container fluid>
    <div v-if="loading">
      <skeleton-loader></skeleton-loader>
    </div>
    <v-row v-else>
      <v-col cols="12" sm="12" md="6" lg="6">
        <h2>En popüler kitaplar</h2>
        <v-row v-masonry>
          <v-col
            v-for="(item, index) in libraries"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            lg="4"
            xl="4"
          >
            <v-card hover tile outlined>
              <v-img
                height="150"
                :src="
                  item.image_path
                    ? item.image_path
                    : require('@/assets/vendor/img/old_book.jpeg')
                "
              ></v-img>
              <v-card-title> {{ item.name }} </v-card-title>
              <v-card-text> {{ item.description }} </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="6">
        <h2>Bu hafta en çok okunanlar</h2>
        <v-row v-masonry>
          <v-col
            v-for="(item, index) in libraries"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            lg="4"
            xl="3"
          >
            <v-card hover tile outlined>
              <v-img
                height="150"
                :src="
                  item.image_path
                    ? item.image_path
                    : require('@/assets/vendor/img/old_book.jpeg')
                "
              ></v-img>
              <v-card-title> {{ item.name }} </v-card-title>
              <v-card-text> {{ item.description }} </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  LIBRARIES,
  GET_API_LIBRARIES,
} from "@/core/services/store/library.module";
export default {
  components: {
    SkeletonLoader: () => import("@/components/SkeletonLoader"),
  },
  data() {
    return {
      libraries: [],
      loading: true,
    };
  },
  async created() {
    if (!this.$store.getters.getLibraries)
      await this.$store.dispatch(GET_API_LIBRARIES);
    this.libraries = this.$store.getters.getLibraries;
    if (this.libraries) this.loading = false;
  },
  methods: {
    toContent(content) {
      this.$store.dispatch(LIBRARIES, content);
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