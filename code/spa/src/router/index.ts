import { createRouter, createWebHashHistory } from "vue-router";
import AppLayout from "@/layout/AppLayout.vue";
import Login from "@/layout/Login.vue";
import { userStore } from '@/stores/user'


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/app",
      component: AppLayout,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/views/MainDashboard.vue"),
        },
        {
          path: "/logistics",
          name: "logistics",
          component: () => import("@/views/Logistics.vue"),
        },
        {
          path: "/storage",
          name: "storage",
          component: () => import("@/views/Storage.vue"),
        },
      ],
    },
    {
      path: '/',
      redirect: '/dashboard',
      meta: {
          hideForAuth: true
      },
      children: [{
        path: "/login",
        name: "login",
        component: Login,
      }]
    },
  ],
});

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
      if (!userStore().logged_in) {
      return {
          path: '/login',
          query: {
          redirectTo: to.fullPath,
          },
      }
      }
  }
})

export default router;
