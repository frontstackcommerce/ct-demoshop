<script setup lang="ts">
interface Product {
  id: number
  name: string
  price: number
  quantity: number
}

defineProps<{
  products: Product[]
}>()

defineEmits<{
  'add-product': [product: Product]
}>()
</script>

<template>
  <div class="mb-8">
    <h2 class="mb-4 text-xl font-semibold text-gray-900">Available Products</h2>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div v-for="product in products" :key="product.id" class="rounded-lg border bg-gray-50 p-4">
        <h3 class="font-medium text-gray-900">{{ product.name }}</h3>
        <p class="text-gray-600">{{ formatPrice(product.price) }}</p>
        <button
          class="mt-2 w-full rounded bg-blue-600 py-2 text-white transition-colors hover:bg-blue-700"
          @click="$emit('add-product', product)"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>
