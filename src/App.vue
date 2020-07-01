<template>
  <div id="app">
    <el-alert title="成功提示的文案" type="success" :closable="false"></el-alert>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>

<style></style>
