<script setup>
import LoginForm from "@/views/Login/LoginForm.vue";
</script>

<template>
  <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6 m-auto mt-8">
    <span>
      <h1 class="text-3xl font-bold">Вход в систему</h1>
      <p class="text-gray-500">Пожалуйста, введите свои данные</p>
    </span>
    <LoginForm />
  </div>
</template>

<style scoped></style>
