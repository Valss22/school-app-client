<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import ValidationInput from "@/components/Form/ValidationInput.vue";

import { helpers, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import Button from "primevue/button/sfc";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const rules = {
  name: {
    required: helpers.withMessage("Поле обязательно для заполнения", required),
    name: helpers.withMessage("Введите корректный адрес эл. почты", required),
  },
  password: {
    required: helpers.withMessage("Поле обязательно для заполнения", required),
  },
};

const form = ref({
  name: "",
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
</script>

<template>
  <form @submit.prevent="onSubmit">
    <ValidationInput
      v-model:value="v$.name.$model"
      :errors="v$.name.$errors"
      type="text"
      placeholder="Фамилия Имя"
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
</template>

<style lang="scss" scoped></style>
