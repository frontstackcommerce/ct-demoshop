<script setup lang="ts">
defineProps<{
  brand: BrandCard
}>()
</script>

<template>
  <NuxtLink :to="brand.link?.path">
    <div class="group relative flex aspect-square items-center justify-center overflow-hidden">
      <NuxtImg
        :src="brand.hero?.src"
        :alt="brand.name"
        class="absolute inset-0 size-full scale-110 object-cover opacity-50 blur-sm transition-all duration-500 group-hover:opacity-80 group-hover:blur-xs"
      />
      <div class="aspect-[3] w-2/3 bg-white backdrop-blur-sm">
        <NuxtImg :src="brand.logo?.src" :alt="brand.name" class="size-full object-contain p-4" />
      </div>
    </div>
  </NuxtLink>
</template>
