<script setup lang="ts">
import { computed } from 'vue';
import { useProductStore } from '../stores/productStore';

const productStore = useProductStore();

const products = computed(() => productStore.products);

const formatCurrency = (value: number): string => {
  return value.toLocaleString();
};
</script>

<template>
  <div class="products-table">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>CATEGORY</th>
          <th>PRICE (UGX)</th>
          <th>QUANTITY</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product._id">
          <td class="id-cell">#{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>{{ formatCurrency(product.price) }}</td>
          <td>{{ product.quantity }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.products-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background-color: #000;
  color: white;
  text-align: left;
  padding: 0.75rem 1rem;
  font-weight: 600;
}

td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border-color);
}

.id-cell {
  font-family: monospace;
}

tr:nth-child(even) {
  background-color: #f9fafb;
}

tr:hover {
  background-color: #f3f4f6;
}
</style>