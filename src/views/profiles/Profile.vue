<template>
  <v-container>
    <user-header :_user="user"></user-header>
    <v-tabs background-color="v_tabs_header_background" color="v_tabs_header_color" fixed-tabs v-model="tab">
      <v-tabs-slider></v-tabs-slider>
      <v-tab
        v-for="(item, index) in tabs"
        :key="index"
        :href="`#item-${index}`"
      >
        {{ item.name }}
      </v-tab>
    </v-tabs>
    <br />
    <v-tabs-items mandatory v-model="tab">
      <v-tab-item
        v-for="(content, content_index) in [
          { type: 'ChapterContent', content: chapters },
          { type: 'NewsContent', content: news },
          { type: 'forum', content: forums },
          { type: 'library', content: libraries },
        ]"
        :key="content_index"
        :value="`item-${content_index}`"
      >
        <v-row>
          <v-col
            v-for="(item, index) in content.content"
            :key="index"
            cols="12"
            sm="6"
            md="3"
          >
            <v-card color="v_card_background" @click="toContent(content.type, item)">
              <v-img
                :src="
                  item.image_path
                    ? item.image_path
                    : require('@/assets/vendor/img/old_book.jpeg')
                "
                aspect-ratio="3"
              >
              </v-img>
              <v-card-title>{{ item.name }}</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import { GET_API_USER } from "@/core/services/store/user.module";
import { CHAPTER, GET_API_USER_CHAPTERS } from "@/core/services/store/chapter.module";
import { NEWS, GET_API_USER_THE_NEWS } from "@/core/services/store/news.module";
import { FORUM, GET_API_USER_FORUMS } from "@/core/services/store/forum.module";
import {
  LIBRARY,
  GET_API_USER_LIBRARIES,
} from "@/core/services/store/library.module";
export default {
  components: { UserHeader: () => import("./components/UserHeader.vue") },
  data() {
    return {
      user: null,
      chapters: [],
      news: [],
      forums: [],
      libraries: [],
      tab: null,
      tabs: [
        { id: "item-chapter", name: "Bölümler" },
        { id: "item-news", name: "Haberler" },
        { id: "item-forum", name: "Forumlar" },
        { id: "item-library", name: "Kütüphane" },
      ],
    };
  },
  async created() {
    if (!this.$store.getters.getUser) {
      await this.$store.dispatch(GET_API_USER, this.$route.params.id);
    }
    this.user = this.$store.getters.getUser;
    await this.getBlogs(this.user._id);
    await this.getNews(this.user._id);
    await this.getForums(this.user._id);
    await this.getLibraries(this.user._id);
  },
  methods: {
    async getBlogs(user_id) {
      await this.$store.dispatch(GET_API_USER_CHAPTERS, user_id);
      this.chapters = this.$store.getters.getUserChapters;
    },
    async getNews(user_id) {
      await this.$store.dispatch(GET_API_USER_THE_NEWS, user_id);
      this.news = this.$store.getters.getUserTheNews;
    },
    async getForums(user_id) {
      await this.$store.dispatch(GET_API_USER_FORUMS, user_id);
      this.forums = this.$store.getters.getUserForums;
    },
    async getLibraries(user_id) {
      await this.$store.dispatch(GET_API_USER_LIBRARIES, user_id);
      this.libraries = this.$store.getters.getUserLibraries;
    },
    toContent(type, item) {
      item = {
        ...item,
        user_data: this.user
      }
      if (type == "ChapterContent") this.$store.dispatch(CHAPTER, item);
      else if (type == "NewsContent") this.$store.dispatch(NEWS, item);
      else if (type == "forum") this.$store.dispatch(FORUM, item);
      else if (type == "library") this.$store.dispatch(LIBRARY, item);
      this.$router.push({ name: type, params: { id: item._id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.theme--dark.v-tabs-items {
  background-color: #00000000;
}
.theme--light.v-tabs-items {
  background-color: #ffffff00;
}
.v-card{
  color: var(--v-v_card_title_color-base)
}
.v-tabs-slider{
  background-color: var(--v-v_tabs_title_slider_color-base);
  border-radius: 200px;
}
</style>