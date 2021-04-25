<template>
  <div>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="categories"
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
import ApiServices from "@/core/services/api.service";
export default {
  props: {
    _forms: {
      type: String,
      default: "",
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
    };
  },
  computed: {
    categories: {
      get() {
        return this.data;
      },
      set(value) {
        this.data = value.map((x) => {
          var count = 0;
          JSON.parse(this._forms).forEach((element) => {
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
    },
  },
  created() {
    ApiServices.get("formcategories/notnested").then((x) => {
      this.categories = x.data;
    });
  },
  methods: {
      clicked(val) {
          this.$emit("selectedCategory", val);
      }
  },
};
</script>

<style lang="scss" scoped>
</style>