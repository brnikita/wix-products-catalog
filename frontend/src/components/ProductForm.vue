<template>
  <form @submit.prevent="createProduct" class="max-w-lg mx-auto p-4 bg-white rounded shadow">
    <div class="mb-4">
      <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title</label>
      <input
        id="title"
        v-model="productForm.title"
        type="text"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div class="mb-4">
      <label for="picture" class="block text-gray-700 text-sm font-bold mb-2">Picture URL</label>
      <input
        id="picture"
        v-model="productForm.picture"
        type="text"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div class="mb-4">
      <label for="price" class="block text-gray-700 text-sm font-bold mb-2">Price</label>
      <input
        id="price"
        v-model="productForm.price"
        type="number"
        step="0.01"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div class="mb-4">
      <label for="category" class="block text-gray-700 text-sm font-bold mb-2">Category</label>
      <input
        id="category"
        v-model="productForm.category"
        type="text"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div class="mb-4">
      <label for="inventory" class="block text-gray-700 text-sm font-bold mb-2">Inventory</label>
      <input
        id="inventory"
        v-model="productForm.inventory"
        type="number"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div class="mb-4">
      <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Description</label>
      <textarea
        id="description"
        v-model="productForm.description"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      ></textarea>
    </div>
    <div class="flex items-center justify-between">
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create Product
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ProductForm',
  setup() {
    const store = useStore();
    const productForm = reactive({
      title: '',
      picture: '',
      price: 0,
      category: '',
      inventory: 0,
      description: '',
    });

    const createProduct = () => {
      store.dispatch('createProduct', productForm);
    };

    return { productForm, createProduct };
  },
});
</script>