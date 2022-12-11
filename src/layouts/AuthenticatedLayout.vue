<script>
import AppTopBar from "@/components/Navigation/AppTopBar.vue";
import AppMenu from "@/components/Navigation/AppMenu.vue";
export default {
  data() {
    return {
      layoutMode: "static",
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
      menu: [
        {
          label: "Меню",
          items: [
            {
              label: "Главная",
              icon: "pi pi-fw pi-home",
              to: { name: "home" },
            },
          ],
        },
        {
          label: "Научные степени",
          icon: "pi pi-fw pi-sitemap",
          role: "admin",
          items: [
            {
              label: "Список степеней",
              icon: "pi pi-fw pi-bookmark",
              to: { name: "admin-degree-list" },
            },
          ],
        },
        {
          label: "Научные звания",
          role: "admin",
          items: [
            {
              label: "Список званий",
              icon: "pi pi-fw pi-globe",
              to: { name: "admin-rank-list" },
            },
          ],
        },
        {
          label: "Научные направления",
          role: "admin",
          items: [
            {
              label: "Список направлений",
              icon: "pi pi-fw pi-globe",
              to: { name: "admin-sc-direction-list" },
            },
          ],
        },
        {
          label: "Научные проекты",
          items: [
            {
              label: "Список категорий",
              role: "admin",
              icon: "pi pi-fw pi-prime",
              to: { name: "project-category-list" },
            },
            {
              label: "Добавить проект",
              icon: "pi pi-fw pi-prime",
              to: { name: "project-create" },
            },
            {
              label: "Мои проекты",
              icon: "pi pi-fw pi-desktop",
              to: { name: "current-user-projects" },
            },
          ],
        },
        {
          label: "Пользователи",
          role: "admin",
          items: [
            {
              label: "Список пользователей",
              icon: "pi pi-fw pi-desktop",
              to: { name: "admin-user-list" },
            },
            {
              label: "Ключи для регистрации",
              icon: "pi pi-fw pi-key",
              to: { name: "registration-key-list" },
            },
          ],
        },
        {
          label: "Мегаменю",
          icon: "pi pi-fw pi-search",
          items: [
            {
              label: "Подмегаменю 1",
              icon: "pi pi-fw pi-bookmark",
              items: [
                {
                  label: "Подмегамегаменю 1.1",
                  icon: "pi pi-fw pi-bookmark",
                  items: [
                    {
                      label: "Подмегамегамегаменю 1.1.1",
                      icon: "pi pi-fw pi-bookmark",
                    },
                  ],
                },
                {
                  label: "Подмегамегаменю 1.2",
                  icon: "pi pi-fw pi-bookmark",
                  items: [
                    {
                      label: "Подмегамегамегаменю 1.2.1",
                      icon: "pi pi-fw pi-bookmark",
                    },
                    {
                      label: "Подмегамегамегаменю 1.2.2",
                      icon: "pi pi-fw pi-bookmark",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
  },
  watch: {
    $route() {
      this.menuActive = false;
      this.$toast.removeAllGroups();
    },
  },
  methods: {
    onWrapperClick() {
      if (!this.menuClick) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }
      this.menuClick = false;
    },
    onMenuToggle() {
      this.menuClick = true;
      if (this.isDesktop()) {
        if (this.layoutMode === "overlay") {
          if (this.mobileMenuActive === true) {
            this.overlayMenuActive = true;
          }
          this.overlayMenuActive = !this.overlayMenuActive;
          this.mobileMenuActive = false;
        } else if (this.layoutMode === "static") {
          this.staticMenuInactive = !this.staticMenuInactive;
        }
      } else {
        this.mobileMenuActive = !this.mobileMenuActive;
      }
      event.preventDefault();
    },
    onSidebarClick() {
      this.menuClick = true;
    },
    onMenuItemClick(event) {
      if (event.item && !event.item.items) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }
    },
    onLayoutChange(layoutMode) {
      this.layoutMode = layoutMode;
    },
    addClass(element, className) {
      if (element.classList) element.classList.add(className);
      else element.className += " " + className;
    },
    removeClass(element, className) {
      if (element.classList) element.classList.remove(className);
      else
        element.className = element.className.replace(
          new RegExp(
            "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
            "gi"
          ),
          " "
        );
    },
    isDesktop() {
      return window.innerWidth >= 992;
    },
    isSidebarVisible() {
      if (this.isDesktop()) {
        if (this.layoutMode === "static") return !this.staticMenuInactive;
        else if (this.layoutMode === "overlay") return this.overlayMenuActive;
      }
      return true;
    },
  },
  computed: {
    containerClass() {
      return [
        "layout-wrapper",
        {
          "layout-overlay": this.layoutMode === "overlay",
          "layout-static": this.layoutMode === "static",
          "layout-static-sidebar-inactive":
            this.staticMenuInactive && this.layoutMode === "static",
          "layout-overlay-sidebar-active":
            this.overlayMenuActive && this.layoutMode === "overlay",
          "layout-mobile-sidebar-active": this.mobileMenuActive,
          "p-input-filled": this.$primevue.config.inputStyle === "filled",
          "p-ripple-disabled": this.$primevue.config.ripple === false,
        },
      ];
    },
  },
  beforeUpdate() {
    if (this.mobileMenuActive)
      this.addClass(document.body, "body-overflow-hidden");
    else this.removeClass(document.body, "body-overflow-hidden");
  },
  components: {
    AppTopBar: AppTopBar,
    AppMenu: AppMenu,
  },
};
</script>

<template>
  <div :class="containerClass" @click="onWrapperClick">
    <AppTopBar @menu-toggle="onMenuToggle" />
    <div class="layout-sidebar" @click="onSidebarClick">
      <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
    </div>

    <div class="layout-main-container">
      <div class="layout-main">
        <router-view v-slot="{ Component, route }">
          <transition name="fade" mode="out-in">
            <div :key="route.name">
              <component :is="Component" />
            </div>
          </transition>
        </router-view>
      </div>
    </div>

    <transition name="layout-mask">
      <div
        class="layout-mask p-component-overlay"
        v-if="mobileMenuActive"
      ></div>
    </transition>
  </div>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
