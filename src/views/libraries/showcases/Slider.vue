<template>
  <div>
    <v-carousel cycle show-arrows-on-hover :max="15">
      <div v-for="item in get()" :key="item._id">
        <div @click="toContent(item)" class="click">
          <v-carousel-item
            v-if="item.showcases.includes('Carousel')"
            :src="item.image_path"
            reverse-transition="fade-transition"
          >
            <div class="carousel-title">
              <h3>{{ item.name }}</h3>
              <span>{{ item.short_description }}</span>
            </div>
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
    _libraries: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    get() {
      return this._libraries;
    },
    toContent(item){
      this.$emit("content", item)
    }
  },
};
</script>

<style scoped>
.carousel-title {
  padding: 10px;
  background-color: #00000049;
  width: auto;
}
.click{
  cursor: pointer;
}
</style>