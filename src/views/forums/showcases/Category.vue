<template>
  <v-data-table
    style="background-color: var(--v-v_card_background-base)"
    dense
    :headers="headers"
    :items="getCategories"
    hide-default-footer
    @click:row="(item) => clicked(item)"
  >
    <template #[`header.label`]="">
      {{ $t("message.forum.showcase.category.title") }}
    </template>
    <template #[`header.count`]="">
      {{ $t("message.forum.showcase.category.topic") }}
    </template>
    <template #[`item.icon`]="{ item }">
      <v-icon color="v_card_title_color">
        {{ item.icon }}
      </v-icon>
    </template>
    <template #[`item.label`]="{ item }">
      <div>
        {{ item.label[$store.getters.getLangName] }}
      </div>
    </template>
    <template #[`item.count`]="{ item }">
      <div class="text-right">
        {{ item.count }}
      </div>
    </template>
  </v-data-table>
</template>

<script>
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
          text: "Title",
          value: "label",
          width: "auto",
        },
        {
          text: "Topic",
          align: "end",
          value: "count",
        },
      ],
      data: [],
      forums: [],
    };
  },
  created() {
    this._forums.forEach((element) => {
      this.data.push(...element.categories);
    });
    var list = [];
    for (let i = 0; i < this.data.length; i++) {
      if (list.filter((x) => x.id == this.data[i].id).length == 0) {
        list.push({
          label: this.data[i].label,
          id: this.data[i].id,
          icon: this.data[i].icon,
          count: 1,
        });
      } else {
        list[list.findIndex((x) => x.id == this.data[i].id)].count += 1;
      }
    }
    this.getCategories = list;
  },
  methods: {
    clicked(val) {
      this.$emit("selectedCategory", val);
    },
  },
  computed: {
    getCategories: {
      get() {
        return this.data;
      },
      set(value) {
        this.data = value;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>