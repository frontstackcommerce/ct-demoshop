<script setup lang="ts">
defineProps<{
  brand: BrandFull
}>()
</script>

<template>
  <div>
    <h1>{{ brand.name }}</h1>
  </div>
</template>
