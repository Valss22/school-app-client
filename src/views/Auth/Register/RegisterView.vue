<script setup>
import RegisterForm from "@/views/Auth/Register/RegisterForm.vue";
</script>

<template>
  <div
    class="surface-card p-4 shadow-2 border-round w-full lg:w-6 m-auto mt-8 mb-8"
  >
    <div class="text-center mb-5">
      <img
        src="@/assets/logo.png"
        alt="Shoqan Research"
        height="50"
        class="mb-3"
      />
    </div>
    <RegisterForm />
  </div>
</template>

<style scoped></style>
