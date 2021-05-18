<template>
  <div class="position-relative">
    <v-container fluid>
      <skeleton-loader v-if="loading"></skeleton-loader>
      <div v-else>
        <v-row>
          <v-col md="6">
            <carousel
              :_blogs="JSON.stringify(blogs)"
              v-on:content="toContent"
            ></carousel>
          </v-col>
          <v-col md="6">
            <top :_blogs="JSON.stringify(blogs)" v-on:content="toContent"></top>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12" md="8">
            <time-line
              :_blogs="JSON.stringify(blogs)"
              v-on:content="toContent"
            ></time-line>
          </v-col>
          <v-col md="4">
            <impression
              :_blogs="JSON.stringify(blogs)"
              v-on:content="toContent"
            ></impression>
            <br />
            <impression
              :_blogs="JSON.stringify(blogs)"
              :_ly="'monthly'"
              v-on:content="toContent"
            ></impression>
            <br />
            <impression
              :_blogs="JSON.stringify(blogs)"
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
import { BLOG, GET_API_BLOGS } from "@/core/services/store/blog.module";
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
      blogs: [],
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
    if (!this.$store.getters.getBlogs)
      await this.$store.dispatch(GET_API_BLOGS);
    this.blogs = this.$store.getters.getBlogs;
    if (this.blogs) this.loading = false;
  },
  methods: {
    toContent(content) {
      this.$store.dispatch(BLOG, content);
      this.$router.push({ name: "BlogContent", params: { id: content._id } });
    },
  },
  destroyed() {
    this.$store.dispatch(GET_API_BLOGS);
  },
};
</script>

<style lang="scss" scoped>
.position-relative {
  margin-top: 30px;
}
</style>