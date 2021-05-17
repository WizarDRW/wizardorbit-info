<template>
  <v-container>
    <div class="px-4">
      <div class="text-center mt-5">
        <h3>
          {{ blog.name }}
        </h3>
        <div class="h6 mt-1">
          {{ blog.short_description }}
        </div>
        <div>
          <i class="ni education_hat mr-2"></i>
        </div>
      </div>
      <div class="mt-5 py-5 border-top text-center">
        <img :src="blog.image_path" width="50%" :alt="blog._id" />
        <br />
        <br />
        <div class="text-left">
          <div
            class="preview"
            v-for="(item, index) in blog.descriptions"
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
        </div>
      </div>
    </div>
    <div class="user-image">
      <v-avatar size="150">
        <v-img
          :src="
            blog.user_data.image_path
              ? blog.user_data.image_path
              : '@/assets/vendor/img/null_profile.png'
          "
          width="10%"
        ></v-img>
      </v-avatar>
    </div>
    <div class="user-info">
      <div class="h6 font-weight-300">
        <i class="ni location_pin"></i
        >{{ `${blog.user_data.first_name}  ${blog.user_data.last_name}` }}
      </div>
      <div class="h6 mt-1">
        <i class="ni business_briefcase-24"></i>{{ blog.user_data.title }}
      </div>
    </div>
    <br />
  </v-container>
</template>

<script>
import "vue-code-highlight/themes/duotone-sea.css";
import "vue-code-highlight/themes/window.css";
import marked from "marked";
import {
  GET_API_BLOG,
  IMPRESSION_BLOG_UPDATE,
} from "@/core/services/store/blog.module";
export default {
  props: {
    _blog: {
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
      blog: {
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
    if (!this.$store.getters.getBlog) {
      await this.$store.dispatch(GET_API_BLOG, this.$route.params.id);
    }
    this.blog = this.$store.getters.getBlog;
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then(async ({ ip }) => {
        await this.$store.dispatch(IMPRESSION_BLOG_UPDATE, {
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

<style>
.card-profile {
  z-index: 999;
}
.vue-star-rating span {
  display: none;
}

.back i:hover {
  color: black;
}
#loading-content {
  width: 100%;
  text-align: center;
}
.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
@media only screen and (max-width: 600px) {
  .user-info {
    right: -10px;
  }
  .profile-page .card-profile .card-profile-image img {
    left: 85px !important;
  }
}
@media only screen and (max-width: 510px) {
  .user-info {
    text-align: right;
    right: 5px;
  }
  .profile-page .card-profile .card-profile-image img {
    left: 85px !important;
  }
}

@media only screen and (max-width: 1700px) {
  .iframe-g {
    width: 260px;
    position: absolute;
    padding: 0 0 0 0;
  }
}
.section-shaped .shape-style-1.shape-primary {
  z-index: 0;
}
.theme--dark.v-application code {
  background-color: transparent;
}
.token.property,
.token.function {
  color: #ffed00;
}
</style>
