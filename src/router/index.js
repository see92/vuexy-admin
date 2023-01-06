import Vue from "vue";
import VueRouter from "vue-router";
import index from "./routes/index";
import bus from "@/assets/bus.js";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    { path: "/", redirect: { name: "home" } },
    ...index,
    {
      path: "*",
      redirect: "errors-404",
    },
  ],
});

router.beforeEach((to, _, next) => {
  bus.$emit("routerBack", to);
  //   如果缓存中有token，就进行下一步操作
  if (localStorage.getItem("token")) {
    return next();
  } else {
    if (to.path === "/login") {
      return next();
    }
    return next("/login");
  }
});

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;
