<script setup lang="ts">
const props = defineProps<{
  price: Price
}>()

/**
 * Go from { amount: 8995, currency: 'eur' } to 89.95 €
 */
const formattedPrice = computed(() => {
  return ((props.price.amount ?? 0) / 100).toFixed(props.price.precision) + ' €'
})
</script>

<template>
  <span>
    {{ formattedPrice }}
  </span>
</template>
