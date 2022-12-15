import { createRouter, createWebHashHistory } from "vue-router";
import AppLayout from "@/layout/AppLayout.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: AppLayout,
      children: [
        {
          path: "/",
          name: "dashboard",
          component: () => import("@/views/MainDashboard.vue"),
        },
        {
          path: "/uikit/logistics",
          name: "logistics",
          component: () => import("@/views/Logistics.vue"),
        },
        {
          path: "/uikit/storage",
          name: "storage",
          component: () => import("@/views/Storage.vue"),
        },
      ],
    }
  ],
});

export default router;
