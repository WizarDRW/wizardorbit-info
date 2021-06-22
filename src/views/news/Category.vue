<template>
  <div>
    <v-row>
      <v-col md="2">
        <v-card>
          <v-text-field
            label="Ara"
            placeholder="Ara"
            outlined
            dense
            v-model="search"
          ></v-text-field>
          <v-date-picker v-model="dates" range full-width></v-date-picker>
          <br /><br />
        </v-card>
      </v-col>
      <v-col v-if="!loading" md="10">
        <v-row v-masonry>
          <v-col
            v-for="item in filterNewsList"
            :key="item._id"
            cols="12"
            sm="6"
            md="3"
            lg="3"
            xl="2"
          >
            <v-card
              ><div @click="$router.push(`/blog/${item._id}`)" class="click">
                <v-img :src="item.image_path"></v-img>
                <v-card-title>
                  {{ item.name }}
                </v-card-title>
                <v-card-text>
                  <span>{{ item.short_description }}</span>
                </v-card-text>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>


<script>
import moment from "moment";
export default {
  components: {},
  data() {
    return {
      news: [],
      filternews: [],
      loading: true,
      valueConsistsOf: "ALL",
      search: "",
      categories: [],
      dates: [],
    };
  },
  async mounted() {
    await this.$store.dispatch("getApiCategory", "news");
    this.categories = this.$store.getters.getCategories;
    if (!this.$store.getters.getNews)
      await this.$store.dispatch("getApiNews");
    this.news = this.$store.getters.getNews;
    this.filterNewsList = this.news;
    if (this.news) this.loading = false;
  },
  computed: {
    filterNewsList: {
      get() {
        return this.filternews;
      },
      set(value) {
        this.filternews = value;
      },
    },
  },
  methods: {
    filter() {
      this.filterNewsList = this.news.filter((x) => {
        return (
          moment(x.create_date).format("YYYY-MM-DD") >= moment(this.dates[0]) &&
          moment(x.create_date).format("YYYY-MM-DD") <= moment(this.dates[1]) &&
          x.name.toLowerCase().includes(this.search.toLowerCase()) &&
          this.filter_category(x)
        );
      });
    },
    filter_category(x) {
      var data = true;
      if (this.categories.length > 0) {
        this.categories.some(function (element) {
          if (x.categories.includes(element)) return (data = true);
          else {
            return (data = false);
          }
        });
      }
      return data;
    },
  },
  watch: {
    dates: {
      deep: true,
      handler() {
        this.filter();
      },
    },
    search() {
      this.filter();
    },
    categories() {
      this.filter();
    },
  },
};
</script>

<style lang="scss">
.vue-treeselect div,
.vue-treeselect span {
  background-color: #1e1e1e;
}
</style>