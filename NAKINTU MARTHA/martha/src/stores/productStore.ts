import { defineStore } from 'pinia';
import axios from 'axios';

interface Product {
  _id: string;
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  color: string;
  image: string;
}

const API_URL = 'http://localhost:3000/api';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
    isLoading: false,
    error: null as string | null,
  }),
  
  actions: {
    async fetchProducts() {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await axios.get(`${API_URL}/products`);
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
        this.error = 'Failed to fetch products. Please try again.';
        
        // For development - dummy data
        if (import.meta.env.DEV) {
          this.products = [
            { _id: '1', id: '645341', name: 'Sumsang s25+ Ultra', category: 'Smart Phones', price: 6900000, quantity: 981, color: 'Black', image: '' },
            { _id: '2', id: '645346', name: 'Gucci XXL Shirt', category: 'Fashion', price: 500000, quantity: 100, color: 'White', image: '' },
            { _id: '3', id: '645342', name: 'XL Zara Shirt', category: 'Fashion', price: 600000, quantity: 56, color: 'Blue', image: '' },
            { _id: '4', id: '645344', name: 'iPhone 15', category: 'Smart Phones', price: 7900000, quantity: 752, color: 'Silver', image: '' },
            { _id: '5', id: '645343', name: 'Smart home Curtain', category: 'Interior Design', price: 500000, quantity: 30, color: 'Beige', image: '' },
            { _id: '6', id: '645345', name: 'Spectrum Laptop 14.6 Inc', category: 'Laptops', price: 15800000, quantity: 144, color: 'Gray', image: '' },
          ];
        }
      } finally {
        this.isLoading = false;
      }
    },
    
    async addProduct(productData: Omit<Product, '_id' | 'id'>) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await axios.post(`${API_URL}/products`, productData);
        this.products.push(response.data);
        await this.fetchProducts(); // Refresh products list
        return response.data;
      } catch (error) {
        console.error('Error adding product:', error);
        this.error = 'Failed to add product. Please try again.';
        
        // For development - simulate adding product
        if (import.meta.env.DEV) {
          const newProduct = {
            _id: Math.random().toString(),
            id: Math.floor(Math.random() * 1000000).toString(),
            ...productData
          };
          this.products.push(newProduct as Product);
          return newProduct;
        }
        
        throw error;
      } finally {
        this.isLoading = false;
      }
    }
  }
});