import { h } from "vue";
import { mount } from "cypress/vue";
import { createPinia } from "pinia";
import ValidationInput from "/src/components/Form/ValidationInput.vue";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast/sfc";
import InputText from "primevue/inputtext/sfc";
import StyleClass from "primevue/styleclass";
import PrimeVue from "primevue/config";
import router from "/src/router";

Cypress.Commands.add("mount", (component, args = {}) => {
  // Plugins
  args.global = args.global || {};
  args.global.plugins = args.global.plugins || [];
  args.global.components = args.global.components || {};
  args.global.plugins.push(PrimeVue);
  args.global.plugins.push(ToastService);
  args.global.plugins.push(createPinia());
  args.global.plugins.push(router);
  args.global.components["ValidationInput"] = ValidationInput;
  args.global.components["InputText"] = InputText;
  args.global.components["Toast"] = Toast;
  args.global.directive = args.global.directive || {};
  args.global.directive["styleclass"] = StyleClass;

  // FIXME: Toast не отображаются (так как надо его "закинуть" в HTML шаблон)
  // либо убрать <Toast /> из App.vue и пихать его в каждый компонент (херня полная)

  return mount(component, args);
});
