<script setup lang="ts">
defineProps<{
  brand: BrandFull
}>()
</script>

<template>
  <div class="absolute inset-0 w-screen top-40 h-[40%] min-h-[340px] bg-gray-200 z-0 overflow-hidden">
    <img :src="brand.hero?.src" :alt="brand.name" class="size-full object-cover blur-sm opacity-80" />
  </div>

  <div class="flex flex-col gap-12 mt-20 relative z-10">

    <div class="aspect-square bg-white size-40 shadow-sm">
      <img :src="brand.logo?.src" :alt="brand.name" class="size-full object-contain p-4" />
    </div>

    <div class="bg-white p-4 shadow-sm">
      <p class="text-gray-500 font-light">{{ brand.description }}</p>
    </div>

  </div>

  <div class="relative grid grid-cols-4 gap-4 mt-12 gap-y-16">
    <div v-for="product in brand.products?.items" :key="product.key">
      <ProductCard :product="product" />
    </div>
  </div>
</template>
