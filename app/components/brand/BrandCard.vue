<script setup lang="ts">
defineProps<{
  brand: BrandCard
}>()
</script>

<template>
  <NuxtLink :to="brand.link?.path">
    <img :src="brand.logo?.src" :alt="brand.name" class="max-w-40" />
    <h1 class="text-2xl font-bold">{{ brand.name }}</h1>
  </NuxtLink>
</template>
