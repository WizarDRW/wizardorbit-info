<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      color="background"
      :timeout="-1"
      vertical
      right
    >
      <p>{{ $t("message.cookie_policy") }}</p>
      <a href="javascript:void()" @click="openCookiePolicy()"
        ><p>{{ $t("phrases.cookie_policy") }}</p></a
      >
      <template v-slot:action="{ attrs }">
        <v-btn color="success" text v-bind="attrs" @click="accept()">
          {{ $t("phrases.i_understand") }}
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snackbar: true,
    };
  },
  beforeMount() {
    if (localStorage.getItem("cookies-accept")) {
      this.snackbar = false;
    }
  },
  methods: {
    accept() {
      localStorage.setItem("cookies-accept", true);
      this.snackbar = false;
    },
    openCookiePolicy() {

    }
  },
};
</script>

<style lang="">
</style>