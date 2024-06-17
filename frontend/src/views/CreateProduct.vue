<template>
    <div>
      <h1 class="text-2xl mb-4">Create Product</h1>
      <ProductForm />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import ProductForm from '@/components/ProductForm.vue';
  
  export default defineComponent({
    name: 'CreateProduct',
    components: {
      ProductForm,
    },
  });
  </script>