<template>
    <div class="p-4">
      <h1 class="text-2xl mb-4">Products</h1>
      <div class="flex mb-4">
        <button @click="navigateToCreate" class="bg-blue-500 text-white px-4 py-2 rounded">Create Product</button>
      </div>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inventory</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="product in products" :key="product.id" class="bg-gray-100">
            <td class="px-6 py-4 whitespace-nowrap">
              <img :src="product.picture" alt="Product Image" class="w-16 h-16">
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ product.title }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ product.sku }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ product.price }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ product.inventory }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button @click="editProduct(product)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
              <button @click="deleteProduct(product.id)" class="text-red-600 hover:text-red-900 ml-2">Delete</button>
            </td>
          </tr>
          <!-- <tr v-if="product.variations && product.variations.length" v-for="variation in product.variations" :key="variation.id" class="bg-white">
            <td class="px-6 py-4 whitespace-nowrap">
              <img :src="variation.picture" alt="Variation Image" class="w-16 h-16">
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ variation.sku }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ variation.variationAttribute }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ variation.price }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ variation.inventory }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button @click="editProduct(variation)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
              <button @click="deleteProduct(variation.id)" class="text-red-600 hover:text-red-900 ml-2">Delete</button>
            </td>
          </tr> -->
        </tbody>
      </table>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default defineComponent({
    name: 'Products',
    setup() {
      const store = useStore();
      const products = computed(() => store.getters.allProducts);
  
      onMounted(() => {
        store.dispatch('fetchProducts');
      });
  
      const navigateToCreate = () => {
        window.location.href = '/create';
      };
  
      const editProduct = (product: any) => {
        // logic to edit product
      };
  
      const deleteProduct = (id: number) => {
        store.dispatch('deleteProduct', id);
      };
  
      return { products, navigateToCreate, editProduct, deleteProduct };
    },
  });
  </script>