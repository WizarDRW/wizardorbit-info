<template>
  <v-container>
    <v-card color="v_card_background">
      <v-select
        v-model="release"
        :items="releases"
        label="Solo field"
        item-text="option.version"
        return-object
        solo
        background-color="header"
      ></v-select>
      <div v-for="(item, index) in release.descriptions[$store.getters.getLangName]" :key="index">
        <v-card-title v-if="item.type == 'v-card-title'">
          {{ item.val }}
        </v-card-title>
        <v-card-subtitle v-if="item.type == 'v-card-subtitle'">
          {{ item.val }}
        </v-card-subtitle>
        <v-card-text v-if="item.type == 'v-card-text'">
          {{ item.val }}
        </v-card-text>
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
          <img :width="item.size" :src="item.val" />
        </div>
      </div>
      <br>
    </v-card>
  </v-container>
</template>

<script>
import marked from "marked";
export default {
  components: {
    CodeBlock: () => import("@/components/Code"),
  },
  data() {
    return {
      releases: null,
      release: null,
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
  async created() {
    if (!this.$store.getters.getReleases)
      await this.$store.dispatch("getApiContent", {
        url: `abouts/releases`,
        content: "setReleases",
      });
    this.releases = this.$store.getters.getReleases;
    this.release = this.releases[0];
  },
  methods: {
    compiledMarkdown(item) {
      return marked(item.val);
    },
  },
};
</script>

<style lang="">
</style>