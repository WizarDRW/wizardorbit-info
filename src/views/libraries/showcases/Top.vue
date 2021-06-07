<template>
  <v-row v-masonry>
    <v-col
      v-for="(item, index) in _libraries"
      :key="index"
      cols="12"
      sm="6"
      md="4"
      lg="4"
      xl="4"
    >
      <v-card hover tile outlined>
        <v-img
          height="150"
          :src="
            item.image_path
              ? item.image_path
              : require('@/assets/vendor/img/old_book.jpeg')
          "
        ></v-img>
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
                <span>{{item.user_data.username}}</span>
              </v-tooltip>
            </template>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="
                    $router.push({
                      name: 'Profile',
                      params: { id: item.user_data._id },
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
              <span>Profile Git</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn fab dark small color="indigo" v-bind="attrs" v-on="on">
                  <v-icon>mdi-book</v-icon>
                </v-btn>
              </template>
              <span>Kitap detaylarına git</span>
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
};
</script>

<style lang="">
</style>