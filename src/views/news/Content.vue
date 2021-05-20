<template>
  <v-container>
    <v-card :loading="loading" outlined raised>
      <v-card-title>
        {{ news.name }}
      </v-card-title>
      <v-img
        :src="news.image_path"
        :lazy-src="news.image_path"
        height="400"
        :alt="news._id"
      ></v-img>
      <div
        class="preview"
        v-for="(item, index) in news.descriptions"
        :key="index"
      >
        <div
          v-if="item.type == 'markdown'"
          v-katex
          v-html="compiledMarkdown(item)"
        ></div>
        <div v-if="item.type == 'code'">
          <code-block :_code="item" :_readonly="true"></code-block>
        </div>
        <div v-if="item.type == 'tiptap'">
          <div v-html="item.val"></div>
        </div>
      </div>
      <div class="user-image">
        <v-avatar size="150">
          <v-img
            :lazy-src="
              news.user_data.image_path
                ? news.user_data.image_path
                : '@/assets/vendor/img/null_profile.png'
            "
            :src="
              news.user_data.image_path
                ? news.user_data.image_path
                : '@/assets/vendor/img/null_profile.png'
            "
            width="10%"
          ></v-img>
        </v-avatar>
      </div>
      <div class="user-info">
        <v-card-title>
          {{ `${news.user_data.first_name}  ${news.user_data.last_name}` }}
        </v-card-title>
        <v-card-subtitle>
          {{ news.user_data.title }}
        </v-card-subtitle>
      </div>
    </v-card>
  </v-container>
</template>



<script>
import {
  GET_API_NEWS,
  IMPRESSION_NEWS_UPDATE,
} from "@/core/services/store/news.module";
import marked from "marked";
export default {
  props: {
    _news: {
      type: Object,
    },
  },
  components: {
    // Comment: () => import("./Comment"),
    CodeBlock: () => import("@/components/Code"),
  },
  data() {
    return {
      news: {},
      loading: true,
    };
  },
  beforeCreate() {
    import("mermaid").then((m) => {
      m.initialize({
        startOnLoad: true,
        theme: "dark",
      });
      m.init(".language-mermaid");
    });
  },
  async mounted() {
    if (!this.$store.getters.getNews) {
      await this.$store.dispatch(GET_API_NEWS, this.$route.params.id);
    }
    this.news = this.$store.getters.getNews;
    if (this.news) this.loading = false;
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then(async ({ ip }) => {
        await this.$store.dispatch(IMPRESSION_NEWS_UPDATE, {
          id: this.$route.params.id,
          ip: ip,
        });
      });
  },
  methods: {
    compiledMarkdown(item) {
      return marked(item.val);
    },
  },
  metaInfo() {
    return {
      title: "Sihirbaz Forum",
      meta: [
        {
          name: "description",
          content:
            "En yeni teknoloji haberleri, Bilgi öğrenmek için yazılar ve sorunlarınıza çözüm için soru cevaplar. ",
        },
        {
          property: "og:title",
          content: "Sihirbaz Forum",
        },
        { property: "og:sihirbazforum.com", content: "Sihirbaz" },
        { property: "og:type", content: "website" },
        { name: "robots", content: "index,follow" },
      ],
    };
  },
};
</script>


<style lang="scss" scoped>
.v-card__title,
.v-card__subtitle {
  justify-content: center;
  text-align: center;
}
.user-image {
  margin-top: 30px;
  width: 100%;
  text-align: center;
}
.user-info {
  padding: 0 0 20px 0;
  width: 100%;
  text-align: center;
}
</style>