<template>
  <v-container fluid v-if="content">
    <v-card color="v_card_background">
      <div v-for="(item, index) in content.descriptions[$store.getters.getLangName]" :key="index">
        <v-card-title v-if="item.type == 'v-card-title'">
          {{ item.val }}
        </v-card-title>
        <v-card-subtitle v-if="item.type == 'v-card-subtitle'">
          {{ item.val }}
        </v-card-subtitle>
        <v-card-text v-if="item.type == 'v-card-text'">
          <div v-html="item.val"></div>
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
        <v-card-text
          ><div v-if="item.type == 'tiptap'">
            <div v-html="item.val" class="descriptions--text"></div></div
        ></v-card-text>
        <div v-if="item.type == 'image'">
          <img :width="item.size" :src="item.val" />
        </div>
      </div>
      <br />
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
      content: null,
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
  mounted() {
    this.content = this.$store.getters.getAbouts.find(
      (x) => x.type == "ourhistory"
    );
  },
  methods: {
    compiledMarkdown(item) {
      return marked(item.val);
    },
  },
};
</script>

<style scoped>
</style>