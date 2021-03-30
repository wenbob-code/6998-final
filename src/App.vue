<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },

  methods: {},

  mounted() {}
};
</script>

<style scoped lang="scss">
#app{
  height: 100%;
}
.footer_icon {
  width: auto;
}
.el-tabs__item.is-active{
      color: #AB0032;
}
</style>
