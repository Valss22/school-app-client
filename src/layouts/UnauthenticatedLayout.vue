<script>
export default {
  name: "UnauthenticatedLayout",
};
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition name="scale" mode="out-in">
      <div :key="route.name">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>

<style>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
