<script setup>
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import Toast from "primevue/toast";
import SettingsSidebar from "@/components/SettingsSidebar.vue";
import { useSettingsStore } from "@/stores/settings";

const route = useRoute();
const settingsStore = useSettingsStore();

onMounted(() => {
  settingsStore.setTheme();
});

watch(
  () => route.name,
  () => {
    document.title = route.meta.title || "Shoqan Research";
  }
);
</script>

<template>
  <Toast />
  <router-view></router-view>
  <SettingsSidebar />
</template>

<style scoped></style>
