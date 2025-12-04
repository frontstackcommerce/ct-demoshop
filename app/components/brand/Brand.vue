<script setup lang="ts">
defineProps<{
  brand: BrandFull
}>()
</script>

<template>
  <h1 class="text-2xl font-bold">{{ brand.name }}</h1>
  <p class="text-gray-500">{{ brand.description }}</p>
  <div class="grid grid-cols-4 gap-4">
    <div v-for="product in brand.products?.items" :key="product.key">
      <NuxtLink v-if="product.link" :to="product.link?.path">{{ product.name }}</NuxtLink>
      <p v-else>{{ product.name }}</p>
    </div>
  </div>
</template>
