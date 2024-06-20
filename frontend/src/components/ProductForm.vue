<template>
  <form @submit.prevent="submitForm" class="max-w-lg p-4 bg-white rounded shadow">
    <div v-if="successStatus" class="mb-4 p-2 bg-green-100 text-green-700 rounded">
      {{ successStatus }}
    </div>
    <div class="mb-4">
      <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title</label>
      <input
        id="title"
        v-model="productForm.title"
        type="text"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <span v-if="showErrors.title" class="text-red-500 text-xs italic">Title is required.</span>
    </div>
    <div class="mb-4">
      <label for="sku" class="block text-gray-700 text-sm font-bold mb-2">SKU</label>
      <input
        id="sku"
        v-model="productForm.sku"
        type="text"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <span v-if="showErrors.sku" class="text-red-500 text-xs italic">SKU is required.</span>
    </div>
    <div class="mb-4">
      <label for="picture" class="block text-gray-700 text-sm font-bold mb-2">Picture URL</label>
      <input
        id="picture"
        v-model="productForm.picture"
        type="text"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <span v-if="showErrors.picture" class="text-red-500 text-xs italic">Picture URL is required.</span>
    </div>
    <div class="mb-4">
      <label for="price" class="block text-gray-700 text-sm font-bold mb-2">Price</label>
      <input
        id="price"
        v-model="productForm.price"
        type="number"
        step="any"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <span v-if="showErrors.price" class="text-red-500 text-xs italic">Price must be a positive number.</span>
    </div>
    <div class="mb-4">
      <label for="inventory" class="block text-gray-700 text-sm font-bold mb-2">Inventory</label>
      <input
        id="inventory"
        v-model="productForm.inventory"
        type="number"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <span v-if="showErrors.inventory" class="text-red-500 text-xs italic">Inventory must be a positive number.</span>
    </div>
    <div class="mb-4">
      <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Description</label>
      <textarea
        id="description"
        v-model="productForm.description"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      ></textarea>
      <span v-if="showErrors.description" class="text-red-500 text-xs italic">Description is required.</span>
    </div>
    <!-- Add new fields here as necessary -->

    <div class="flex items-center justify-between">
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        :disabled="isFormInValid"
      >
        {{ isEditMode ? 'Update Product' : 'Create Product' }}
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watch, ref } from 'vue';
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
      sku: '',
      picture: '',
      price: 0,
      inventory: 0,
      description: '',
      // Add other fields here as needed
    });
    const isFormSubmitted = ref(false);
    const showErrors = reactive({
      title: computed(() => isFormSubmitted.value && !!!productForm.title),
      sku: computed(() => isFormSubmitted.value && !!!productForm.sku),
      picture: computed(() => isFormSubmitted.value && !!!productForm.picture),
      price: computed(() => isFormSubmitted.value && !(productForm.price > 0)),
      inventory: computed(() => isFormSubmitted.value && !(productForm.inventory > 0)),
      description: computed(() => isFormSubmitted.value && !!!productForm.description),
    });

    const isFormInValid = computed(() => {
      return Object.values(showErrors).some(validation => validation);
    });

    const isEditMode = computed(() => !!props.productId);
    const successStatus = computed(() => store.getters.successStatus);

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
      isFormSubmitted.value = true;

      if (isFormInValid.value) {
        return;
      }
      
      if (isEditMode.value) {
        store.dispatch('updateProduct', { ...productForm, id: props.productId });
      } else {
        store.dispatch('createProduct', productForm);
      }
    };

    return { productForm, submitForm, showErrors, isFormInValid, isEditMode, successStatus };
  },
});
</script>

<style scoped>
.has-error input,
.has-error textarea {
  border-color: #e3342f;
}
</style>