<template>
  <div>
    <prism-editor
      class="my-editor"
      v-model="_code.val"
      :highlight="highlighter"
      line-numbers
      readonly
    ></prism-editor>
  </div>
</template>
 
<script>
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css";

import { highlight, languages } from "prismjs/components/prism-core";
import "@/utils/prismjs";
import "prismjs/themes/prism-tomorrow.css";

export default {
  components: {
    PrismEditor,
  },
  props: {
    _code: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    code: {},
    lang: { id: "js", name: "javascript" },
  }),
  created() {
    this.code = this._code;
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages[this.lang.id]);
    },
  },
};
</script> 
 
<style>
.my-editor {
  background: #2d2d2d;
  color: #ccc;

  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

.prism-editor__textarea:focus {
  outline: none;
}
</style>