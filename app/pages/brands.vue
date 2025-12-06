<script setup lang="ts">
defineI18nRoute({
  paths: {
    de: '/marken', // -> accessible at /de/marken
  },
})
const { brands } = useBrands()
</script>

<template>
  <div class="mx-auto mt-40 flex max-w-7xl flex-col gap-4">
    <h1 class="text-3xl font-medium">
      {{ $t('brands.label') }}
    </h1>
    <p class="text-muted-foreground font-light">
      {{ $t('brands.description') }}
    </p>
  </div>

  <div class="mx-auto my-12 max-w-7xl">
    <div v-if="brands">
      <div class="grid grid-cols-4 gap-4">
        <BrandCard v-for="brand in brands.items" :key="brand.key" :brand="brand" />
      </div>
    </div>
  </div>
</template>
