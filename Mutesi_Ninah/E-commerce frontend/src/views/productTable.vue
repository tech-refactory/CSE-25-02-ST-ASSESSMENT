<template>
  <table class="w-full mt-6 border">
    <thead class="bg-gray-100">
      <tr><th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Qty</th></tr>
    </thead>
    <tbody>
      <tr v-for="prod in products" :key="prod._id">
        <td>{{ prod._id.slice(-6) }}</td>
        <td>{{ prod.name }}</td>
        <td>{{ prod.category }}</td>
        <td>{{ prod.price }}</td>
        <td>{{ prod.quantity }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['products']
}
</script>
