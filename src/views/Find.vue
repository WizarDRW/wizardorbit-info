<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="6">
          <h2>Blog Aramaları</h2>
          <v-row>
            <v-col v-for="item in blogs" :key="item._id">
              <v-card>
                <img :src="item.image_path" width="100%" alt="" />
                <v-card-title>
                  {{ item.name }}
                </v-card-title>
                <v-card-text>
                  <i>{{ item.short_description }}</i>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <h2>Haber Aramaları</h2>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import ApiService from "@/core/services/api.service.js";
export default {
  components: {},
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
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      ApiService.get(`/blogs/find/${this.$route.params.text}`).then((x) => {
        this.blogs = x.data.sort(
          (x, y) => new Date(y.create_date) - new Date(x.create_date)
        );
        this.loading = false;
      });
    },
    getCategories(categories) {
      var cat = "";
      categories.forEach((element, index, array) => {
        if (index === array.length - 1) {
          cat += element;
        } else cat += element + ", ";
      });
      return cat;
    },
  },
  watch: {
    "$route.params.text": function () {
      this.getData();
    },
  },
};
</script>


<style lang="scss" scoped>
</style>