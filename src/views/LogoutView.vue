<script setup>
import ProgressSpinner from "primevue/progressspinner";
import { onMounted } from "vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();

onMounted(() => {
  authStore.logout();
});
</script>

<template>
  <div
    class="flex justify-content-center align-items-center text-center min-h-screen"
  >
    <ProgressSpinner />
  </div>
</template>

<style>
@keyframes p-progress-spinner-color {
  100%,
  0% {
    stroke: #100de9;
  }
  40% {
    stroke: #0057e7;
  }
  66% {
    stroke: #3a37ff;
  }
  80%,
  90% {
    stroke: #2e2bff;
  }
}
</style>
