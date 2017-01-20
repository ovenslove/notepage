<template lang="html">
  <div id="index">
      <div class="mainContainer">
        <span class="centes">
          <router-link to="/main">Note Pages</router-link>
        </span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {

    }
  },
  components: {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
#index {
    width: 100%;
    height: 100%;
}
a {
    color: inherit;
    text-decoration: none;
}

.mainContainer {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
        font-size: 100px;
        font-weight: 700;
        font-family: "黑体";
        color: #ddd;
    }
}
</style>
