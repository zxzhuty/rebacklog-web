<template>
  <div id="app">
    <a-alert :message="testtext" type="success" />
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
