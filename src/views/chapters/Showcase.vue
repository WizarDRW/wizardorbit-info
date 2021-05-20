<template>
  <div class="position-relative">
    <v-container fluid>
      <skeleton-loader v-if="loading"></skeleton-loader>
      <div v-else>
        <v-row>
          <v-col md="6">
            <carousel
              :_chapters="JSON.stringify(chapters)"
              v-on:content="toContent"
            ></carousel>
          </v-col>
          <v-col md="6">
            <top :_chapters="JSON.stringify(chapters)" v-on:content="toContent"></top>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12" md="8">
            <time-line
              :_chapters="JSON.stringify(chapters)"
              v-on:content="toContent"
            ></time-line>
          </v-col>
          <v-col md="4">
            <impression
              :_chapters="JSON.stringify(chapters)"
              v-on:content="toContent"
            ></impression>
            <br />
            <impression
              :_chapters="JSON.stringify(chapters)"
              :_ly="'monthly'"
              v-on:content="toContent"
            ></impression>
            <br />
            <impression
              :_chapters="JSON.stringify(chapters)"
              :_ly="'yearly'"
              v-on:content="toContent"
            ></impression>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import { CHAPTER, GET_API_CHAPTERS } from "@/core/services/store/chapter.module";
export default {
  components: {
    Carousel: () => import("./showcases/Slider"),
    Top: () => import("./showcases/Top"),
    TimeLine: () => import("./showcases/TimeLine"),
    Impression: () => import("./showcases/Impression"),
    SkeletonLoader: () => import("@/components/loaders/ShowcaseSkeletonLoader"),
  },
  data() {
    return {
      chapters: [],
      modal: false,
      contact: {
        email: "",
        phone: "",
        text: "",
      },
      loading: true,
      alert: false,
      disabled: false,
    };
  },
  async created() {
    if (!this.$store.getters.getChapters)
      await this.$store.dispatch(GET_API_CHAPTERS);
    this.chapters = this.$store.getters.getChapters;
    if (this.chapters) this.loading = false;
  },
  methods: {
    toContent(content) {
      this.$store.dispatch(CHAPTER, content);
      this.$router.push({ name: "ChapterContent", params: { id: content._id } });
    },
  },
  destroyed() {
    this.$store.dispatch(GET_API_CHAPTERS);
  },
};
</script>

<style lang="scss" scoped>
.position-relative {
  margin-top: 30px;
}
</style>