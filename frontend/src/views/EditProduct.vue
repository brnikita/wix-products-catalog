<template>
  <div class="p-4">
    <router-link to="/" class="text-blue-500 hover:text-blue-700">← Back to Products</router-link>
    <h1 class="text-2xl mb-4">Edit Product</h1>
    <ProductForm :productId="productId" :productData="productData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import ProductForm from '@/components/ProductForm.vue';

export default defineComponent({
  name: 'EditProduct',
  components: {
    ProductForm,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const productId = ref(Number(route.params.id));

    const productData = computed(() => store.getters.currentProduct);

    onMounted(async () => {
      await store.dispatch('fetchProduct', productId.value);
      if (!productData.value) {
        router.push('/');  // Redirect to the products page if the product is not found
      }
    });

    return { productId, productData };
  },
});
</script>