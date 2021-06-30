<template>
  <div id="inspire">
    <v-card>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="user.first_name"
            :label="$t('message.register.firstName')"
            type="text"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="user.last_name"
            :label="$t('message.register.lastName')"
            type="text"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            prepend-inner-icon="mdi-at"
            v-model="user.email"
            :label="$t('message.register.email')"
            type="text"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            prepend-inner-icon="mdi-at"
            v-model="user.confirm_email"
            @paste.prevent
            :label="$t('message.register.confirmEmail')"
            type="text"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            prepend-inner-icon="mdi-at"
            v-model="user.username"
            :label="$t('message.register.username')"
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
            :label="$t('message.register.password')"
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
            :label="$t('message.register.confirmPassword')"
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
          {{ $t("message.register.sendBtn") }}
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
        username: "",
        first_name: "",
        last_name: "",
        password: "",
        confirm_password: "",
        role: "Client",
        status: true,
        image_path: "",
        title: "",
      },
      loading: false,
    };
  },
  methods: {
    login() {
      this.$store.dispatch(REGISTER, { ...this.user }).then((x) => {
        if (x) {
          this.$store.dispatch("currentUser");
          this.reset();
        }
      });
    },
    reset() {
      this.user = {
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        confirm_password: "",
        role: "Client",
        status: true,
        image_path: "",
        title: "",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>