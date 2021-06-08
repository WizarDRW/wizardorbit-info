<template>
  <v-container>
    <v-card :loading="loading" outlined raised>
      <v-card-title>
        {{ chapter.name }}
      </v-card-title>
      <v-card-subtitle>
        {{ chapter.short_description }}
      </v-card-subtitle>
      <v-img
        :src="chapter.image_path"
        :lazy-src="chapter.image_path"
        height="400"
        :alt="chapter._id"
      ></v-img>
      <div
        class="preview"
        v-for="(item, index) in chapter.descriptions"
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
              chapter.user_data.image_path
                ? chapter.user_data.image_path
                : '@/assets/vendor/img/null_profile.png'
            "
            :src="
              chapter.user_data.image_path
                ? chapter.user_data.image_path
                : '@/assets/vendor/img/null_profile.png'
            "
            width="10%"
          ></v-img>
        </v-avatar>
      </div>
      <div class="user-info">
        <v-card-title>
          {{ `${chapter.user_data.first_name}  ${chapter.user_data.last_name}` }}
        </v-card-title>
        <v-card-subtitle>
          <i class="ni business_briefcase-24"></i>{{ chapter.user_data.title }}
        </v-card-subtitle>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import "vue-code-highlight/themes/duotone-sea.css";
import "vue-code-highlight/themes/window.css";
import marked from "marked";
import {
  GET_API_CHAPTER,
  IMPRESSION_CHAPTER_UPDATE,
} from "@/core/services/store/chapter.module";
export default {
  props: {
    _chapter: {
      type: Object,
    },
  },
  components: {
    // Comment: () => import("./Comment"),
    CodeBlock: () => import("@/components/Code"),
  },
  data() {
    return {
      user: {},
      chapter: {
        image_path: "",
      },
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
      await this.$store.dispatch(GET_API_CHAPTER, this.$route.params.id);
    }
    this.chapter = this.$store.getters.getChapter;
    if (this.chapter) this.loading = false;
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then(async ({ ip }) => {
        await this.$store.dispatch(IMPRESSION_CHAPTER_UPDATE, {
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
    var data = [];
    this.chapter.tags && this.chapter.tags.forEach((el) => {
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

<style>
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
