<template>
  <div class="position-relative">
    <v-container>
      <v-row>
        <v-col md="6">
          <carousel :_blogs="JSON.stringify(blogs)"></carousel>
        </v-col>
        <v-col md="6">
          <top :_blogs="JSON.stringify(blogs)"></top>
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="12" md="8">
          <time-line :_blogs="JSON.stringify(blogs)"></time-line>
        </v-col>
        <v-col md="4">
          <impression :_blogs="JSON.stringify(blogs)"></impression>
          <br />
          <impression
            :_blogs="JSON.stringify(blogs)"
            :_ly="'monthly'"
          ></impression>
          <br />
          <impression
            :_blogs="JSON.stringify(blogs)"
            :_ly="'yearly'"
          ></impression>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ApiService from "@/core/services/api.service.js";
export default {
  components: {
    Carousel: () => import("./showcases/Slider"),
    Top: () => import("./showcases/Top"),
    TimeLine: () => import("./showcases/TimeLine"),
    Impression: () => import("./showcases/Impression"),
  },
  data() {
    return {
      blogs: [],
      modal: false,
      contact: {
        email: "",
        phone: "",
        text: "",
      },
      loading: true,
      alert: false,
      disabled: false,
    };
  },
  mounted() {
    ApiService.get("/blogs").then((x) => {
      this.blogs = x.data
    });
  },
  methods: {
    dialog() {},
  },
};
</script>

<style lang="scss" scoped>
.position-relative {
  margin-top: 30px;
}
</style>