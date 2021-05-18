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
          :_forms="forms"
          v-on:selectedCategory="selectedCategory"
        ></categories>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { FORM, GET_API_FORMS } from "@/core/services/store/form.module";
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
    if (!this.$store.getters.getForms)
      await this.$store.dispatch(GET_API_FORMS);
    this.forms = this.$store.getters.getForms;
    this.filterForms = this.$store.getters.getForms;
    if (this.blogs) this.loading = false;
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
    toContent(content){
      this.$store.dispatch(FORM, content);
      this.$router.push({ name: "FormContent", params: { id: content._id } });
    }
  },
};
</script>

<style lang="scss" scoped>
</style>