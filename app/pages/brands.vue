<script setup lang="ts">
defineI18nRoute({
  paths: {
    de: '/marken', // -> accessible at /de/marken
  },
})
const { brands } = useBrands()
</script>

<template>
  <div class="mt-20 flex flex-col gap-4">
    <h1 class="text-3xl font-medium">
      {{ $t('brands.label') }}
    </h1>
    <p class="font-light text-gray-500">
      {{ $t('brands.description') }}
    </p>
  </div>

  <div class="mt-12">
    <div v-if="brands">
      <div class="grid grid-cols-4 gap-4">
        <BrandCard v-for="brand in brands.items" :key="brand.key" :brand="brand" />
      </div>
    </div>
  </div>
</template>
