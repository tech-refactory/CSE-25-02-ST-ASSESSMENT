import axios from 'axios'
import type { Product, ProductInput } from '../types'

const API_URL = 'http://localhost:3000/api'

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/products`)
  return response.data
}

export const addProduct = async (product: ProductInput): Promise<Product> => {
  const formData = new FormData()
  formData.append('name', product.name)
  formData.append('category', product.category)
  formData.append('price', product.price.toString())
  formData.append('quantity', product.quantity.toString())
  
  if (product.color) {
    formData.append('color', product.color)
  }
  
  if (product.image) {
    formData.append('image', product.image)
  }
  
  const response = await axios.post(`${API_URL}/products`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  
  return response.data
}

export const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/products/${id}`)
}

export const updateProduct = async (id: string, product: Partial<ProductInput>): Promise<Product> => {
  const formData = new FormData()
  
  if (product.name) formData.append('name', product.name)
  if (product.category) formData.append('category', product.category)
  if (product.price !== undefined) formData.append('price', product.price.toString())
  if (product.quantity !== undefined) formData.append('quantity', product.quantity.toString())
  if (product.color) formData.append('color', product.color)
  if (product.image) formData.append('image', product.image)
  
  const response = await axios.put(`${API_URL}/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  
  return response.data
}