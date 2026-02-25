<script setup lang="ts">
defineProps<{
  brand: BrandFull
}>()
</script>

<template>
  <div class="mx-auto max-w-7xl px-5 py-12 sm:px-10 lg:px-5">
    <h1 class="font-display text-3xl font-medium">
      {{ brand.name }}
    </h1>
    <p v-if="brand.description" class="text-muted-foreground mt-4 text-lg font-light">
      {{ brand.description }}
    </p>
  </div>
</template>
