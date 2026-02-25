<script setup lang="ts">
const props = defineProps<{
  price: Price
}>()
</script>

<template>
  <span>
    {{ formatPrice(props.price) }}
  </span>
</template>
