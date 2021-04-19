<template>
  <div class="position-relative">
    <v-container>
      <v-row>
        <v-col md="6">
          <carousel :_news="JSON.stringify(news)"></carousel>
        </v-col>
        <v-col md="6">
          <top :_news="JSON.stringify(news)"></top>
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="12" md="8">
          <time-line :_news="JSON.stringify(news)"></time-line>
        </v-col>
        <v-col md="4">
          <impression :_news="JSON.stringify(news)"></impression>
          <br />
          <impression
            :_news="JSON.stringify(news)"
            :_ly="'monthly'"
          ></impression>
          <br />
          <impression
            :_news="JSON.stringify(news)"
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
      news: [],
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
    ApiService.get("news").then((x) => {
      this.loading = false;
      this.news = x.data;
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