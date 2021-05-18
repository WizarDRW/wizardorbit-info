<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" lg="6">
        <v-skeleton-loader
          v-bind="attrs"
          type="image, image"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-row>
          <v-col v-for="item in 6" :key="item" cols="12" sm="12" md="6" lg="4">
            <v-skeleton-loader
              height="175"
              v-bind="attrs"
              type="image"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row> 
        <v-col cols="12" md="8">
            <v-skeleton-loader
              v-bind="attrs"
              type="card,list-item-three-line"
            ></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="4">
            <v-skeleton-loader
              v-bind="attrs"
              type="card,list-item-three-line"
            ></v-skeleton-loader>
        </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attrs: {
        class: "mb-6",
        elevation: 2,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>