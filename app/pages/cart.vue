<script setup lang="ts">
/**
 * Example page for a shopping cart
 */
const { total, items, addItem, removeItem, clearCart } = useCart()

// Sample products for demonstration
const sampleProducts = [
  { id: 1, name: 'Wireless Headphones', price: 99.99, quantity: 1 },
  { id: 2, name: 'Coffee Mug', price: 15.5, quantity: 1 },
  { id: 3, name: 'Notebook', price: 8.99, quantity: 1 },
]

const handleAddProduct = (product: any) => {
  addItem(product)
}

const handleRemoveItem = (item: any) => {
  removeItem(item)
}

const handleClearCart = () => {
  clearCart()
}

const handleCheckout = () => {
  // Placeholder for checkout functionality
  console.log('Proceeding to checkout...')
}
</script>

<template>
  <div class="mx-auto max-w-4xl p-6">
    <h1 class="mb-8 text-3xl font-bold text-gray-900">Shopping Cart Demo</h1>

    <CartProductGrid :products="sampleProducts" @add-product="handleAddProduct" />

    <CartEmpty v-if="items.length === 0" />

    <div v-else class="space-y-4">
      <CartItem v-for="item in items" :key="item.id" :item="item" @remove-item="handleRemoveItem" />

      <CartSummary :total="total" @clear-cart="handleClearCart" @checkout="handleCheckout" />
    </div>
  </div>
</template>
