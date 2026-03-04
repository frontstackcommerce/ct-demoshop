<script setup lang="ts">
defineProps<{
  price: Price
}>()
</script>

<template>
  <span class="text-price">{{ formatPrice(price) }}</span>
</template>
