import { createRouter, createWebHistory } from 'vue-router';
import Products from '../views/Products.vue';
import CreateProduct from '../views/CreateProduct.vue';
import EditProduct from '../views/EditProduct.vue';

const routes = [
  { path: '/', name: 'Products', component: Products },
  { path: '/create', name: 'CreateProduct', component: CreateProduct },
  { path: '/edit/:id', name: 'EditProduct', component: EditProduct }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;