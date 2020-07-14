<template>
  <page-layout title="测试数据"
    ><template slot="extra"
      >{{testdata}}</template
    ></page-layout
  >
</template>

<script>
import PageLayout from "./layouts/PageLayout";

export default {
  name: "home",
  components: { PageLayout },
  data() {
    return {
      testdata: "",
    };
  },
  methods: {
    async fetchWeatherForecasts() {
      const response = await this.getRequest("api/weatherforecast");
      this.testdata = JSON.stringify(response);
    }
  },
  async created() {
    await this.fetchWeatherForecasts();
  }
};
</script>
