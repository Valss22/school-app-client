<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import ValidationInput from "@/components/Form/ValidationInput.vue";

import { email, helpers, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import Button from "primevue/button/sfc";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const rules = {
  email: {
    required: helpers.withMessage("Поле обязательно для заполнения", required),
    email: helpers.withMessage("Введите корректный адрес эл. почты", email),
  },
  password: {
    required: helpers.withMessage("Поле обязательно для заполнения", required),
  },
};

const form = ref({
  email: "",
  password: "",
});

const v$ = useVuelidate(rules, form);

let isLoading = ref(false);

const authStore = useAuthStore();
const router = useRouter();

async function onSubmit() {
  isLoading.value = true;
  try {
    await authStore.login(form.value);
    const redirectUrl = authStore.returnURL || "home";
    const redirectParams =
      redirectUrl !== "home" ? authStore.returnURLParams : null;
    router.push({ name: redirectUrl, params: redirectParams });
    toast.add({
      severity: "success",
      detail: "Вы успешно авторизовались",
      life: 3000,
    });
  } catch (e) {
    console.log(e);
    toast.add({
      severity: "error",
      summary: "Ошибка",
      detail: e.response.data.detail,
      life: 3000,
    });
  } finally {
    isLoading.value = false;
  }
}
function onPushToEmailForm() {
  router.replace({ name: "send-reset-password-link" });
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <ValidationInput
      v-model:value="v$.email.$model"
      :errors="v$.email.$errors"
      type="email"
      placeholder="Эл. почта"
      icon="pi-user"
      :autofocus="true"
    />
    <ValidationInput
      v-model:value="v$.password.$model"
      :errors="v$.password.$errors"
      type="password"
      placeholder="Пароль"
      icon="pi-lock"
    />

    <Button
      type="submit"
      label="Войти"
      icon="pi pi-sign-in"
      iconPos="right"
      class="w-full"
      :loading="isLoading"
      :disabled="isLoading || v$.$invalid"
    />
  </form>
  <div class="mt-5 flex align-items-center justify-content-between mb-6">
    <div class="flex align-items-center">
      <a
        @click="router.push({ name: 'register' })"
        class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
        >Создать аккаунт</a
      >
    </div>
    <a
      @click="onPushToEmailForm"
      class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
      >Восстановить пароль</a
    >
  </div>
</template>

<style lang="scss" scoped></style>
