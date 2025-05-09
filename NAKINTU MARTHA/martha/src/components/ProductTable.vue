<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product } from '../types'

const props = defineProps<{
  products: Product[]
}>()

const searchQuery = ref('')
const currentSort = ref({ key: 'id', direction: 'asc' })

const filteredProducts = computed(() => {
  return props.products.filter(product => {
    const query = searchQuery.value.toLowerCase()
    return product.name.toLowerCase().includes(query) ||
           product.category.toLowerCase().includes(query) ||
           product.id.toLowerCase().includes(query)
  })
})

const sortedProducts = computed(() => {
  return [...filteredProducts.value].sort((a: any, b: any) => {
    const aValue = a[currentSort.value.key]
    const bValue = b[currentSort.value.key]
    
    if (typeof aValue === 'string') {
      return currentSort.value.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    } else {
      return currentSort.value.direction === 'asc'
        ? aValue - bValue
        : bValue - aValue
    }
  })
})

const sortBy = (key: string) => {
  if (currentSort.value.key === key) {
    currentSort.value.direction = currentSort.value.direction === 'asc' ? 'desc' : 'asc'
  } else {
    currentSort.value = { key, direction: 'asc' }
  }
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-UG', {
    style: 'decimal',
    minimumFractionDigits: 0
  }).format(price)
}
</script>

<template>
  <div class="product-table-container">
    <div class="table-controls">
      <div class="search">
        <input 
          v-model="searchQuery"
          type="text"
          placeholder="Search products..."
          class="search-input"
        />
      </div>
    </div>
    
    <div class="table-wrapper">
      <table class="product-table">
        <thead>
          <tr>
            <th @click="sortBy('id')">
              ID
              <span class="sort-indicator" v-if="currentSort.key === 'id'">
                {{ currentSort.direction === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th @click="sortBy('name')">
              NAME
              <span class="sort-indicator" v-if="currentSort.key === 'name'">
                {{ currentSort.direction === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th @click="sortBy('category')">
              CATEGORY
              <span class="sort-indicator" v-if="currentSort.key === 'category'">
                {{ currentSort.direction === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th @click="sortBy('price')">
              PRICE (UGX)
              <span class="sort-indicator" v-if="currentSort.key === 'price'">
                {{ currentSort.direction === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th @click="sortBy('quantity')">
              QUANTITY
              <span class="sort-indicator" v-if="currentSort.key === 'quantity'">
                {{ currentSort.direction === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in sortedProducts" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ formatPrice(product.price) }}</td>
            <td :class="{ 'out-of-stock': product.quantity === 0 }">
              {{ product.quantity }}
            </td>
          </tr>
          <tr v-if="sortedProducts.length === 0">
            <td colspan="5" class="no-results">No products found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.product-table-container {
  margin-top: 24px;
}

.table-controls {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.search-input {
  width: 300px;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid var(--gray-300);
}

.table-wrapper {
  overflow-x: auto;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
}

.product-table th,
.product-table td {
  padding: 16px;
  text-align: left;
}

.product-table th {
  background-color: #000;
  color: white;
  cursor: pointer;
  position: relative;
  user-select: none;
  font-weight: 600;
}

.product-table th:hover {
  background-color: #333;
}

.product-table tbody tr {
  border-bottom: 1px solid var(--gray-200);
  transition: background-color 0.2s ease;
}

.product-table tbody tr:last-child {
  border-bottom: none;
}

.product-table tbody tr:hover {
  background-color: var(--gray-100);
}

.sort-indicator {
  margin-left: 4px;
}

.out-of-stock {
  color: var(--danger);
  font-weight: 600;
}

.no-results {
  text-align: center;
  color: var(--gray-600);
  padding: 32px !important;
}

@media (prefers-color-scheme: dark) {
  .product-table {
    background-color: var(--gray-700);
  }
  
  .product-table th {
    background-color: var(--gray-900);
  }
  
  .product-table th:hover {
    background-color: #000;
  }
  
  .product-table tbody tr {
    border-bottom: 1px solid var(--gray-600);
  }
  
  .product-table tbody tr:hover {
    background-color: var(--gray-600);
  }
  
  .search-input {
    border-color: var(--gray-600);
    background-color: var(--gray-700);
    color: var(--gray-200);
  }
}

@media (max-width: 768px) {
  .table-controls {
    flex-direction: column;
    gap: 8px;
  }
  
  .search-input {
    width: 100%;
  }
}
</style>