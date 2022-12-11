import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Ripple from "primevue/ripple";
import StyleClass from "primevue/styleclass";
import "primevue/resources/primevue.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "@/assets/styles/layout.scss";
import CardHeader from "@/components/Header/CardHeader.vue";

import setupInterceptors from "@/services/interceptors";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.directive("styleclass", StyleClass);
app.directive("ripple", Ripple);

app.component("CardHeader", CardHeader);

setupInterceptors();

app.mount("#app");
