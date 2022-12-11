<script setup>
import Dropdown from "primevue/dropdown";

const locales = [
  {
    name: "RU",
    code: "ru",
  },
  {
    name: "KK",
    code: "kk",
  },
];

const saveLocaleInLocalStorage = (event) => {
  localStorage.setItem("locale", event.value);
};
</script>

<template>
  <Dropdown
    v-model="$i18n.locale"
    :options="locales"
    optionLabel="name"
    optionValue="code"
    placeholder="Язык"
    @change="saveLocaleInLocalStorage"
  />
</template>
