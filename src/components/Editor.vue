<template lang="html">
  <div id="editor">
    <div class="editorBarContainer"></div>
    <div class="editorContainer">
      <textarea id="editorContentContainer" :value="input" @input="update" v-scroll="onScroll"></textarea>
      <div id="previewContainer" v-html="compiledMarkdown">
      </div>
    </div>
  </div>
</template>

<script>
var marked = require('marked')
// import $ from 'jquery'
import hljs from '../../static/js/highlight.min.js'
// console.log(marked('I am using __markdown__.'))

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: function(code) {
    return hljs.highlightAuto(code).value
  }
})
export default {
  name: 'editor',
  data() {
    return {
      input: '# vue-Editor',
      position: 0
    }
  },
  nounted: function() {

  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.input, {
        sanitize: true
      })
    }
  },
  components: {

  },
  methods: {
    update: function(e) {
      this.input = e.target.value
    },
    onScroll: function(e, position) {
      this.position = position
      console.log(this.position.scrollTop)
    }
  }
}
</script>

<style lang="scss">
#editor {
    height: 100%;
    width: 100%;
}
.editorBarContainer {
    width: 100%;
    min-height: 40px;
    background: pink;
}
.editorContainer {
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    justify-content: space-around;

}
#editorContentContainer {
    width: 50%;
    height: 100%;
    display: block;
    background: #eee;
    outline: none;
    resize: none;
    overflow: auto;
}
#previewContainer {
    width: 50%;
    // background: lightblue;
    height: 100%;
    overflow: auto;
}
</style>
