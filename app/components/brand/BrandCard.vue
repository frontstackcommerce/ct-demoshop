<script setup lang="ts">
defineProps<{
  brand: BrandCard
}>()
</script>

<template>
  <NuxtLink :to="brand.link?.path">
    <div class="overflow-hidden aspect-square relative flex items-center justify-center group">
      <NuxtImg :src="brand.hero?.src" :alt="brand.name" class="size-full object-cover absolute inset-0 blur-sm scale-110 opacity-50 group-hover:opacity-80 transition-all group-hover:blur-xs duration-500" />
      <div class="bg-white w-2/3 aspect-[3] bg-white backdrop-blur-sm">
        <NuxtImg :src="brand.logo?.src" :alt="brand.name" class="size-full object-contain p-4" />
      </div>
    </div>
  </NuxtLink>
</template>
