import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Users from "../components/Users.vue";
import User from "../components/User.vue";
import Project from "../components/Project.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/users", component: Users },
  { path: "/users/:id", component: User },
  { path: "/projects/:id", component: Project },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
