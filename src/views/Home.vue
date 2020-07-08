<template>
  <div class="home">{{ testdata }}</div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      testdata: ""
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
