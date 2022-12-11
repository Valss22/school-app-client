<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import Sidebar from "primevue/sidebar";
import { useSettingsStore } from "@/stores/settings";

const settingsStore = useSettingsStore();
const isSidebarVisible = ref(false);

const onSettingsButtonClick = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};
</script>

<template>
  <button
    class="layout-settings-button p-link flex justify-content-center align-items-center"
    type="button"
    @click="onSettingsButtonClick()"
  >
    <i class="pi pi-cog" style="font-size: 2rem"></i>
  </button>

  <Sidebar
    v-model:visible="isSidebarVisible"
    position="right"
    :transitionOptions="'.3s cubic-bezier(0, 0, 0.2, 1)'"
    class="layout-config-sidebar w-20rem"
  >
    <h5>Цветовая схема</h5>
    <div class="grid">
      <div class="col-3">
        <button
          class="p-link w-2rem h-2rem"
          @click="settingsStore.setTheme('lara-light-blue')"
        >
          <img
            src="/layout/images/themes/lara-light-blue.png"
            class="w-2rem h-2rem"
            alt="Lara Light Blue"
          />
        </button>
      </div>
      <div class="col-3">
        <button
          class="p-link w-2rem h-2rem"
          @click="settingsStore.setTheme('lara-dark-blue')"
        >
          <img
            src="/layout/images/themes/lara-dark-blue.png"
            class="w-2rem h-2rem"
            alt="Lara Dark Blue"
          />
        </button>
      </div>
    </div>
  </Sidebar>
</template>

<style scoped>
.layout-settings-button {
  display: block;
  position: fixed;
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
  background: var(--primary-color);
  color: var(--primary-color-text);
  text-align: center;
  top: 40%;
  right: 0;
  margin-top: -1.5rem;
  border-top-left-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transition: background-color var(--transition-duration);
  overflow: hidden;
  cursor: pointer;
  z-index: 999;
  box-shadow: -0.25rem 0 1rem #00000026;
}
</style>
