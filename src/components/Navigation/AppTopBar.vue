<script setup>
import { useRouter } from "vue-router";
import Avatar from "primevue/avatar";
import LanguageSelector from "@/components/LanguageSelector.vue";
import { useAuthStore } from "@/stores/auth";

const emit = defineEmits();
const router = useRouter();
const authStore = useAuthStore();

function onPushToLogout() {
  router.replace({ name: "logout" });
}

function onMenuToggle(event) {
  emit("menu-toggle", event);
}
</script>

<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img alt="Shoqan Research" src="@/assets/logo.png" />
    </router-link>
    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggle"
    >
      <i class="pi pi-bars"></i>
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      v-styleclass="{
        selector: '@next',
        enterClass: 'hidden',
        enterActiveClass: 'scalein',
        leaveToClass: 'hidden',
        leaveActiveClass: 'fadeout',
        hideOnOutsideClick: true,
      }"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>
    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <!-- <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-calendar"></i>
          <span>Events</span>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-cog"></i>
          <span>Settings</span>
        </button>
      </li> -->
      <li>
        <LanguageSelector />
      </li>
      <li>
        <button
          id="user-update-link"
          class="p-link layout-topbar-button"
          @click="
            router.push({
              name: 'user-profile',
              params: { id: authStore.user.id },
            })
          "
        >
          <Avatar
            v-if="authStore.user"
            :image="authStore.user.photo"
            shape="circle"
          />
          <span class="ml-3">Профиль</span>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button" @click="onPushToLogout">
          <i class="pi pi-arrow-circle-right"></i>
          <span>Выйти</span>
        </button>
      </li>
    </ul>
  </div>
</template>
