import axios from 'axios';

// TODO: doesn't load from .env file for some reason
// const API_URL = import.meta.env.VUE_APP_SERVER_API_URL;
const API_URL = 'http://localhost:8000'

const state = {
  products: [],
  currentProduct: null, // for editing and loading to the form of the single product
  successStatus: '', // for showing success message after creating or updating product
};

const getters = {
  allProducts: (state: any) => state.products,
  currentProduct: (state: any) => state.currentProduct,
  successStatus: (state: any) => state.successStatus,
};

const actions = {
  async fetchProducts({ commit }: any) {
    const response = await axios.get(`${API_URL}/api/products`);
    commit('setProducts', response.data);
  },
  async createProduct({ commit }: any, product: any) {
    const response = await axios.post(`${API_URL}/api/products`, product);
    if (response.status === 201) {
      commit('newProduct', response.data);
      commit('setSuccessStatus', 'Product created successfully!');
      setTimeout(() => commit('clearSuccessStatus'), 4000);
    }
  },
  async updateProduct({ commit }: any, updatedProduct: any) {
    const response = await axios.patch(`${API_URL}/api/products/${updatedProduct.id}`, updatedProduct);
    if (response.status === 200) {
      commit('modifyProduct', updatedProduct);
      commit('setSuccessStatus', 'Product updated successfully!');
      setTimeout(() => commit('clearSuccessStatus'), 4000);
    }
  },
  async deleteProduct({ commit }: any, id: number) {
    await axios.delete(`${API_URL}/api/products/${id}`);
    commit('removeProduct', id);
  },
  async fetchProduct({ commit }: any, id: number) { 
    const response = await axios.get(`${API_URL}/api/products/${id}`);
    commit('setCurrentProduct', response.data);
  },
};

const mutations = {
  setProducts: (state: any, products: any) => (state.products = products),
  newProduct: (state: any, product: any) => state.products.push(product),
  modifyProduct: (state: any, updatedProduct: any) => {
    const index = state.products.findIndex((product: any) => product.id === updatedProduct.id);
    if (index !== -1) {
      state.products.splice(index, 1, updatedProduct);
    }
  },
  removeProduct: (state: any, id: number) => {
    state.products = state.products.filter((product: any) => product.id !== id);
  },
  setCurrentProduct: (state: any, product: any) => (state.currentProduct = product),
  setSuccessStatus: (state: any, status: string) => (state.successStatus = status),
  clearSuccessStatus: (state: any) => (state.successStatus = ''),
};

export default {
  state,
  getters,
  actions,
  mutations,
};