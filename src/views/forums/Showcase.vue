<template>
  <v-container>
    <div v-if="loading"></div>
    <v-row v-else>
      <v-col>
        <top :_forums="filterForums" v-on:content="toContent"></top>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4">
        <time-line :_forums="filterForums" v-on:content="toContent"></time-line>
      </v-col>
      <v-col md="3">
        <categories
          :_forums="forums"
          v-on:selectedCategory="selectedCategory"
        ></categories>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { FORUM, GET_API_FORUMS } from "@/core/services/store/forum.module";
export default {
  components: {
    TimeLine: () => import("./showcases/TimeLine"),
    Categories: () => import("./showcases/Category"),
    Top: () => import("./showcases/Top"),
  },
  data() {
    return {
      forums: null,
      filterForums: null,
      categories: null,
      loading: true
    };
  },
  async created() {
    if (!this.$store.getters.getForums)
      await this.$store.dispatch(GET_API_FORUMS);
    this.forums = this.$store.getters.getForums;
    this.filterForums = this.$store.getters.getForums;
    if (this.filterForums) this.loading = false;
  },
  computed: {
    selectedCategories: {
      get() {
        return this.categories;
      },
      set(val) {
        this.filterForums = [];
        this.categories.push({ ...val });
        this.categories.forEach((element) => {
          this.filterForums = this.forums.filter((x) => {
            var b = false;
            b = x.categories.some((y) => y.id === element.id);
            return b;
          });
        });
      },
    },
  },
  methods: {
    selectedCategory(val) {
      this.selectedCategories = { ...val };
    },
    toContent(content){
      this.$store.dispatch(FORUM, content);
      this.$router.push({ name: "ForumContent", params: { id: content._id } });
    }
  },
};
</script>

<style lang="scss" scoped>
</style>