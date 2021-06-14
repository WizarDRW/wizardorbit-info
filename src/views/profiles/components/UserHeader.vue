<template>
  <div>
    <v-card class="rounded-t-xl" rounded="0" color="v_card_background">
      <div class="img-w-100">
        <v-avatar size="100">
          <v-img :src="_user.image_path" :alt="_user.first_name"></v-img>
        </v-avatar>
        <v-card-title>
          {{ _user.first_name + " " + _user.last_name }}
        </v-card-title>
      </div>
      <v-row>
        <v-col cols="12" sm="8" md="8" lg="8" xl="10"> </v-col>
        <v-col
          v-if="
            $store.getters.isAuthenticated &&
            $store.getters.currentUser._id != _user._id
          "
          align="right"
          cols="12"
          sm="4"
          md="4"
          lg="4"
          xl="2"
        >
          <v-btn text color="header_theme_btn">Takip Et</v-btn>
          <v-btn text color="header_theme_btn">Mesaj Gönder</v-btn>
        </v-col>
        <v-col
          v-else-if="$store.getters.currentUser._id == _user._id"
          align="end"
          cols="12"
          sm="4"
          md="4"
          lg="4"
          xl="2"
        >
          <v-btn fab text color="header_theme_btn"> <v-icon>mdi-pencil</v-icon> </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    _user: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.img-w-100 {
  width: 100%;
  text-align: center;
  position: absolute;
  margin-top: -50px;
}
.v-card {
  height: 110px;
  color: var(--v-v_card_title_color-base);
}
.v-card__title {
  justify-content: center !important;
}
</style>