<template>
  <div>
    <h1 class="text-2xl mb-4">Products</h1>
    <el-button type="primary" @click="navigateToCreate">Create Product</el-button>
    <el-table :data="products">
      <el-table-column prop="title" label="Title"></el-table-column>
      <el-table-column prop="picture" label="Picture">
        <template v-slot="scope">
          <img :src="scope.row.picture" alt="Product Image" class="w-16 h-16">
        </template>
      </el-table-column>
      <el-table-column prop="price" label="Price"></el-table-column>
      <el-table-column prop="category" label="Category"></el-table-column>
      <el-table-column prop="inventory" label="Inventory"></el-table-column>
      <el-table-column prop="description" label="Description"></el-table-column>
      <el-table-column label="Actions">
        <template v-slot="scope">
          <el-button type="primary" @click="editProduct(scope.row)">Edit</el-button>
          <el-button type="danger" @click="deleteProduct(scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      window.location.href = '/products/create';
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
