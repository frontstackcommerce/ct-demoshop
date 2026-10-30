<script setup lang="ts">
defineProps<{
  category: CategoryFull
  meta?: MenuItem
}>()
</script>

<template>
  <div class="relative h-[45vh] max-h-[500px] min-h-[350px] overflow-hidden bg-warm-950">
    <div class="absolute inset-0">
      <NuxtImg
        v-if="meta?.image?.src"
        :src="meta.image.src"
        :alt="category.name"
        class="h-full w-full object-cover"
      />
      <div v-else class="h-full w-full bg-gradient-to-br from-warm-800 to-warm-950" />
      <div class="absolute inset-0 bg-gradient-to-t from-warm-950 via-warm-950/50 to-transparent" />
    </div>

    <div class="relative flex h-full flex-col justify-end">
      <div class="container mx-auto max-w-7xl px-6 pb-12 lg:px-12 lg:pb-16">
        <nav class="mb-6 flex items-center gap-2 text-sm text-white/50">
          <NuxtLink to="/" class="transition-colors hover:text-white/80">{{ $t('navigation.home') }}</NuxtLink>
          <span class="text-white/30">/</span>
          <span class="text-white/80">{{ category.name }}</span>
        </nav>

        <h1 class="font-serif text-4xl font-light text-white sm:text-5xl lg:text-6xl">
          {{ category.name }}
        </h1>
        <p v-if="meta?.description" class="mt-4 max-w-2xl text-lg font-light text-white/70">
          {{ meta.description }}
        </p>
      </div>
    </div>
  </div>
</template>
