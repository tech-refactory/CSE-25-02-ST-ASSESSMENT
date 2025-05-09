<script setup lang="ts">
import { onMounted } from 'vue';
import DashboardMetrics from './components/DashboardMetrics.vue';
import ProductForm from './components/ProductForm.vue';
import ProductsTable from './components/ProductsTable.vue';
import { useProductStore } from './stores/productStore';
import { useDashboardStore } from './stores/dashboardStore';

const productStore = useProductStore();
const dashboardStore = useDashboardStore();

onMounted(async () => {
  await productStore.fetchProducts();
  await dashboardStore.fetchMetrics();
});
</script>

<template>
  <div class="app-bg">
    <div class="app-container">
      <div class="dashboard-top">
        <div class="dashboard-metrics-section">
          <DashboardMetrics />
        </div>
        <div class="dashboard-form-section">
          <ProductForm />
        </div>
      </div>
      <div class="dashboard-table-section">
        <ProductsTable />
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --primary-color: #3b2c85;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
  --text-color: #1f2937;
  --text-light: #6b7280;
  --border-color: #e5e7eb;
  --background-color: #f5f6fa;
  --card-background: #fff;
}

.app-bg {
  background: var(--background-color);
  min-height: 100vh;
  width: 100vw;
  padding: 2.5rem 0;
}

.app-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem 3rem 2rem;
}

.dashboard-top {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2.5rem;
  align-items: stretch;
}

.dashboard-metrics-section,
.dashboard-form-section {
  height: 440px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
}

.dashboard-form-section {
  background: var(--card-background);
  border-radius: 0.5rem;
  box-shadow: 0 1px 6px 0 rgba(0,0,0,0.08);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  min-width: 340px;
  max-width: 100%;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  overflow-y: auto;
}

.dashboard-table-section {
  margin-top: 0.5rem;
  background: var(--card-background);
  border-radius: 0.5rem;
  box-shadow: 0 1px 6px 0 rgba(0,0,0,0.08);
  padding: 1.5rem 1rem;
}

@media (max-width: 1023px) {
  .dashboard-top {
    grid-template-columns: 1fr;
  }
  .dashboard-form-section,
  .dashboard-metrics-section {
    height: auto;
    min-width: 0;
    margin-top: 2rem;
  }
}

.app-header {
  margin-bottom: 2rem;
}

.app-header h1 {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--primary-color);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.5;
  min-height: 100vh;
}

.app-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.app-header {
  margin-bottom: 2rem;
}

.app-header h1 {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--primary-color);
}

.dashboard-layout {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.content-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .content-section {
    grid-template-columns: 350px 1fr;
  }
}

.product-form-container, 
.products-table-container {
  background-color: var(--card-background);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

button {
  cursor: pointer;
  transition: all 0.2s ease;
}

button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

input, select {
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  padding: 0.625rem;
  width: 100%;
  font-size: 0.875rem;
  transition: border-color 0.15s ease-in-out;
}

input:focus, select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 44, 133, 0.1);
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
}

.form-group {
  margin-bottom: 1rem;
}
</style>