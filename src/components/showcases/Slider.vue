<template>
  <div>
    <v-carousel cycle show-arrows-on-hover :max="15">
      <div v-for="item in _contents" :key="item._id">
        <div @click="toContent(item)" class="click">
          <v-carousel-item
            v-if="item.showcases.includes('Carousel')"
            reverse-transition="fade-transition"
          >
            <div class="carousel-title">
              <h3>{{ item.name }}</h3>
              <span>{{ item.short_description }}</span>
            </div>
            <v-img
              :src="item.image_path"
              cover
            >
              <template #placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-carousel-item>
        </div>
      </div>
    </v-carousel>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    _contents: {
      type: Array,
      default: () => {},
    },
  },
  methods: {
    toContent(item) {
      this.$emit("content", item);
    },
  },
};
</script>

<style scoped>
.carousel-title {
  padding: 10px;
  background-color: #00000049;
  width: auto;
}
.click {
  cursor: pointer;
}
</style>