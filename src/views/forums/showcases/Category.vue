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
import { GET_API_CATEGORY } from "@/core/services/store/category.module";
export default {
  props: {
    _forums: {
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
      forums: [],
    };
  },
  async created() {
    if (!this.$store.getters.getForumCategory)
      await this.$store.dispatch(GET_API_CATEGORY, "forum");
    this.data = this.$store.getters.getForumCategory.categories
      this._forums.forEach((element) => {
        this.data.push([...element.categories])
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