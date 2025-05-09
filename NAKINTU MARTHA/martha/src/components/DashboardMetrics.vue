<script setup lang="ts">
import { computed } from 'vue';
import { useDashboardStore } from '../stores/dashboardStore';

const dashboardStore = useDashboardStore();

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    maximumFractionDigits: 0
  }).format(value);
};
</script>

<template>
  <div class="metrics-container">
    <div class="metrics-card sales-orders">
      <div class="metric">
        <h2>UGX {{ formatCurrency(dashboardStore.metrics.totalRevenue) }}</h2>
        <p>Sales</p>
      </div>
      <div class="divider"></div>
      <div class="metric">
        <h2>UGX {{ formatCurrency(dashboardStore.metrics.expectedRevenue) }}</h2>
        <p>Orders</p>
      </div>
    </div>
    
    <div class="metrics-small-cards">
      <div class="metrics-card">
        <div class="metric">
          <h2 class="success-text">UGX {{ formatCurrency(dashboardStore.metrics.stockValue) }}</h2>
          <p>In stock</p>
        </div>
      </div>
      
      <div class="metrics-card">
        <div class="metric">
          <h2 class="danger-text">{{ dashboardStore.metrics.outOfStockCount }}</h2>
          <p>Out of stock</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.metrics-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.metrics-card {
  background-color: var(--card-background);
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.sales-orders {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.divider {
  width: 1px;
  background-color: var(--border-color);
  height: 3.5rem;
  margin: 0 1rem;
}

.metrics-small-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.metric h2 {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--text-color);
}

.success-text {
  color: #10b981 !important;
}

.danger-text {
  color: #ef4444 !important;
}

.metric p {
  font-size: 0.875rem;
  color: var(--text-light);
  margin: 0;
}

@media (min-width: 768px) {
  .metric h2 {
    font-size: 2rem;
  }
}
</style>