<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { addProduct } from '../services/api'
import type { ProductInput } from '../types'

const router = useRouter()

const product = ref<ProductInput>({
  name: '',
  category: '',
  price: 0,
  quantity: 0,
  color: '',
  image: null
})

const isSubmitting = ref(false)
const error = ref('')
const successMessage = ref('')

const validateForm = (): boolean => {
  if (!product.value.name.trim()) {
    error.value = 'Product name is required'
    return false
  }
  
  if (!product.value.category.trim()) {
    error.value = 'Category is required'
    return false
  }
  
  if (product.value.price <= 0) {
    error.value = 'Price must be greater than 0'
    return false
  }
  
  if (product.value.quantity < 0) {
    error.value = 'Quantity cannot be negative'
    return false
  }
  
  return true
}

const handleSubmit = async () => {
  error.value = ''
  successMessage.value = ''
  
  if (!validateForm()) return
  
  isSubmitting.value = true
  
  try {
    await addProduct(product.value)
    successMessage.value = 'Product added successfully!'
    resetForm()
    setTimeout(() => {
      router.push('/')
    }, 2000)
  } catch (err) {
    console.error(err)
    error.value = 'Failed to add product. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    product.value.image = target.files[0]
  }
}

const resetForm = () => {
  product.value = {
    name: '',
    category: '',
    price: 0,
    quantity: 0,
    color: '',
    image: null
  }
  
  // Reset file input
  const fileInput = document.getElementById('imageUpload') as HTMLInputElement
  if (fileInput) {
    fileInput.value = ''
  }
}
</script>

<template>
  <div class="add-product container">
    <h1>Add Product</h1>
    
    <div class="form-container">
      <form @submit.prevent="handleSubmit" class="product-form">
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        
        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>
        
        <div class="form-group">
          <label for="productName">Product Name</label>
          <input
            id="productName"
            v-model="product.name"
            type="text"
            placeholder="Product Name"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="category">Category</label>
          <input
            id="category"
            v-model="product.category"
            type="text"
            placeholder="Category"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="price">Price</label>
          <input
            id="price"
            v-model.number="product.price"
            type="number"
            placeholder="Price"
            min="0"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="quantity">Quantity</label>
          <input
            id="quantity"
            v-model.number="product.quantity"
            type="number"
            placeholder="Quantity"
            min="0"
            required
          />
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="color">Color</label>
            <input
              id="color"
              v-model="product.color"
              type="text"
              placeholder="Color"
            />
          </div>
          
          <div class="form-group">
            <label for="imageUpload">Upload Image</label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              @change="handleImageChange"
            />
          </div>
        </div>
        
        <div class="form-actions">
          <button
            type="submit"
            class="btn-save"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Saving...' : 'SAVE' }}
          </button>
          
          <button
            type="button"
            class="btn-clear"
            @click="resetForm"
            :disabled="isSubmitting"
          >
            CLEAR
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.add-product {
  max-width: 800px;
  margin: 0 auto;
}

.form-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 32px;
  margin-top: 24px;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group label {
  font-weight: 500;
  color: var(--gray-700);
}

.error-message {
  background-color: rgba(231, 76, 60, 0.1);
  color: var(--danger);
  padding: 12px;
  border-radius: 4px;
  font-weight: 500;
}

.success-message {
  background-color: rgba(39, 174, 96, 0.1);
  color: var(--success);
  padding: 12px;
  border-radius: 4px;
  font-weight: 500;
}

.form-actions {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}

.btn-save {
  flex: 1;
  background-color: var(--accent);
  color: white;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn-save:hover {
  background-color: #d35400;
}

.btn-clear {
  flex: 1;
  background-color: var(--gray-300);
  color: var(--gray-700);
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn-clear:hover {
  background-color: var(--gray-400);
}

@media (prefers-color-scheme: dark) {
  .form-container {
    background-color: var(--gray-700);
  }
  
  .form-group label {
    color: var(--gray-300);
  }
  
  .btn-clear {
    background-color: var(--gray-600);
    color: var(--gray-200);
  }
  
  .btn-clear:hover {
    background-color: var(--gray-500);
  }
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-container {
    padding: 16px;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>