import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/user/login",
      name: "login",
      component: () => import("@/views/Login/LoginView.vue"),
      meta: {
        title: "Вход",
        guestOnly: true,
      },
    },
  ],
});

// router.beforeResolve(async (to, from, next) => {
//   const guestOnly = to.matched.some((x) => x.meta.guestOnly);
//   const authenticatedOnly = to.matched.some((x) => x.meta.authenticatedOnly);
//   const authStore = useAuthStore();

//   if (!authStore.user) {
//     await authStore.attempt();
//   }
//   const currentUser = authStore.user;
//   if (guestOnly && currentUser) {
//     console.log("Редирект домой!", guestOnly, currentUser);
//     next({ name: "home" });
//   } else if (authenticatedOnly && !currentUser) {
//     console.log("Редирект на логин!", authenticatedOnly, currentUser);
//     authStore.returnURL = to.name;
//     authStore.returnURLParams = to.params;
//     next({ name: "login" });
//   } else if (to.meta.role && to.meta.role !== authStore.role) {
//     // TODO: сделать в meta список ролей, а здесь проверять наличие роли юзера в списке
//     console.log("No access");
//     next({ name: "home" });
//   } else {
//     next();
//   }
// });

export default router;
