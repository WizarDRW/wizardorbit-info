<template>
  <v-container>
    <v-card color="v_card_background" :loading="loading" outlined raised>
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
        <v-card-title v-if="item.type == 'v-card-title'">
          {{ item.val }}
        </v-card-title>
        <v-card-subtitle v-if="item.type == 'v-card-subtitle'">{{
          item.val
        }}</v-card-subtitle>
        <v-card-text v-if="item.type == 'v-card-text'">{{
          item.val
        }}</v-card-text>
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
                : require('@/assets/vendor/img/null_profile.png')
            "
            :src="
              news.user_data.image_path
                ? news.user_data.image_path
                : require('@/assets/vendor/img/null_profile.png')
            "
            width="10%"
          ></v-img>
        </v-avatar>
      </div>
      <div class="user-info">
        <v-card-title
          v-if="news.user_data.first_name || news.user_data.last_name"
        >
          <div
            v-if="
              news.user_data.first_name &&
              news.user_data.last_name &&
              news.user_data.reverse
            "
          >
            {{ news.user_data.last_name ? news.user_data.last_name : "" }},
            {{ news.user_data.first_name ? news.user_data.first_name : "" }}
          </div>
          <div v-else>
            {{ news.user_data.first_name ? news.user_data.first_name : "" }}
            {{ news.user_data.last_name ? news.user_data.last_name : "" }}
          </div>
        </v-card-title>
        <v-card-title v-if="news.user_data.username">
          @{{ news.user_data.username }}
        </v-card-title>
        <v-card-title v-if="news.user_data.email">
          {{ news.user_data.email }}
        </v-card-title>
        <v-card-subtitle v-if="news.user_data.title">
          {{ news.user_data.title }}
        </v-card-subtitle>
      </div>
    </v-card>
    <v-card v-intersect.once="onIntersect"></v-card>
  </v-container>
</template>



<script>
import marked from "marked";
export default {
  props: {
    _news: {
      type: Object,
    },
  },
  components: {
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
      await this.$store.dispatch("getApiContent", {
        url: `news/id/${this.$route.params.id}`,
        content: "setNews",
      });
    }
    this.news = this.$store.getters.getNews;
    if (this.news) this.loading = false;
  },
  methods: {
    compiledMarkdown(item) {
      return marked(item.val);
    },
    /** Okuma oranı */
    onIntersect(entries, observer, isIntersecting) {
      if (isIntersecting) {
        fetch("https://api.ipify.org?format=json")
          .then((response) => response.json())
          .then(async ({ ip }) => {
            await this.$store.dispatch("impressionContentUpdate", {
              content: "news",
              data: {
                id: this.$route.params.id,
                ip: ip,
              },
            });
          });
      }
    },
  },
  metaInfo() {
    var data = [];
    this.news.tags &&
      this.news.tags.forEach((el) => {
        data.push({ property: `og:${el.key}`, content: `${el.tag}` });
      });
    return {
      title: this.news.name,
      meta: [
        {
          name: "description",
          content: this.news.short_description,
        },
        ...data,
        { name: "robots", content: "index,follow" },
      ],
    };
  },
};
</script>


<style lang="scss" scoped>
.v-card__title,
.v-card__subtitle,
.v-card__text {
  justify-content: center;
  text-align: center;
  color: var(--v-v_card_title_color-base) !important;
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

.user-info .v-card__title,
.user-info .v-card__subtitle,
.user-info .v-card__text {
  padding: 0;
}
</style>