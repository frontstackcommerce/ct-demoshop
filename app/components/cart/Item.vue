<script setup lang="ts">
interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

defineProps<{
  item: CartItem
}>()

defineEmits<{
  'remove-item': [item: CartItem]
}>()
</script>

<template>
  <div class="flex items-center justify-between rounded-lg border bg-white p-4 shadow">
    <div class="flex-1">
      <h3 class="font-semibold text-gray-900">{{ item.name }}</h3>
      <p class="text-gray-600">Quantity: {{ item.quantity }}</p>
      <p class="text-gray-600">Price: {{ formatPrice(item.price) }}</p>
    </div>
    <button
      class="rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
      @click="$emit('remove-item', item)"
    >
      Remove
    </button>
  </div>
</template>
