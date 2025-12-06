<script setup lang="ts">
defineProps<{
  category: CategoryFull
}>()
</script>

<template>
  <div class="mx-auto mt-40 mb-12 max-w-7xl">
    <h1 class="text-3xl font-bold">{{ category.name }}</h1>
    <div v-if="category.products?.items" class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <ProductCard
        v-for="product in category.products?.items"
        :key="product.key"
        :product="product"
      />
    </div>
  </div>
</template>
