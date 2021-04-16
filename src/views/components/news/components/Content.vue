<template>
  <div class="profile-page">
    <section v-if="loading" id="loading-content">
      <div class="center-content">
        <loader color="#6570E2"></loader>
      </div>
    </section>
    <section v-else class="section section-skew">
      <v-container>
        <card shadow class="card-profile mt--400" no-body>
          <div class="px-4">
            <div class="text-center mt-5">
              <h3>
                {{ news.name }}
              </h3>
              <div class="h6 mt-1">
                {{ news.short_description }}
              </div>
              <div>
                <i class="ni education_hat mr-2"></i>
              </div>
            </div>
            <div class="mt-5 py-5 border-top text-center">
              <img :src="news.image_path" width="50%" :alt="news._id" />
            </div>
            <div v-highlight id="content" v-html="news.description"></div>
          </div>
          <div class="order-lg-2">
            <img
              v-if="user.image_path"
              :src="user.image_path"
              width="10%"
              class="rounded-circle"
            />
            <img
              v-else
              width="10%"
              src="@/assets/vendor/img/null_profile.png"
              class="rounded-circle"
            />
          </div>
          <div class="user-info">
            <div class="h6 font-weight-300">
              <i class="ni location_pin"></i
              >{{ `${user.first_name}  ${user.last_name}` }}
            </div>
            <div class="h6 mt-1">
              <i class="ni business_briefcase-24"></i>{{ user.title }}
            </div>
          </div>
        </card>
        <br />
      </v-container>
    </section>
  </div>
</template>



<script>
import ApiService from "@/core/services/api.service.js";
import "vue-code-highlight/themes/duotone-sea.css";
import "vue-code-highlight/themes/window.css";
export default {
  props: {
    _news: {
      type: Object,
    },
  },
  components: {
    // Comment: () => import("./Comment"),
  },
  data() {
    return {
      user: {},
      news: {},
      loading: true,
    };
  },
  mounted() {
    ApiService.get(`/news/id/${this.$route.params.id}`).then((x) => {
      this.news = x.data;
      ApiService.get(`/users/id/${x.data.user_id}`).then((u) => {
        this.user = u.data;
        this.loading = false;
      });
      fetch("https://api.ipify.org?format=json")
        .then((response) => response.json())
        .then((response) => {
          ApiService.put("/news/updateImpression/id/" + x.data._id, {
            ip_address: response.ip,
            news_id: this.news._id,
          });
        });
    });
  },
};
</script>


<style lang="scss" scoped>
</style>