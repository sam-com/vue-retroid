import { createWebHistory, createRouter } from 'vue-router';
import Home from '../views/Home.vue';
import PlatformList from "../components/PlatformsList.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/platforms',
    name: "Platforms",
    component: PlatformList
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
