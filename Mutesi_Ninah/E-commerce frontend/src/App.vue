<template>
  <div class="grid grid-cols-3 gap-6 p-6">
    <div><Insights /></div>
    <div class="col-span-2">
      <ProductForm @product-added="loadProducts" />
      <ProductTable :products="products" />
    </div>
  </div>
</template>

<script>
import ProductForm from './components/ProductForm.vue'
import ProductTable from './components/ProductTable.vue'
import Insights from './components/Insights.vue'

export default {
  components: { ProductForm, ProductTable, Insights },
  data() {
    return { products: [] }
  },
  methods: {
    async loadProducts() {
      const res = await fetch('http://localhost:3000/api/products/all');
      this.products = await res.json();
    }
  },
  mounted() {
    this.loadProducts();
  }
}
</script>
