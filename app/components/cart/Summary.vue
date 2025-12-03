<script setup lang="ts">
defineProps<{
  total: number
}>()

defineEmits<{
  'clear-cart': []
  checkout: []
}>()
</script>
<template>
  <div class="mt-6 border-t pt-4">
    <div class="mb-4 flex items-center justify-between">
      <span class="text-xl font-semibold text-gray-900">Total: {{ formatPrice(total) }}</span>
      <button
        class="rounded bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700"
        @click="$emit('clear-cart')"
      >
        Clear Cart
      </button>
    </div>
    <button
      class="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition-colors hover:bg-green-700"
      @click="$emit('checkout')"
    >
      Proceed to Checkout
    </button>
  </div>
</template>
