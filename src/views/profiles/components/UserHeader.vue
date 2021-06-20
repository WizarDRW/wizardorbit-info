<template>
  <div>
    <v-card class="rounded-t-xl" rounded="0" color="v_card_background">
      <div class="img-w-100">
        <v-avatar size="150">
          <v-img
            :src="
              _user.image_path
                ? _user.image_path
                : require('@/assets/vendor/img/null_profile.png')
            "
            :alt="_user.username"
          ></v-img>
        </v-avatar>
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
          style="padding-right: 25px"
        >
          <v-btn fab icon> <v-icon>mdi-pencil</v-icon> </v-btn>
        </v-col>
      </v-row>
      <div class="profile-user-info">
        <v-card-title
          v-if="
            _user.first_name ||
            _user.last_name
          "
        >
          <div
            v-if="
              _user.first_name &&
              _user.last_name &&
              _isReveseFullName
            "
          >
            {{
              _user.last_name
                ? _user.last_name
                : ""
            }},
            {{
              _user.first_name
                ? _user.first_name
                : ""
            }}
          </div>
          <div v-else>
            {{
              _user.first_name
                ? _user.first_name
                : ""
            }}
            {{
              _user.last_name
                ? _user.last_name
                : ""
            }}
          </div>
        </v-card-title>
        <h2 v-if="_user.username">
          @{{ _user.username }}
        </h2>
        <v-card-subtitle v-if="_user.email">{{
          _user.email
        }}</v-card-subtitle>
        <v-card-text v-if="_user.description">
          {{ _user.description }}
        </v-card-text>
      </div>
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
  top: 10px;
  margin-bottom: 20px;
  color: var(--v-v_card_title_color-base);
}
.profile-user-info {
  margin-top: 50px;
}
.v-card__title {
  padding: 0 0 0 0;
  justify-content: center !important;
}
.v-card__subtitle {
  padding: 10px 0 10px 0;
  text-align: center !important;
}
h2 {
  text-align: center;
}
.v-card__text {
  text-align: justify;
  padding: 10px 100px;
}
</style>