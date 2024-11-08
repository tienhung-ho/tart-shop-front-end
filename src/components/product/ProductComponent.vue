<template>
  <div>
    <q-btn label="Lấy Danh Sách Sản Phẩm" @click="fetchProducts" />
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    <ul>
      <li v-for="product in products" :key="product.id">{{ product.name }}</li>
    </ul>
    <p v-if="errorMessage" class="text-negative">Lỗi: {{ errorMessage }}</p>
  </div>
</template>

<script>
import ProductServices from 'src/services/Product-Services';

export default {
  name: "ProductComponents",
  data() {
    return {
      products: [],
      errorMessage: ''
    };
  },
  methods: {
    async fetchProducts() {
      try {
        this.products = await ProductServices.getProduct();
        console.log("aaaaaaaaaaaaaaaaaâ");

      } catch (error) {
        this.errorMessage = 'Không thể lấy danh sách sản phẩm.';
      }
    }
  }
};
</script>
