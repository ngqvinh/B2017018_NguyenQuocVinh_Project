import { createWebHistory, createRouter } from "vue-router";
//import store from "../store";

const routes = [
  //infos
  {
    path: "/",
    alias: "/info",
    name: "Anime Info",
    component: () => import("../views/InfoList.vue"),
  },
  {
    path: "/add",
    name: "Add new anime",
    component: () => import("../views/AddInfo.vue"),
  }, 
  {
    path: "/edit/:id",
    name: "Edit a anime",
    component: () => import("../views/EditInfo.vue"),
  },
//reviews
  {
    path: "/reviews/:id",
    name: "Anime review",
    component: () => import("../views/Review.vue"),
  },
  {
    path: "/reviews/:id/add",
    name: "Add Anime review",
    component: () => import("../views/AddReview.vue"),
  },
  {
    path: "/reviews/edit/:id",
    name: "edit Anime review",
    component: () => import("../views/EditReview.vue"),
  },
//users
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/UserLogin.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/UserRegister.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/UserProfile.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {next();});

export default router;