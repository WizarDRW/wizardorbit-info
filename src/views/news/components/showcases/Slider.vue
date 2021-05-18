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
    _news: {
      type: String,
      default: null,
    },
  },
  methods: {
    get() {
      return JSON.parse(this._news);
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