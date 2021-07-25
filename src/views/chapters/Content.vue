<template>
  <v-container>
    <v-card color="v_card_background" :loading="loading" outlined raised>
      <v-card-title>
        {{ chapter.name }}
      </v-card-title>
      <v-card-subtitle>
        {{ chapter.short_description }}
      </v-card-subtitle>
      <v-img
        :src="chapter.image_path ? chapter.image_path : ''"
        :lazy-src="chapter.image_path ? chapter.image_path : ''"
        height="400"
        :alt="chapter._id"
      ></v-img>
      <v-container>
        <div
          class="preview"
          v-for="(item, index) in chapter.descriptions"
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
            class="descriptions--text"
            v-katex
            v-html="compiledMarkdown(item)"
          ></div>
          <div v-if="item.type == 'code'">
            <code-block :_code="item" :_readonly="true"></code-block>
          </div>
          <div v-if="item.type == 'tiptap'">
            <div v-html="item.val" class="descriptions--text"></div>
          </div>
          <div v-if="item.type == 'image'">
            <img width="100%" :src="item.val" />
          </div>
        </div>
      </v-container>
      <div class="user-image">
        <v-avatar size="150">
          <v-img
            :lazy-src="
              chapter.user_data.image_path
                ? chapter.user_data.image_path
                : require('@/assets/vendor/img/null_profile.png')
            "
            :src="
              chapter.user_data.image_path
                ? chapter.user_data.image_path
                : require('@/assets/vendor/img/null_profile.png')
            "
            width="10%"
          ></v-img>
        </v-avatar>
      </div>
      <div class="user-info">
        <v-card-title
          v-if="chapter.user_data.first_name || chapter.user_data.last_name"
        >
          <div
            v-if="
              chapter.user_data.first_name &&
              chapter.user_data.last_name &&
              chapter.user_data.reverse
            "
          >
            {{
              chapter.user_data.last_name ? chapter.user_data.last_name : ""
            }},
            {{
              chapter.user_data.first_name ? chapter.user_data.first_name : ""
            }}
          </div>
          <div v-else>
            {{
              chapter.user_data.first_name ? chapter.user_data.first_name : ""
            }}
            {{ chapter.user_data.last_name ? chapter.user_data.last_name : "" }}
          </div>
        </v-card-title>
        <v-card-title v-if="chapter.user_data.username">
          @{{ chapter.user_data.username }}
        </v-card-title>
        <v-card-title v-if="chapter.user_data.email">
          {{ chapter.user_data.email }}
        </v-card-title>
        <v-card-subtitle v-if="chapter.user_data.title">
          {{ chapter.user_data.title }}
        </v-card-subtitle>
      </div>
    </v-card>
    <v-card v-intersect.once="onIntersect"></v-card>
  </v-container>
</template>

<script>
import marked from "marked";
export default {
  name: "ChapterContent",
  props: {
    _chapter: {
      type: Object,
    },
  },
  components: {
    CodeBlock: () => import("@/components/Code"),
  },
  data() {
    return {
      user: {},
      chapter: {},
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
    if (!this.$store.getters.getChapter) {
      await this.$store.dispatch("getApiContent", {
        url: `chapters/id/${this.$route.params.id}`,
        content: "setChapter",
      });
    }
    this.chapter = this.$store.getters.getChapter;
    if (this.chapter) this.loading = false;
  },
  methods: {
    compiledMarkdown(item) {
      return marked(item.val);
    },
    onIntersect(entries, observer, isIntersecting) {
      if (isIntersecting) {
        fetch("https://api.ipify.org?format=json")
          .then((response) => response.json())
          .then(async ({ ip }) => {
            await this.$store.dispatch("impressionContentUpdate", {
              content: "chapters",
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
    this.chapter.tags &&
      this.chapter.tags.forEach((el) => {
        data.push({ property: `og:${el.key}`, content: `${el.tag}` });
      });
    return {
      title: this.chapter.name,
      meta: [
        {
          name: "description",
          content: this.chapter.short_description,
        },
        ...data,
        { name: "robots", content: "index,follow" },
      ],
    };
  },
};
</script>

<style scoped>
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
  padding: 15px 0 20px 0;
  width: 100%;
  text-align: center;
}

.user-info .v-card__title,
.user-info .v-card__subtitle,
.user-info .v-card__text {
  padding: 0;
}
</style>
