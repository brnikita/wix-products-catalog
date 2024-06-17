import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Products from '../views/Products.vue';
import CreateProduct from '../views/CreateProduct.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/products', name: 'Products', component: Products },
  { path: '/products/create', name: 'CreateProduct', component: CreateProduct },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;