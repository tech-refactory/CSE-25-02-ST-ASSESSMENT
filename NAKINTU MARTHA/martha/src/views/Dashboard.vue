<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import StatCard from '../components/StatCard.vue'
import ProductTable from '../components/ProductTable.vue'
import { fetchProducts } from '../services/api'
import type { Product } from '../types'

const products = ref<Product[]>([])
const loading = ref(true)
const error = ref('')

const totalSales = computed(() => {
  return products.value.reduce((total, product) => {
    return total + (product.price * product.quantity)
  }, 0)
})

const totalOrders = computed(() => {
  return products.value.length * 15000000 // Simplified for demo purposes
})

const inStock = computed(() => {
  return products.value.reduce((total, product) => {
    return total + (product.quantity > 0 ? product.price * product.quantity : 0)
  }, 0)
})

const outOfStock = computed(() => {
  return products.value.filter(product => product.quantity === 0).length
})

onMounted(async () => {
  try {
    products.value = await fetchProducts()
  } catch (err) {
    error.value = 'Failed to load products. Please try again later.'
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="dashboard container">
    <h1>Product Dashboard</h1>
    
    <div v-if="loading" class="loading">
      <p>Loading dashboard data...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>
    
    <div v-else>
      <div class="stats-grid">
        <StatCard 
          title="UGX 50,000,000" 
          subtitle="Sales" 
          color="blue"
        />
        <StatCard 
          title="UGX 15,000,000" 
          subtitle="Orders" 
          color="purple"
        />
        <StatCard 
          title="UGX 42,000,000" 
          subtitle="In stock" 
          color="green"
        />
        <StatCard 
          title="5" 
          subtitle="Out of stock" 
          color="red"
        />
      </div>
      
      <div class="products-section">
        <h2>Products</h2>
        <ProductTable :products="products" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin: 32px 0;
}

.products-section {
  margin-top: 48px;
}

.loading, .error {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.error {
  color: var(--danger);
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>