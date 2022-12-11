<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Button from "primevue/button/sfc";
import { useToast } from "primevue/usetoast";
import { useAuthStore } from "@/stores/auth";
import { email, helpers, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import api from "@/api/axios";
import ValidationInput from "@/components/Form/ValidationInput.vue";

const toast = useToast();

const rules = {
  firstname: {
    required: helpers.withMessage("Поле обязательно для заполнения", required),
  },
  lastname: {
    required: helpers.withMessage("Поле обязательно для заполнения", required),
  },
  patronymic: {},
  email: {
    required: helpers.withMessage("Поле обязательно для заполнения", required),
    email: helpers.withMessage("Введите корректный адрес эл. почты", email),
  },
  password: {
    required: helpers.withMessage("Поле обязательно для заполнения", required),
  },
  registerKey: {
    required: helpers.withMessage("Поле обязательно для заполнения", required),
  },
};

const form = ref({
  firstname: "",
  lastname: "",
  patronymic: "",
  email: "",
  password: "",
  registerKey: "",
});

const v$ = useVuelidate(rules, form);

let isLoading = ref(false);

const authStore = useAuthStore();
const router = useRouter();

async function onSubmit() {
  isLoading = true;
  try {
    await api.post("users/register/", form.value);
    await authStore.login({
      email: form.value.email,
      password: form.value.password,
    });
    router.replace({ name: "home" });
    toast.add({
      severity: "success",
      detail: "Аккаунт успешно создан",
      life: 3000,
    });
  } catch (e) {
    toast.add({
      severity: "error",
      detail: e.response.data.detail,
      life: 3000,
    });
  } finally {
    isLoading = false;
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <ValidationInput
      id="firstname"
      v-model:value="v$.firstname.$model"
      :errors="v$.firstname.$errors"
      type="text"
      placeholder="Имя"
      icon="pi-user"
    />
    <ValidationInput
      id="lastname"
      v-model:value="v$.lastname.$model"
      :errors="v$.lastname.$errors"
      type="text"
      placeholder="Фамилия"
      icon="pi-user"
    />
    <ValidationInput
      id="patronymic"
      v-model:value="v$.patronymic.$model"
      :errors="v$.patronymic.$errors"
      type="text"
      placeholder="Отчество (при его наличии)"
      icon="pi-user"
    />
    <ValidationInput
      v-model:value="v$.email.$model"
      :errors="v$.email.$errors"
      type="email"
      placeholder="Эл. почта"
      icon="pi-user"
    />
    <ValidationInput
      id="password"
      v-model:value="v$.password.$model"
      :errors="v$.password.$errors"
      type="password"
      placeholder="Пароль"
      icon="pi-lock"
    />
    <ValidationInput
      id="registerKey"
      v-model:value="v$.registerKey.$model"
      :errors="v$.registerKey.$errors"
      type="text"
      placeholder="Ключ регистрации"
      icon="pi-lock"
    />
    <Button
      type="submit"
      :loading="isLoading"
      :disabled="isLoading || v$.$invalid"
      icon="pi pi-sign-in"
      iconPos="right"
      class="w-full"
      label="Создать аккаунт"
    />
  </form>
  <div class="mt-5 flex align-items-center justify-content-center mb-6">
    <div class="flex align-items-center">
      <span class="text-600 font-medium line-height-3">Уже есть аккаунт? </span>
      <a
        @click="router.push({ name: 'login' })"
        class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
        >Войти</a
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
span.p-input-icon-left,
input {
  width: 100%;
}
</style>
