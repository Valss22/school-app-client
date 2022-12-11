<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="card">
    <h2 class="mb-0 text-center text-800">{{ title }}</h2>
  </div>
</template>
