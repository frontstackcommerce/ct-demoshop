<script setup lang="ts">
const { brands } = useBrands()
</script>

<template>
  <div class="mt-20 flex flex-col gap-4">
    <h1 class="text-3xl font-medium">
      {{ $t('brands.label') }}
    </h1>
    <p class="text-gray-500 font-light">
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
