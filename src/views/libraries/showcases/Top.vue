<template>
  <v-row v-masonry>
    <v-col
      v-masonry-tile
      v-for="(item, index) in _libraries"
      :key="index"
      cols="12"
      sm="6"
      md="4"
      lg="4"
      xl="4"
    >
      <v-card hover tile outlined>
        <v-carousel
          vertical
          touchless
          cycle
          :show-arrows="false"
          hide-delimiters
          hide-delimiter-background
          show-arrows-on-hover
          delimiter-icon="mdi-minus"
          height="auto"
          :interval="getRandomArbitrary(4000, 10000)"
        >
          <v-carousel-item
            v-for="(content_item, content_index) in [
              ...item.chapters.slice(0, 7),
              ...item.news.slice(0, 7),
            ]"
            :key="content_index"
          >
            <v-img
              aspect-ratio="2"
              gradient="to top, rgba(0,0,0,0), rgba(0,0,0,0.3)"
              :src="content_item.image_path"
            >
              <v-card-title> {{ content_item.name }} </v-card-title>
            </v-img>
          </v-carousel-item>
        </v-carousel>
        <v-card-title> {{ item.name }} </v-card-title>
        <v-card-text> {{ item.description }} </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-speed-dial
            :top="top"
            :bottom="bottom"
            :right="right"
            :left="left"
            :direction="direction"
            :open-on-hover="hover"
            :transition="transition"
          >
            <template v-slot:activator>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" fab>
                    <v-avatar>
                      <v-img :src="item.user_data.image_path"></v-img>
                    </v-avatar>
                  </v-btn>
                </template>
                <span>{{ item.user_data.username }}</span>
              </v-tooltip>
            </template>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="
                    $router.push({
                      name: 'Profile',
                      params: { username: item.user_data.username },
                    })
                  "
                  fab
                  dark
                  small
                  color="green"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-account</v-icon>
                </v-btn>
              </template>
              <span>{{ $t("phrases.go_to_profile") }}</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn fab dark small color="indigo" v-bind="attrs" v-on="on">
                  <v-icon>mdi-book</v-icon>
                </v-btn>
              </template>
              <span>{{ $t("phrases.go_to_book_details") }}</span>
            </v-tooltip>
          </v-speed-dial>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    _libraries: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      direction: "left",
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: "slide-x-reverse-transition",
    };
  },
  methods: {
    getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    },
  },
};
</script>

<style lang="">
</style>