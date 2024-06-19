import { createRouter, createWebHistory } from 'vue-router';
import Products from '../views/Products.vue';
import CreateProduct from '../views/CreateProduct.vue';

const routes = [
  { path: '/', name: 'Products', component: Products },
  { path: '/create', name: 'CreateProduct', component: CreateProduct },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;