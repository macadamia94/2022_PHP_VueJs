import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import StoreAccess from '../views/StoreAccess';
import StoreAccess2 from '../views/StoreAccess2';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/StoreAccess',
    name: 'StoreAccess',
    component: StoreAccess,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "StoreAccess" */ '../views/StoreAccess'),
  },
  {
    path: '/StoreAccess2',
    name: 'StoreAccess2',
    component: StoreAccess2,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
