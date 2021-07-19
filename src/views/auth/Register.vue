<template>
  <div id="inspire">
    <v-card>
      <v-card-text>
        <v-form @input="validate">
          <v-text-field
            v-model="user.first_name"
            :label="$t('keywords.first_name')"
            type="text"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="user.last_name"
            :label="$t('keywords.last_name')"
            type="text"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            prepend-inner-icon="mdi-at"
            v-model="user.email"
            :label="$t('keywords.email')"
            type="email"
            outlined
            :rules="[$options.rules.required, $options.rules.isEmail]"
            dense
          ></v-text-field>
          <v-text-field
            prepend-inner-icon="mdi-at"
            v-model="user.confirm_email"
            @paste.prevent
            :label="$t('phrases.confirm_email')"
            type="text"
            outlined
            :rules="[
              $options.rules.required,
              $options.rules.isEmail,
              $options.rules.isEqualEmail(user.email, user.confirm_email),
            ]"
            dense
          ></v-text-field>
          <v-text-field
            prepend-inner-icon="mdi-at"
            v-model="user.username"
            :label="$t('keywords.username')"
            type="text"
            outlined
            :rules="[
              $options.rules.required,
              $options.rules.minUsername,
              $options.rules.maxUsername,
            ]"
            dense
          ></v-text-field>
          <div>
            <password
              v-model="user.password"
              :secureLength="8"
              :userInputs="[]"
              strength-meter-only
              @score="pScore"
            ></password>
            <v-text-field
              id="password"
              v-model="password"
              prepend-inner-icon="mdi-lock"
              name="password"
              @paste.prevent
              :label="$t('keywords.password')"
              type="password"
              outlined
              dense
              :rules="[
                $options.rules.required,
                $options.rules.minPass,
                $options.rules.maxPass,
                $options.rules.isPasswordStrong(score),
              ]"
            ></v-text-field>
          </div>
          <v-text-field
            id="confirm_password"
            v-model="confirm_password"
            prepend-inner-icon="mdi-lock"
            name="confirm_password"
            @paste.prevent
            :label="$t('phrases.confirm_password')"
            type="password"
            outlined
            :rules="[
              $options.rules.required,
              $options.rules.minPass,
              $options.rules.maxPass,
              $options.rules.isEqualPass(password, confirm_password),
            ]"
            dense
          ></v-text-field>
          <v-checkbox
            v-model="checkbox"
            :rules="[(v) => !!v || 'You must agree to continue!']"
            :label="$t('phrases.pdpl_agree')"
            required
          ></v-checkbox>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="login()" color="primary" :disabled="disable_btn || loading">
          <v-progress-circular
            v-if="loading"
            :width="7"
            color="white"
            indeterminate
          ></v-progress-circular>
          {{ $t("keywords.send") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Password from "vue-password-strength-meter";
import rules from "@/utils/rules/register.rule";
export default {
  components: { Password },
  rules,
  data() {
    return {
      user: {
        email: "",
        username: "",
        first_name: "",
        last_name: "",
        password: "",
        confirm_password: "",
        status: true,
        image_path: "",
        title: "",
      },
      loading: false,
      disable_btn: true,
      score: 0,
    };
  },
  methods: {
    pScore(score) {
      this.score = score;
    },
    login() {
      if (this.score >= 3) {
        this.loading = true;
        this.$store.dispatch('register', { ...this.user }).then((x) => {
          if (x) {
            this.$store.dispatch("currentUser");
            this.reset();
          }
          this.loading = false;
        });
      }
    },
    reset() {
      this.user = {
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        confirm_password: "",
        status: true,
        image_path: "",
        title: "",
      };
    },
    validate(v){
      this.disable_btn = !v;
    }
  },
  computed: {
    password: {
      get() {
        return this.user.password;
      },
      set(value) {
        this.user.password = value;
      },
    },
    confirm_password: {
      get() {
        return this.user.confirm_password;
      },
      set(value) {
        this.user.confirm_password = value;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.Password {
  max-width: 100%;
}
</style>