<script setup lang="ts">
/**
 * Example page for a shopping cart
 */
const { lineItems, removeLineItem, refreshCart, totalPrice } = useCart()

onMounted(async () => {
  await refreshCart()
})

const handleRemoveItem = (item: any) => {
  removeLineItem(item.id)
}

const handleCheckout = () => {
  // Placeholder for checkout functionality
  console.log('Proceeding to checkout...')
}
</script>

<template>
  <div class="mx-auto max-w-4xl p-6">
    <h1 class="mb-8 text-3xl font-bold text-gray-900">Shopping Cart Demo</h1>

    <CartEmpty v-if="lineItems?.length === 0" />

    <div v-else class="space-y-4">
      <CartItem v-for="item in lineItems" :key="item.id" :item="item" @remove-item="handleRemoveItem" />

      <CartSummary :total="totalPrice?.centAmount ?? 0" @clear-cart="" @checkout="handleCheckout" />
    </div>
  </div>
</template>
