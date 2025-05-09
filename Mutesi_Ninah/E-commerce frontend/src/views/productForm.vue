<template>
  <form @submit.prevent="submitForm" class="space-y-4">
    <input v-model="product.name" :class="inputClass('name')" placeholder="Product Name" />
    <input v-model="product.category" :class="inputClass('category')" placeholder="Category" />
    <input v-model="product.price" :class="inputClass('price')" type="number" placeholder="Price" />
    <input v-model="product.quantity" :class="inputClass('quantity')" type="number" placeholder="Quantity" />
    <input v-model="product.color" :class="inputClass('color')" placeholder="Color" />
    <input v-model="product.image" :class="inputClass('image')" placeholder="Image URL" />
    <button class="bg-orange-500 text-white p-2 w-full">Save</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      product: { name: '', category: '', price: '', quantity: '', color: '', image: '' },
      touched: {}
    }
  },
  methods: {
    inputClass(field) {
      return `w-full border p-2 ${this.touched[field] && !this.product[field] ? 'border-red-500' : ''}`;
    },
    async submitForm() {
      this.touched = Object.keys(this.product).reduce((acc, key) => ({ ...acc, [key]: true }), {});
      if (Object.values(this.product).some(val => !val)) return;

      const res = await fetch('http://localhost:3000/api/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.product)
      });
      if (res.ok) {
        alert("Product added!");
        this.$emit('product-added');
        this.product = { name: '', category: '', price: '', quantity: '', color: '', image: '' };
        this.touched = {};
      }
    }
  }
}
</script>
