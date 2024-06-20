<template>
  <form @submit.prevent="submitForm" class="max-w-lg p-4 bg-white rounded shadow">
    <div class="mb-4">
      <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title</label>
      <input
        id="title"
        v-model="productForm.title"
        type="text"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <span v-if="!validations.title" class="text-red-500 text-xs italic">Title is required.</span>
    </div>
    <div class="mb-4">
      <label for="picture" class="block text-gray-700 text-sm font-bold mb-2">Picture URL</label>
      <input
        id="picture"
        v-model="productForm.picture"
        type="text"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <span v-if="!validations.picture" class="text-red-500 text-xs italic">Picture URL is required.</span>
    </div>
    <div class="mb-4">
      <label for="price" class="block text-gray-700 text-sm font-bold mb-2">Price</label>
      <input
        id="price"
        v-model="productForm.price"
        type="number"
        step="1"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <span v-if="!validations.price" class="text-red-500 text-xs italic">Price must be a positive number.</span>
    </div>
    <div class="mb-4">
      <label for="category" class="block text-gray-700 text-sm font-bold mb-2">Category</label>
      <input
        id="category"
        v-model="productForm.category"
        type="text"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <span v-if="!validations.category" class="text-red-500 text-xs italic">Category is required.</span>
    </div>
    <div class="mb-4">
      <label for="inventory" class="block text-gray-700 text-sm font-bold mb-2">Inventory</label>
      <input
        id="inventory"
        v-model="productForm.inventory"
        type="number"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <span v-if="!validations.inventory" class="text-red-500 text-xs italic">Inventory must be a positive number.</span>
    </div>
    <div class="mb-4">
      <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Description</label>
      <textarea
        id="description"
        v-model="productForm.description"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      ></textarea>
      <span v-if="!validations.description" class="text-red-500 text-xs italic">Description is required.</span>
    </div>

    <div class="flex items-center justify-between">
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        :disabled="!isFormValid"
      >
        {{ isEditMode ? 'Update Product' : 'Create Product' }}
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watch } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ProductForm',
  props: {
    productId: {
      type: Number,
      default: null,
    },
    productData: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const store = useStore();
    const productForm = reactive({
      title: '',
      picture: '',
      price: 0,
      category: '',
      inventory: 0,
      description: '',
    });

    const validations = reactive({
      title: computed(() => !!productForm.title),
      picture: computed(() => !!productForm.picture),
      price: computed(() => productForm.price > 0),
      category: computed(() => !!productForm.category),
      inventory: computed(() => productForm.inventory > 0),
      description: computed(() => !!productForm.description),
    });

    const isFormValid = computed(() => {
      return Object.values(validations).every(validation => validation);
    });

    const isEditMode = computed(() => !!props.productId);

    watch(
      () => props.productData,
      (newProductData) => {
        if (newProductData) {
          Object.assign(productForm, newProductData);
        }
      },
      { immediate: true }
    );

    const submitForm = () => {
      if (!isFormValid.value) return;
      if (isEditMode.value) {
        store.dispatch('updateProduct', { ...productForm, id: props.productId });
      } else {
        store.dispatch('createProduct', productForm);
      }
    };

    return { productForm, submitForm, validations, isFormValid, isEditMode };
  },
});
</script>

<style scoped>
.has-error input,
.has-error textarea {
  border-color: #e3342f;
}
</style>