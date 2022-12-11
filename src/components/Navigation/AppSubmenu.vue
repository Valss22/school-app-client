<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const emit = defineEmits();
const props = defineProps({
  items: Array,
  root: {
    type: Boolean,
    default: false,
  },
});

const { role } = useAuthStore();

let activeIndex = ref(-1);

function onMenuItemClick(event, item, index) {
  if (item.disabled) {
    event.preventDefault();
    return;
  }

  if (!item.to && !item.url) {
    event.preventDefault();
  }

  //execute command
  if (item.command) {
    item.command({ originalEvent: event, item: item });
  }

  activeIndex.value = index === activeIndex.value ? null : index;

  emit("menuitem-click", {
    originalEvent: event,
    item: item,
  });
}
function visible(item) {
  return typeof item.visible === "function"
    ? item.visible()
    : item.visible !== false;
}
function hasAccess(item) {
  if (item.role) {
    if (item.role === role) {
      return true;
    } else {
      return false;
    }
  }
  return true;
}
</script>

<template>
  <ul v-if="items">
    <template v-for="(item, i) of items">
      <template v-if="hasAccess(item)">
        <li
          v-if="visible(item) && !item.separator"
          :key="item.label || i"
          :class="[
            {
              'layout-menuitem-category': root,
              'active-menuitem':
                activeIndex === i && !item.to && !item.disabled,
            },
          ]"
          role="none"
        >
          <template v-if="root">
            <div class="layout-menuitem-root-text" :aria-label="item.label">
              {{ item.label }}
            </div>
            <AppSubmenu
              :items="visible(item) && item.items"
              @menuitem-click="emit('menuitem-click', $event)"
            ></AppSubmenu>
          </template>
          <template v-else>
            <router-link
              v-if="item.to"
              :to="item.to"
              :class="[item.class, 'p-ripple', { 'p-disabled': item.disabled }]"
              :style="item.style"
              @click="onMenuItemClick($event, item, i)"
              :target="item.target"
              :aria-label="item.label"
              exact
              role="menuitem"
              v-ripple
            >
              <i :class="item.icon"></i>
              <span>{{ item.label }}</span>
              <i
                v-if="item.items"
                class="pi pi-fw pi-angle-down menuitem-toggle-icon"
              ></i>
            </router-link>
            <a
              v-if="!item.to"
              :href="item.url || '#'"
              :style="item.style"
              :class="[item.class, 'p-ripple', { 'p-disabled': item.disabled }]"
              @click="onMenuItemClick($event, item, i)"
              :target="item.target"
              :aria-label="item.label"
              role="menuitem"
              v-ripple
            >
              <i :class="item.icon"></i>
              <span>{{ item.label }}</span>
              <i
                v-if="item.items"
                class="pi pi-fw pi-angle-down menuitem-toggle-icon"
              ></i>
            </a>
            <transition name="layout-submenu-wrapper">
              <AppSubmenu
                v-show="activeIndex === i"
                :items="visible(item) && item.items"
                @menuitem-click="emit('menuitem-click', $event)"
              ></AppSubmenu>
            </transition>
          </template>
        </li>
        <li
          class="p-menu-separator"
          :style="item.style"
          v-if="visible(item) && item.separator"
          :key="'separator' + i"
          role="separator"
        ></li>
      </template>
    </template>
  </ul>
</template>
