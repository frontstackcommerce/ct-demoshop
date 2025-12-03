<script setup lang="ts">
defineProps<{
  category: CategoryFull
}>()
</script>

<template>
  <div>
    <h1>{{ category.name }}</h1>
    <div v-for="product in category.products?.items" :key="product.key">
      <NuxtLink v-if="product.link" :to="product.link?.path">{{ product.name }}</NuxtLink>
      <p v-else>{{ product.name }}</p>
    </div>
  </div>
</template>
