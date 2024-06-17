import axios from 'axios';

const state = {
  products: [],
};

const getters = {
  allProducts: (state: any) => state.products,
};

const actions = {
  async fetchProducts({ commit }: any) {
    const response = await axios.get('/products');
    commit('setProducts', response.data);
  },
  async createProduct({ commit }: any, product: any) {
    await axios.post('/products', product);
    commit('newProduct', product);
  },
  async updateProduct({ commit }: any, updatedProduct: any) {
    await axios.patch(`/products/${updatedProduct.id}`, updatedProduct);
    commit('modifyProduct', updatedProduct);
  },
  async deleteProduct({ commit }: any, id: number) {
    await axios.delete(`/products/${id}`);
    commit('removeProduct', id);
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};