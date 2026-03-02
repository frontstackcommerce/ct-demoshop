<script setup lang="ts">
defineI18nRoute({
  paths: {
    de: '/marken', // -> accessible at /de/marken
  },
})
const { listing: brands, status } = useFronticListing('BrandListing', {})
</script>

<template>
  <div class="mx-auto mt-40 flex max-w-7xl flex-col gap-4 px-5">
    <h1 class="text-3xl font-medium">
      {{ $t('brands.label') }}
    </h1>
    <p class="text-muted-foreground font-light">
      {{ $t('brands.description') }}
    </p>
  </div>

  <div class="mx-auto my-12 max-w-7xl px-5">
    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <template v-if="status === 'pending'">
        <Skeleton v-for="i in 8" :key="i" class="aspect-square w-full" />
      </template>
      <template v-else-if="brands?.items?.length">
        <BrandCard v-for="brand in brands.items" :key="brand.key" :brand="brand" />
      </template>
    </div>
  </div>
</template>
