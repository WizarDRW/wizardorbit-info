<template>
  <div id="inspire">
    <v-card>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="user.first_name"
            label="Adınız"
            type="text"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="user.last_name"
            label="Soyadınız"
            type="text"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            prepend-inner-icon="mdi-at"
            v-model="user.email"
            label="Email Adresiniz"
            type="text"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            prepend-inner-icon="mdi-at"
            v-model="user.confirm_email"
            @paste.prevent
            label="Tekrar Email Adresiniz"
            type="text"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            id="password"
            v-model="user.password"
            prepend-inner-icon="mdi-lock"
            name="password"
            @paste.prevent
            label="Şifre"
            type="password"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            id="confirm_password"
            v-model="user.confirm_password"
            prepend-inner-icon="mdi-lock"
            name="confirm_password"
            @paste.prevent
            label="Şifre Tekrar"
            type="password"
            outlined
            dense
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="login()" color="primary" :disabled="loading">
          <v-progress-circular
            v-if="loading"
            :width="7"
            color="white"
            indeterminate
          ></v-progress-circular>
          Gönder
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { REGISTER } from "@/core/services/store/auth.module";
export default {
  data() {
    return {
      user: {
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        confirm_password: "",
        role: "Client",
        status: true,
        image_path: "",
        title: ""
      },
      loading: false,
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch(REGISTER, { ...this.user })
        .then(x=> {
            if(x.token){
                window.open(`https://panel.sihirbazforum.com/auth/${x.token}`);
                this.reset();
            }
        })
    },
    reset(){
      this.user = {
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        confirm_password: "",
        role: "Client",
        status: true,
        image_path: "",
        title: ""
      }
    }
  },
};
</script>

<style lang="scss" scoped>
</style>