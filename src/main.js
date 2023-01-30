import Vue from "vue";
import { ToastPlugin, ModalPlugin } from "bootstrap-vue";
import VueCompositionAPI from "@vue/composition-api";

import router from "./router";
import store from "./store";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// Global Components
import "./global-components";

require("./mock/mock.js");

// 3rd party plugins
import "@/libs/portal-vue";
import "@/libs/toastification";
import "@core/scss/vue/libs/vue-select.scss";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
// extend("secret", {
//   validate: (value) => value === "example",
//   message: "This is not the magic word",
// });
// Vue.component(
//   "ValidationProvider",
//   ValidationProvider,
//   "ValidationObserver",
//   ValidationObserver
// );

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(ElementUI);

import vSelect from "vue-select";

Vue.component("v-select", vSelect);

// BSV Plugin Registration
Vue.use(ToastPlugin);
Vue.use(ModalPlugin);

// Composition API
Vue.use(VueCompositionAPI);

// import core styles
require("@core/scss/core.scss");

// import assets styles
require("@/assets/scss/style.scss");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
