<template>
  <div>
    <v-row>
      <v-col v-for="item in get()" :key="item._id" md="6" lg="4">
        <div @click="toContent(item)" class="click">
          <v-card>
            <v-img :src="item.image_path" height="150px"></v-img>
            <v-card-title>
              {{ item.name }}
            </v-card-title>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    _news: {
      type: String,
      default: null,
    },
  },
  methods: {
    get() {
      return JSON.parse(this._news).filter((x) =>
        x.showcases.includes("Top6")
      );
    },
    toContent(item){
      this.$emit("content", item)
    }
  },
};
</script>

<style scoped>
.col {
  padding: 12px 1px 0 1px;
}
.click{
  cursor: pointer;
}
</style>