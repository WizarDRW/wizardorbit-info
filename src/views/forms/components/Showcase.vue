<template>
  <v-container>
    <v-row>
      <v-col>
        <top :_forms="filterForms"></top>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4">
        <time-line :_forms="JSON.stringify(filterForms)"></time-line>
      </v-col>
      <v-col md="3">
        <categories
          :_forms="JSON.stringify(forms)"
          v-on:selectedCategory="selectedCategory"
        ></categories>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ApiService from "@/core/services/api.service";
export default {
  components: {
    TimeLine: () => import("./showcases/TimeLine"),
    Categories: () => import("./showcases/Category"),
    Top: () => import("./showcases/Top"),
  },
  data() {
    return {
      forms: [],
      filterForms: [],
      categories: [],
    };
  },
  async created() {
    await ApiService.get("forms/").then((x) => {
      this.forms = x.data;
      this.filterForms = x.data;
    });
  },
  computed: {
    selectedCategories: {
      get() {
        return this.categories;
      },
      set(val) {
        this.filterForms = [];
        this.categories.push({ ...val });
        this.categories.forEach((element) => {
          this.filterForms = this.forms.filter((x) => {
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
  },
};
</script>

<style lang="scss" scoped>
</style>