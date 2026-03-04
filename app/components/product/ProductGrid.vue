<script setup lang="ts">
defineProps<{
  products: ProductCard[]
  columns?: 2 | 3 | 4
}>()
</script>

<template>
  <div
    class="grid gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14"
    :class="{
      'grid-cols-2 md:grid-cols-3 lg:grid-cols-4': columns === 4 || !columns,
      'grid-cols-2 md:grid-cols-3': columns === 3,
      'grid-cols-2': columns === 2,
    }"
  >
    <ProductCard v-for="product in products" :key="product.key" :product="product" />
  </div>
</template>
