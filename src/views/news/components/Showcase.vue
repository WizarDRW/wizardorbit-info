<template>
  <div class="position-relative">
    <v-container fluid>
      <skeleton-loader v-if="loading"></skeleton-loader>
      <div v-else>
        <v-row>
          <v-col md="6">
            <carousel :_news="JSON.stringify(news)" v-on:content="toContent"></carousel>
          </v-col>
          <v-col md="6">
            <top :_news="JSON.stringify(news)" v-on:content="toContent"></top>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12" md="8">
            <time-line :_news="JSON.stringify(news)" v-on:content="toContent"></time-line>
          </v-col>
          <v-col md="4">
            <impression :_news="JSON.stringify(news)" v-on:content="toContent"></impression>
            <br />
            <impression
              :_news="JSON.stringify(news)"
              :_ly="'monthly'"
              v-on:content="toContent"
            ></impression>
            <br />
            <impression
              :_news="JSON.stringify(news)"
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
import { NEWS, GET_API_THE_NEWS } from "@/core/services/store/news.module";
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
      news: [],
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
    if (!this.$store.getters.getTheNews)
      await this.$store.dispatch(GET_API_THE_NEWS);
    this.news = this.$store.getters.getTheNews;
    if (this.news) this.loading = false;
  },
  methods: {
    toContent(content) {
      console.log(content);
      this.$store.dispatch(NEWS, content);
      this.$router.push({ name: "NewsContent", params: { id: content._id } });
    },
  },
  destroyed() {
    this.$store.dispatch(GET_API_THE_NEWS);
  },
};
</script>

<style lang="scss" scoped>
.position-relative {
  margin-top: 30px;
}
</style>