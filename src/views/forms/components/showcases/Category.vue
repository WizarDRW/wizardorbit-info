<template>
  <div>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="data"
        hide-default-footer
        @click:row="(item) => clicked(item)"
        class="elevation-1"
      >
        <template #[`item.icon`]="{ item }">
          <v-icon>
            {{ item.icon }}
          </v-icon>
        </template>
        <template #[`item.label`]="{ item }">
          <div>
            {{ item.label }}
          </div>
        </template>
        <template #[`item.count`]="{ item }">
          <div class="text-right">
            {{ item.count }}
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { GET_API_FORM_CATEGORIES } from "@/core/services/store/form.module";
export default {
  props: {
    _forms: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      headers: [
        {
          text: "",
          value: "icon",
        },
        {
          text: "Başlıklar",
          value: "label",
          width: "auto",
        },
        {
          text: "Konular",
          align: "end",
          value: "count",
        },
      ],
      data: [],
      forms: [],
    };
  },
  async created() {
    if (!this.$store.getters.getFormCategories)
      await this.$store.dispatch(GET_API_FORM_CATEGORIES);
    this.data = this.$store.getters.getFormCategories.map((x) => {
      var count = 0;
      this._forms.forEach((element) => {
        element.categories.forEach((elementc) => {
          if (elementc.id === x.id) count++;
        });
      });
      return {
        ...x,
        count: count,
      };
    });
  },
  methods: {
    clicked(val) {
      this.$emit("selectedCategory", val);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>