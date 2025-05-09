<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useProductStore } from '../stores/productStore';
import { useDashboardStore } from '../stores/dashboardStore';

const productStore = useProductStore();
const dashboardStore = useDashboardStore();

interface FormData {
  name: string;
  category: string;
  price: string;
  quantity: string;
  color: string;
  image: string;
}

const formData = reactive<FormData>({
  name: '',
  category: '',
  price: '',
  quantity: '',
  color: '',
  image: '',
});

const errors = reactive<Record<string, string>>({});
const successMessage = ref('');
const showSuccess = ref(false);

const validateForm = (): boolean => {
  let isValid = true;
  errors.name = !formData.name.trim() ? 'Product name is required' : '';
  errors.category = !formData.category.trim() ? 'Category is required' : '';
  
  errors.price = !formData.price ? 'Price is required' : 
                 isNaN(Number(formData.price)) || Number(formData.price) <= 0 ? 'Price must be a positive number' : '';
  
  errors.quantity = !formData.quantity ? 'Quantity is required' : 
                    isNaN(Number(formData.quantity)) || Number(formData.quantity) < 0 ? 'Quantity must be a non-negative number' : '';
  
  errors.color = !formData.color.trim() ? 'Color is required' : '';
  errors.image = !formData.image.trim() ? 'Image URL is required' : '';
  
  return Object.values(errors).every(error => !error);
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  
  try {
    const product = {
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
    };
    
    await productStore.addProduct(product);
    await dashboardStore.fetchMetrics();
    
    successMessage.value = 'Product has been added successfully!';
    showSuccess.value = true;
    
    clearForm();
    
    setTimeout(() => {
      showSuccess.value = false;
    }, 3000);
  } catch (error) {
    console.error('Error adding product:', error);
  }
};

const clearForm = () => {
  Object.keys(formData).forEach(key => {
    formData[key as keyof FormData] = '';
  });
  Object.keys(errors).forEach(key => {
    errors[key] = '';
  });
};

const closeAlert = () => {
  showSuccess.value = false;
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files && target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      formData.image = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    formData.image = '';
  }
};
</script>

<template>
  <div class="product-form">
    <h2>Add Product</h2>
    
    <div v-if="showSuccess" class="alert alert-success">
      <span>{{ successMessage }}</span>
      <button @click="closeAlert" class="close-btn">&times;</button>
    </div>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <input 
          id="name"
          type="text" 
          v-model="formData.name" 
          :class="{ 'error': errors.name }"
          placeholder="Product Name"
        >
        <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
      </div>
      
      <div class="form-group">
        <input 
          id="category"
          type="text" 
          v-model="formData.category" 
          :class="{ 'error': errors.category }"
          placeholder="Category"
        >
        <div v-if="errors.category" class="error-message">{{ errors.category }}</div>
      </div>
      
      <div class="form-group">
        <input 
          id="price"
          type="number" 
          v-model="formData.price" 
          :class="{ 'error': errors.price }"
          min="0"
          placeholder="Price (UGX)"
        >
        <div v-if="errors.price" class="error-message">{{ errors.price }}</div>
      </div>
      
      <div class="form-group">
        <input 
          id="quantity"
          type="number" 
          v-model="formData.quantity" 
          :class="{ 'error': errors.quantity }"
          min="0"
          placeholder="Quantity"
        >
        <div v-if="errors.quantity" class="error-message">{{ errors.quantity }}</div>
      </div>
      
      <div class="form-row">
        <div class="form-group half-width">
          <input 
            id="color"
            type="text" 
            v-model="formData.color" 
            :class="{ 'error': errors.color }"
            placeholder="Color"
          >
          <div v-if="errors.color" class="error-message">{{ errors.color }}</div>
        </div>
        
        <div class="form-group half-width">
          <input
            id="image"
            type="file"
            accept="image/*"
            @change="handleFileChange"
            :class="{ 'error': errors.image }"
            aria-label="Upload Image"
          >
          <div v-if="errors.image" class="error-message">{{ errors.image }}</div>
        </div>
      </div>
      
      <div class="form-row">
        <button type="submit" class="btn btn-primary">SAVE</button>
        <button type="button" @click="clearForm" class="btn btn-secondary">CLEAR</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.product-form {
  padding: 1.5rem;
}

h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.half-width {
  flex: 1;
}

.btn {
  padding: 0.625rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  flex: 1;
}

.btn-primary {
  background-color: #f97316;
  color: white;
}

.btn-secondary {
  background-color: #d1d5db;
  color: #1f2937;
}

input.error {
  border-color: var(--danger-color);
}

.error-message {
  color: var(--danger-color);
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.alert {
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.alert-success {
  background-color: var(--success-color);
  color: white;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0 0.5rem;
}

input {
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  padding: 0.625rem;
  width: 100%;
  font-size: 0.875rem;
  transition: border-color 0.15s ease-in-out;
}

input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 44, 133, 0.1);
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-color);
}
</style>