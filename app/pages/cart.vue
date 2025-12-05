<script setup lang="ts">
/**
 * Example page for a shopping cart
 */
const { cart, addItem, updateItem, removeItem } = useCart()

const handleAddProduct = (product: any) => {
  addItem(product)
}

const handleRemoveItem = (item: any) => {
  removeItem(item)
}

const handleCheckout = () => {
  // Placeholder for checkout functionality
  console.log('Proceeding to checkout...')
}
</script>

<template>
  <div class="mx-auto max-w-4xl p-6">
    <h1 class="mb-8 text-3xl font-bold text-gray-900">Shopping Cart Demo</h1>

    <CartEmpty v-if="cart?.lineItems?.length === 0" />

    <div v-else class="space-y-4">
      <CartItem v-for="item in cart?.lineItems" :key="item.id" :item="item" @remove-item="handleRemoveItem" />

      <CartSummary :total="cart?.totalPrice?.centAmount ?? 0" @clear-cart="" @checkout="handleCheckout" />
    </div>
  </div>
</template>
