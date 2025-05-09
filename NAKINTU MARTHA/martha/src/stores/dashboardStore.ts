import { defineStore } from 'pinia';
import axios from 'axios';

interface Metrics {
  totalRevenue: number;
  expectedRevenue: number;
  stockValue: number;
  outOfStockCount: number;
}

const API_URL = 'http://localhost:3000/api';

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    metrics: {
      totalRevenue: 50000000,
      expectedRevenue: 15000000,
      stockValue: 42000000,
      outOfStockCount: 5
    } as Metrics,
    isLoading: false,
    error: null as string | null,
  }),
  
  actions: {
    async fetchMetrics() {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await axios.get(`${API_URL}/metrics`);
        this.metrics = response.data;
      } catch (error) {
        console.error('Error fetching metrics:', error);
        this.error = 'Failed to fetch metrics. Please try again.';
        
        // For development - keep default metrics
      } finally {
        this.isLoading = false;
      }
    }
  }
});