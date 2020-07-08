<template>
  <div id="app">
    <el-alert :title="testtext" type="success" :closable="false"></el-alert>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      testtext: "这是一个内部测试版本"
    };
  },
  components: {}
};
</script>

<style></style>
