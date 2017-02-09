<template lang="html">
  <div id="editor" :class="{fullScreen :fullScreen}">
    <div class="editorBarContainer">
      <ul class="editorMenuContainer">
        <li><b>B</b></li>
        <li><i><b>I</b></i></li>
        <li>H1</li>
        <li>H2</li>
        <li>H3</li>
        <li>H4</li>
        <li>H5</li>
        <li><i class="fa fa-picture-o" aria-hidden="true"></i></li>
        <li><i class="fa fa-link" aria-hidden="true"></i></li>
        <li><i class="fa fa-code" aria-hidden="true"></i></li>
        <li><i class="fa fa-list-ul" aria-hidden="true"></i></li>
        <li><i class="fa fa-list-ol" aria-hidden="true"></i></li>
        <li><i class="fa fa-table" aria-hidden="true"></i></li>
        <li @click="view" :class="{active :!preview}"><i class="fa fa-eye-slash" aria-hidden="true"></i></li>
        <li @click="full" :class="{active :fullScreen}"><i class="fa fa-arrows-alt" aria-hidden="true"></i></li>
        <li>{{title}}</li>
      </ul>
    </div>
    <div class="editorContainer" id="editorContainer">
      <textarea id="editorContentContainer" :value="input" @input="update" v-scroll="onScroll"></textarea>
      <div id="previewContainer" class="markdown-body" :class="{active :!preview}" v-html="compiledMarkdown" >
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
import {
  mapState
} from 'vuex'
export default {
  name: 'editor',
  data() {
    return {
      input: '# vue-Editor',
      position: 0, // 编辑窗口当前滚动的距离
      editHeight: 0, // 编辑窗口的最大滚动高度
      previewHeight: 0, // 预览窗口的最大滚动高度
      fullScreen: false, // 编辑器是否全屏
      preview: true // 编辑器是否预览
    }
  },
  mounted: function() {

  },
  computed: mapState({
    compiledMarkdown() {
      return marked(this.input, {
        sanitize: true
      })
    },
    title() {
      return this.$store.state.noteTitle
    }
  }),
  components: {

  },
  watch: {
    input: function() {
      let editHeight = document.getElementById('editorContentContainer').scrollHeight - document.getElementById('editorContainer').scrollHeight
      let previewHeight = document.getElementById('previewContainer').scrollHeight - document.getElementById('editorContainer').scrollHeight
      this.editHeight = editHeight
      this.previewHeight = previewHeight
    }
  },
  methods: {
    update: function(e) {
      this.input = e.target.value
      this.$store.commit('noteContentfn', e.target.value)
    },
    onScroll: function(e, position) {
      this.position = position
      if (this.previewHeight) {
        document.getElementById('previewContainer').scrollTop = this.position.scrollTop * this.previewHeight / this.editHeight
      }
    },
    full: function() {
      this.fullScreen = !this.fullScreen
    },
    view: function() {
      this.preview = !this.preview
    }
  }
}
</script>

<style lang="scss">
#editor {
    height: 100%;
    width: 100%;
    background: #fff;
    &.fullScreen {
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: 100;
    }
}
.editorBarContainer {
    width: 100%;
    height: 40px;
    background: #fff;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 5px;
    ul {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        li {
            display: flex;
            height: 25px;
            min-width: 25px;
            margin-right: 2px;
            justify-content: center;
            align-items: center;
            cursor: default;
            box-sizing: border-box;
            padding: 0 2px;
            font-size: 13px;
            &:hover {
                background: #ddd;
            }
            &.active {
                background: #ddd;
            }
        }
    }
}
.editorContainer {
    width: 100%;
    height: calc(100% - 40px);
    display: flex;
    justify-content: space-around;

}
#editorContentContainer {
    width: 100%;
    height: 100%;
    display: block;
    background: #333;
    color: #eee;
    outline: none;
    resize: none;
    overflow: auto;
    box-sizing: border-box;
    padding: 10px;
}
#previewContainer {
    width: 100%;
    // background: lightblue;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding: 10px;
    &.active {
        display: none;
    }
}
</style>
