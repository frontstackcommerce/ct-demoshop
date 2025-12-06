<script setup lang="ts">
defineProps<{
  brand: BrandFull
}>()
</script>

<template>
  <div
    class="bg-shade-100 absolute inset-0 top-40 z-0 h-[40%] min-h-[340px] w-screen overflow-hidden"
  >
    <NuxtImg
      :src="brand.hero?.src"
      :alt="brand.name"
      class="size-full object-cover opacity-80 blur-sm"
    />
  </div>

  <div class="relative z-10 mx-auto mt-40 flex max-w-7xl flex-col gap-12">
    <div class="bg-background aspect-square size-40 shadow-sm">
      <NuxtImg :src="brand.logo?.src" :alt="brand.name" class="size-full object-contain p-4" />
    </div>

    <div class="bg-white p-4 shadow-sm">
      <p class="text-muted-foreground font-light">{{ brand.description }}</p>
    </div>
  </div>

  <div class="relative mx-auto my-12 grid max-w-7xl grid-cols-4 gap-4 gap-y-16">
    <div v-for="product in brand.products?.items" :key="product.key">
      <ProductCard :product="product" />
    </div>
  </div>
</template>
