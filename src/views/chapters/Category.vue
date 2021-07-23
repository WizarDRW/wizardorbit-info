<template>
  <div>
    <br>
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
          <v-date-picker
            v-model="dates"
            :events="arrayEvents"
            event-color="green lighten-1"
            range
            full-width
          ></v-date-picker>
          <br /><br />
        </v-card>
      </v-col>
      <v-col v-if="!loading" md="10">
        <v-row v-masonry>
          <v-col
            v-masonry-tile
            v-for="item in filterChapterList"
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
      chapters: [],
      filterchapters: [],
      chaptercategories: [],
      loading: true,
      valueConsistsOf: "ALL",
      search: "",
      categories: [],
      dates: [],
      arrayEvents: null,
    };
  },
  async mounted() {
    await this.$store.dispatch("getApiCategory", "chapter");
    this.chaptercategories = this.$store.getters.getCategories;
    if (!this.$store.getters.getChapters)
      await this.$store.dispatch("getApiContent", {
        url: "chapters",
        content: "setChapters",
      });
    this.chapters = this.$store.getters.getChapters;
    this.filterChapterList = this.chapters;
    if (this.chapters) this.loading = false;
    this.arrayEvents = this.chapters.map((x) => {
      const date = new Date(x.create_date);
      return date.toISOString().substr(0, 10);
    });
  },
  computed: {
    filterChapterList: {
      get() {
        return this.filterchapters;
      },
      set(value) {
        this.filterchapters = value;
      },
    },
  },
  methods: {
    filter() {
      let start = new Date("1971-06-20").toString();
      let end = new Date().toString();
      if (this.dates.length > 0) {
        if (new Date(this.dates[0]) < new Date(this.dates[1])) {
          start = this.dates[0];
          end = this.dates[1];
        } else {
          start = this.dates[1];
          end = this.dates[0];
        }
      }
      this.filterChapterList = this.chapters.filter((x) => {
        return (
          moment(x.create_date).format("YYYY-MM-DD") >=
            moment(start).format("YYYY-MM-DD") &&
          moment(x.create_date).format("YYYY-MM-DD") <=
            moment(end).format("YYYY-MM-DD") &&
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