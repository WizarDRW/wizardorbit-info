<template>
  <v-alert
    :type="_type"
    :mode="_mode"
    :transition="_transition"
    :dense="_dense"
  >
    {{ _message }}
  </v-alert>
</template>

<script>
export default {
  props: {
    _alert: {
      type: Boolean,
      default: false,
    },
    _type: {
      type: String,
      default: "primary",
    },
    _message: {
      type: String,
      default: "",
    },
    _mode: {
      type: String,
      default: "out-in",
    },
    _transition: {
      type: String,
      default: "scroll-x-reverse-transition",
    },
    _dense: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    setTimeout(() => {
      this.alert = false;
    }, 5000);
  },
  computed: {
    alert: {
      set(value) {
        this.$emit("closeAlert", value);
      },
    },
  },
};
</script>

<style scoped>
</style>