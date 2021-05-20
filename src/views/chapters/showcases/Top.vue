<template>
  <div>
    <v-row>
      <v-col v-for="item in get()" :key="item._id" md="6" lg="4">
        <v-card
          @click="toContent(item)"
          tile
          rounded
          outlined
          hover
          color="v_card_background"
        >
          <v-img :src="item.image_path" height="150px"></v-img>
          <v-card-title>
            {{ item.name }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    _chapters: {
      type: String,
      default: null,
    },
  },
  methods: {
    get() {
      return JSON.parse(this._chapters).filter((x) =>
        x.showcases.includes("Top6")
      );
    },
    toContent(item) {
      this.$emit("content", item);
    },
  },
};
</script>

<style scoped>
.col {
  padding: 12px 1px 0 1px;
}
.click {
  cursor: pointer;
}
.v-card {
  color: var(--v-v_card_title_color-base);
}
</style>