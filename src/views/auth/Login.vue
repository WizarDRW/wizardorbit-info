<template>
  <div id="inspire">
    <div class="alert">
      <v-alert v-if="error.status" type="error"> {{ error.message }} </v-alert>
    </div>
    <v-card>
      <v-card-text>
        <v-form>
          <v-text-field
            prepend-icon="mdi-account"
            v-model="user.email"
            name="login"
            label="Email Adresi"
            type="text"
          ></v-text-field>
          <v-text-field
            id="password"
            v-model="user.password"
            prepend-icon="mdi-lock"
            name="password"
            label="Şifre"
            type="password"
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
          Giriş
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { LOGIN, LOGOUT } from "@/core/services/store/auth.module";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      loading: false,
      error: {
        status: false,
        message: "",
      },
    };
  },
  methods: {
    login() {
      const email = this.user.email;
      const password = this.user.password;
      this.$store.dispatch(LOGOUT);
      this.loading = true;
      this.$store.dispatch(LOGIN, { email, password }).then((x) => {
        if (x.token) {
          this.$emit("login");
          this.loading = false;
        } else {
          this.error.status = true;
          this.error.message = x.data.message;
          this.loading = false;
          setTimeout(() => {
            this.error.status = false;
          }, 5000);
        }
      }).catch(() => this.loading = false);
    },
  },
};
</script>

<style scoped>
.alert {
  position: absolute;
  right: 5px;
  top: 5px;
}
</style>
