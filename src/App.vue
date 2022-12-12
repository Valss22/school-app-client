<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
import Toast from "primevue/toast";

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
</template>

<style scoped></style>
