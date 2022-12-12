<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
import Toast from "primevue/toast";
import SettingsSidebar from "@/components/SettingsSidebar.vue";

const route = useRoute();

watch(
  () => route.name,
  () => {
    document.title = route.meta.title || "School App";
  }
);
</script>

<template>
  <Toast />
  <router-view></router-view>
  <SettingsSidebar />
</template>

<style scoped></style>
