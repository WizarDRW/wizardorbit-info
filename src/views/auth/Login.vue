<template>
  <div id="inspire">
    <v-card>
      <v-card-text>
        <v-form @input="validate">
          <v-text-field
            prepend-icon="mdi-account"
            v-model="user.email"
            name="login"
            :label="$t('message.login.email')"
            type="text"
            :rules="[$options.rules.required, $options.rules.isEmail]"
          ></v-text-field>
          <v-text-field
            id="password"
            v-model="user.password"
            prepend-icon="mdi-lock"
            name="password"
            :label="$t('message.login.password')"
            type="password"
            :rules="[
              $options.rules.required,
              $options.rules.minPass,
              $options.rules.maxPass,
            ]"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <s-alert
          v-if="alert"
          _type="error"
          :_message="error.message"
          _dense
          v-on:closeAlert="(val) => (alert = val)"
        ></s-alert>
        <v-spacer></v-spacer>
        <v-btn @click="login()" color="primary" :disabled="disable || loading">
          <v-progress-circular
            v-if="loading"
            :width="7"
            color="white"
            indeterminate
          ></v-progress-circular>
          {{ $t("message.headerSetting.loginButton") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { LOGIN, CURRENT_USER } from "@/core/services/store/auth.module";
import rules from "@/utils/rules/login.rule";
export default {
  name: "Login",
  components: {
    SAlert: () => import(`@/components/Alert.vue`),
  },
  rules,
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
      disable: true,
    };
  },
  methods: {
    login() {
      const email = this.user.email;
      const password = this.user.password;
      this.loading = true;
      this.$store
        .dispatch(LOGIN, { email, password })
        .then((x) => {
          if (x.status == 200) {
            this.$store.dispatch(CURRENT_USER);
            this.loading = false;
          }
        })
        .catch((x) => {
          this.alert = true;
          this.error.message = x.data.message;
          this.loading = false;
        });
    },
    async googleAuth() {
      var url = await this.$store.dispatch("googleLogin");
      window.open(url);
    },
    validate(val) {
      this.disable = !val;
    }
  },
  computed: {
    alert: {
      get() {
        return this.error.status;
      },
      set(value) {
        this.error.status = value;
      },
    },
  },
};
</script>

<style scoped>
</style>
