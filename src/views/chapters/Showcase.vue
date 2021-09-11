<template>
  <div class="position-relative">
    <v-container fluid>
      <skeleton-loader v-if="loading"></skeleton-loader>
      <div v-else>
        <v-row>
          <v-col md="6">
            <carousel
              :_contents="chapters"
              v-on:content="toContent"
            ></carousel>
          </v-col>
          <v-col md="6">
            <top
              :_contents="chapters"
              v-on:content="toContent"
            ></top>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12" md="8">
            <time-line :_contents="chapters" v-on:content="toContent">
              <template #default="{ item }">
                <v-card-subtitle>
                  <i>{{ item.short_description }}</i>
                </v-card-subtitle>
              </template>
            </time-line>
          </v-col>
          <v-col md="4">
            <impression
              :_contents="chapters"
              v-on:content="toContent"
            ></impression>
            <br />
            <impression
              :_contents="chapters"
              :_ly="'monthly'"
              v-on:content="toContent"
            ></impression>
            <br />
            <impression
              :_contents="chapters"
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
export default {
  components: {
    Carousel: () => import("@/components/showcases/Slider"),
    Top: () => import("@/components/showcases/Top"),
    TimeLine: () => import("@/components/TimeLine.vue"),
    Impression: () => import("@/components/showcases/Impression"),
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
      await this.$store.dispatch("clientChapters");
    this.chapters = this.$store.getters.getChapters;
    if (this.chapters) this.loading = false;
  },
  methods: {
    toContent(content) {
      this.$store.commit("setChapter", content);
      this.$router.push({
        name: "ChapterContent",
        params: { id: content._id },
      });
    },
  },
  destroyed() {
    this.$store.dispatch("getApiContent", {
      url: "chapters/client",
      content: "setChapters",
    });
  },
};
</script>

<style lang="scss" scoped>
.position-relative {
  margin-top: 30px;
}
</style>