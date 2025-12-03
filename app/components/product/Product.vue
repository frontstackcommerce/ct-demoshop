<script setup lang="ts">
defineProps<{
  product: ProductFull
}>()
</script>

<template>
  <div>
    <h1>{{ product.name }}</h1>
  </div>
</template>
