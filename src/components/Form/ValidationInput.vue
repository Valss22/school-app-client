<script setup>
import InputText from "primevue/inputtext";

const emit = defineEmits(["update:value"]);
const props = defineProps({
  inputId: {
    type: String,
  },
  value: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    required: true,
  },
  errors: {
    type: Array,
    required: false,
  },
  icon: {
    type: String,
    default: "pi-circle",
  },
  label: {
    type: String,
    required: false,
  },
  autofocus: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const updateValue = (event) => {
  emit("update:value", event.target.value);
};
</script>

<template>
  <div class="field">
    <label v-if="label" class="text-800">{{ label }}</label>
    <span class="p-input-icon-left">
      <i class="pi" :class="icon" />
      <InputText
        :id="inputId"
        :type="type"
        :modelValue="value"
        :placeholder="placeholder"
        @input="updateValue"
        :class="{ 'p-invalid': errors.length > 0 }"
        :autofocus="autofocus"
      />
    </span>
    <TransitionGroup>
      <small v-for="err of errors" :key="err.$uid" class="p-error">{{
        err.$message
      }}</small>
    </TransitionGroup>
  </div>
</template>

<style scoped>
span.p-input-icon-left,
input {
  width: 100%;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
