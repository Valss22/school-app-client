import { createRouter, createWebHistory } from "vue-router";

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

export default router;
