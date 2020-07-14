<template>
  <page-layout
    ><template
      ><div><a-card>123</a-card></div></template
    ></page-layout
  >
</template>

<script>
import PageLayout from "./layouts/PageLayout";

export default {
  name: "Home",
  components: { PageLayout },
  data() {
    return {
      testdata: ""
    };
  },
  methods: {
    // async fetchWeatherForecasts() {
    //   const response = await this.getRequest("api/weatherforecast");
    //   this.testdata = JSON.stringify(response);
    // },
  },
  async created() {
    // await this.fetchWeatherForecasts();
  }
};
</script>
