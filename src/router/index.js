import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Dashboard
    {
      path: "/",
      component: () => import("@/layouts/AuthenticatedLayout.vue"),
      redirect: { name: "home" },
      children: [
        {
          path: "/",
          name: "home",
          component: HomeView,
          meta: {
            title: "Главная",
            authenticatedOnly: true,
          },
        },
        {
          path: "logout",
          name: "logout",
          component: () => import("@/views/LogoutView.vue"),
          meta: {
            title: "Выход",
            authenticatedOnly: true,
          },
        },
        ...userRoutes,
      ],
    },
    // Unauthenticated
    {
      path: "/",
      component: () => import("@/layouts/UnauthenticatedLayout.vue"),
      children: [
        // Вход, выход, регистрация
        {
          path: "login",
          name: "login",
          component: () => import("@/views/Auth/Login/LoginView.vue"),
          meta: {
            title: "Вход",
            guestOnly: true,
          },
        },
        {
          path: "register",
          name: "register",
          component: () => import("@/views/Auth/Register/RegisterView.vue"),
          meta: {
            title: "Регистрация",
            guestOnly: true,
          },
        },
      ],
    },
    // 404
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "home" },
    },
  ],
});

router.beforeResolve(async (to, from, next) => {
  const guestOnly = to.matched.some((x) => x.meta.guestOnly);
  const authenticatedOnly = to.matched.some((x) => x.meta.authenticatedOnly);
  const authStore = useAuthStore();

  if (!authStore.user) {
    await authStore.attempt();
  }
  const currentUser = authStore.user;
  if (guestOnly && currentUser) {
    console.log("Редирект домой!", guestOnly, currentUser);
    next({ name: "home" });
  } else if (authenticatedOnly && !currentUser) {
    console.log("Редирект на логин!", authenticatedOnly, currentUser);
    authStore.returnURL = to.name;
    authStore.returnURLParams = to.params;
    next({ name: "login" });
  } else if (to.meta.role && to.meta.role !== authStore.role) {
    // TODO: сделать в meta список ролей, а здесь проверять наличие роли юзера в списке
    console.log("No access");
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
