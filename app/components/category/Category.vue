<script setup lang="ts">
defineProps<{
  category: CategoryFull
}>()
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold">{{ category.name }}</h1>
    <div v-if="category.products?.items" class="grid grid-cols-4 gap-4">
      <ProductCard
        v-for="product in category.products?.items"
        :key="product.key"
        :product="product"
      />
    </div>
  </div>
</template>
