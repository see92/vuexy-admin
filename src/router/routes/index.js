export default [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    meta: {
      pageTitle: "Home",
      breadcrumb: [
        {
          text: "Home",
          active: true,
        },
      ],
    },
  },
  {
    path: "/second-page",
    name: "second-page",
    component: () => import("@/views/SecondPage.vue"),
    meta: {
      pageTitle: "Second Page",
      breadcrumb: [
        {
          text: "Second Page",
          active: true,
        },
      ],
    },
  },
  {
    path: "/cluster",
    name: "cluster",
    component: () => import("@/views/cluster/index"),
    meta: {
      pageTitle: "集群管理",
      basePage: true,
      breadcrumb: [
        {
          text: "集群管理",
          active: true,
        },
      ],
    },
  },
  {
    path: "/cluster/add",
    name: "clusterAdd",
    component: () => import("@/views/cluster/pages/clusterInfo"),
    meta: {
      pageTitle: "新增",
      navActiveLink: "cluster",
      basePage: true,
      breadcrumb: [
        { text: "集群管理", to: "/cluster" },
        { text: "新增", active: true },
      ],
    },
  },
  {
    path: "/cluster/edit",
    name: "clusterEdit",
    component: () => import("@/views/cluster/pages/clusterInfo"),
    meta: {
      pageTitle: "修改",
      navActiveLink: "cluster",
      basePage: true,
      breadcrumb: [
        { text: "集群管理", to: "/cluster" },
        { text: "修改", active: true },
      ],
    },
  },
  {
    path: "/organization",
    name: "organization",
    component: () => import("@/views/organization/index"),
    meta: {
      pageTitle: "组织管理",
      basePage: true,
      breadcrumb: [{ text: "组织管理", active: true }],
    },
  },
  {
    path: "/organization/add",
    name: "organizationAdd",
    component: () => import("@/views/organization/page/organInfo"),
    meta: {
      pageTitle: "新增",
      navActiveLink: "organization",
      basePage: true,
      breadcrumb: [
        { text: "组织管理", to: "/organization" },
        { text: "新增", active: true },
      ],
    },
  },
  {
    path: "/organization/edit",
    name: "organizationEdit",
    component: () => import("@/views/organization/page/organInfo"),
    meta: {
      pageTitle: "修改",
      navActiveLink: "organization",
      basePage: true,
      breadcrumb: [
        { text: "组织管理", to: "/organization" },
        { text: "修改", active: true },
      ],
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: {
      layout: "full",
    },
  },
  {
    path: "/error-404",
    name: "error-404",
    component: () => import("@/views/error/Error404.vue"),
    meta: {
      layout: "full",
    },
  },
  {
    path: "*",
    redirect: "error-404",
  },
];

// import Vue from "vue";
// import VueRouter from "vue-router";

// Vue.use(VueRouter);

// const router = new VueRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
//   scrollBehavior() {
//     return { x: 0, y: 0 };
//   },
//   routes: [
//     {
//       path: "/",
//       name: "home",
//       component: () => import("@/views/Home.vue"),
//       meta: {
//         pageTitle: "Home",
//         breadcrumb: [
//           {
//             text: "Home",
//             active: true,
//           },
//         ],
//       },
//     },
//     {
//       path: "/second-page",
//       name: "second-page",
//       component: () => import("@/views/SecondPage.vue"),
//       meta: {
//         pageTitle: "Second Page",
//         breadcrumb: [
//           {
//             text: "Second Page",
//             active: true,
//           },
//         ],
//       },
//     },
//     {
//       path: "/cluster",
//       name: "cluster",
//       component: () => import("@/views/cluster/index"),
//       meta: {
//         pageTitle: "集群管理",
//         basePage: true,
//         breadcrumb: [
//           {
//             text: "集群管理",
//             active: true,
//           },
//         ],
//       },
//     },
//     {
//       path: "/cluster/add",
//       name: "clusterAdd",
//       component: () => import("@/views/cluster/pages/clusterInfo"),
//       meta: {
//         pageTitle: "新增",
//         navActiveLink: "cluster",
//         basePage: true,
//         breadcrumb: [
//           { text: "集群管理", to: "/cluster" },
//           { text: "新增", active: true },
//         ],
//       },
//     },
//     {
//       path: "/login",
//       name: "login",
//       component: () => import("@/views/Login.vue"),
//       meta: {
//         layout: "full",
//       },
//     },
//     {
//       path: "/error-404",
//       name: "error-404",
//       component: () => import("@/views/error/Error404.vue"),
//       meta: {
//         layout: "full",
//       },
//     },
//     {
//       path: "*",
//       redirect: "error-404",
//     },
//   ],
// });

// // ? For splash screen
// // Remove afterEach hook if you are not using splash screen
// router.afterEach(() => {
//   // Remove initial loading
//   const appLoading = document.getElementById("loading-bg");
//   if (appLoading) {
//     appLoading.style.display = "none";
//   }
// });

// export default router;
