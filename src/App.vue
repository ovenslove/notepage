<template>
<div id="app">
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view>
  </router-view>
</div>
</template>

<script>
// import editormd from '../../static/bower_components/editor.md/editormd.min.js'
export default {
  name: 'app',
  data() {
    return {}
  },
  components: {},
  methods: {},
  mounted() {}
}
</script>

<style lang="scss">@import "../static/css/reset";
#app {
    height: 100%;
    width: 100%;
    font-size: 16px;
    font-family: "黑体";
}
</style>
