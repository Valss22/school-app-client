<script setup>
import AppSubmenu from "./AppSubmenu.vue";

const emit = defineEmits();
const props = defineProps({
  model: Array,
});

function onMenuItemClick(event) {
  emit("menuitem-click", event);
}
function onKeyDown(event) {
  const nodeElement = event.target;
  if (event.code === "Enter" || event.code === "Space") {
    nodeElement.click();
    event.preventDefault();
  }
}
</script>

<template>
  <div class="layout-menu-container">
    <AppSubmenu
      :items="model"
      class="layout-menu"
      :root="true"
      @menuitem-click="onMenuItemClick"
      @keydown="onKeyDown"
    />
  </div>
</template>
