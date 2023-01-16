import { createRouter, createWebHashHistory } from "vue-router";
import AppLayout from "@/layout/AppLayout.vue";
import Login from "@/layout/Login.vue";
import { userStore } from '@/stores/user'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../auth/firebase";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/app",
      component: AppLayout,
      meta: {
        requiresAuth: true,
        conditionalRoute:true
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
        {
          path: "/denied",
          name: "denied",
          component: () => import("@/layout/Access.vue"),
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
      else{
        const docRef = doc(db, "users", userStore().current_uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          userStore().update_role(docSnap.data().role)
        }else{
          await setDoc(doc(db, "users", userStore().current_uid), {
            role: "viewer"
          });
        }
      }
  }
})

export default router;
