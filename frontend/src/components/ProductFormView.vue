<template>
    <el-form :model="productForm" label-width="120px">
      <el-form-item label="Title">
        <el-input v-model="productForm.title"></el-input>
      </el-form-item>
      <el-form-item label="Picture URL">
        <el-input v-model="productForm.picture"></el-input>
      </el-form-item>
      <el-form-item label="Price">
        <el-input v-model="productForm.price"></el-input>
      </el-form-item>
      <el-form-item label="Category">
        <el-input v-model="productForm.category"></el-input>
      </el-form-item>
      <el-form-item label="Inventory">
        <el-input v-model="productForm.inventory"></el-input>
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="productForm.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createProduct">Create Product</el-button>
      </el-form-item>
    </el-form>
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