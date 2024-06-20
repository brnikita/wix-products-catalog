<template>
    <div class="p-4">
      <router-link to="/" class="text-blue-500 hover:text-blue-700">← Back to Products</router-link>
      <h1 class="text-2xl mb-4">Edit Product</h1>
      <ProductForm :productId="productId" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import ProductForm from '@/components/ProductForm.vue';
  
  export default defineComponent({
    name: 'EditProduct',
    components: {
      ProductForm,
    },
    setup() {
      const route = useRoute();
      const productId = ref(route.params.id);
  
      return { productId };
    },
  });
  </script>