import Vue from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "./registerServiceWorker";
import router from "./router";
import "./theme/index.less";
import store from "./store";
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
