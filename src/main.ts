import Vue from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "./registerServiceWorker";
import router from "./router";
import "./theme/index.less";
import store from "./store";
import "animate.css/source/animate.css";
import VueI18n from "vue-i18n";
import { postRequest } from "./utils/api";
import { postKeyValueRequest } from "./utils/api";
import { putRequest } from "./utils/api";
import { deleteRequest } from "./utils/api";
import { getRequest } from "./utils/api";

Vue.prototype.postRequest = postRequest;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.getRequest = getRequest;

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "CN",
  fallbackLocale: "US",
  silentFallbackWarn: true
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
