import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../views/ProductList';
import ProductDetail from '../views/ProductDetail';
import SalesList from '../views/SalesList';
import ProductCreate from '../views/ProductCreate';
import ProductUpdate from '../views/ProductUpdate';
import ImageInsert from '../views/ImageInsert';
import store from '@/store';
import swal from 'sweetalert2';

//네비게이션 가드
const requireAuth = () => (to, from, next) => {
  // (가고자하는 위치, 현재 위치, next)
  // 로그인이 필요한 위치를 체크해서 쓸 것이기 때문에 to, from은 사용하지 않음
  if (store.state.user.iuser === undefined) {
    // undefined인 경우 → 로그인을 안 한 경우
    swal.fire('로그인을 하세요.', '', 'warning');
    return;
  }
  return next(); // next가 호출이 되어야 사용가능
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ProductList,
  },
  {
    path: '/detail',
    name: 'ProductDetail',
    component: ProductDetail,
  },
  {
    path: '/create',
    name: 'ProductCreate',
    component: ProductCreate,
    beforeEnter: requireAuth(),
    // 로그인이 필요한 위치 체크
    // beforeEnter : 일자로 흐르는 물길을 우회해서 흐를 수 있게 해줌
  },
  {
    path: '/update',
    name: 'ProductUpdate',
    component: ProductUpdate,
  },
  {
    path: '/sales',
    name: 'SalesList',
    component: SalesList,
  },
  {
    path: '/image_insert',
    name: 'ImageInsert',
    component: ImageInsert,
    beforeEnter: requireAuth(),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
