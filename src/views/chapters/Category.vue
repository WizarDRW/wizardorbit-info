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
          <treeselect
            :multiple="true"
            dark
            :options="chaptercategories"
            :value-consists-of="valueConsistsOf"
            v-model="categories"
            placeholder="Kategori veya kategorileri seçiniz..."
            :joinValues="true"
            noResultsText="İstediğiniz kategori bulunmamaktadır!"
            value="id[]"
          />
        </v-card>
      </v-col>
      <v-col md="10">
        <v-row>
          <v-col v-for="item in filterChapterList" :key="item._id">
            <v-card
              ><div @click="$router.push(`/blog/${item._id}`)" class="click">
                <v-img
                  :src="item.image_path"
                  width="200px"
                  height="auto"
                ></v-img>
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
import ApiService from "@/core/services/api.service.js";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import moment from "moment";
export default {
  components: {
    Treeselect,
  },
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
    };
  },
  mounted() {
    ApiService.get("/chaptercategories").then((x) => {
      this.chaptercategories = x.data.map((x) => {
        return {
          id: x.id,
          label: x.label,
          children: x.children,
        };
      });
      ApiService.get("/chapters").then((x) => {
        this.chapters = x.data;
        this.filterChapterList = this.chapters;
      });
      this.loading = false;
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
      this.filterChapterList = this.chapters.filter((x) => {
        return (
          moment(x.create_date).format("YYYY-MM-DD") >=
            moment(this.dates[0]).format("YYYY-MM-DD") &&
          moment(x.create_date).format("YYYY-MM-DD") <=
            moment(this.dates[1]).format("YYYY-MM-DD") &&
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