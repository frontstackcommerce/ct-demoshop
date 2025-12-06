<script setup lang="ts">
defineProps<{
  category: CategoryFull
}>()
</script>

<template>
  <div class="mx-auto my-12 max-w-6xl px-5">
    <h1 class="font-display text-3xl font-light">{{ category.name }}</h1>
    <div v-if="category.products?.items" class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <ProductCard
        v-for="product in category.products?.items"
        :key="product.key"
        :product="product"
      />
    </div>
  </div>
</template>
