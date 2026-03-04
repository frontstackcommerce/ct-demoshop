<script setup lang="ts">
defineProps<{
  category: any
}>()
</script>

<template>
  <div class="bg-warm-950 relative h-[45vh] max-h-[500px] min-h-[350px] overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0">
      <NuxtImg
        v-if="category.image?.src"
        :src="category.image?.src"
        alt="Category hero image"
        class="h-full w-full object-cover opacity-60"
      />
      <div v-else class="from-warm-800 to-warm-950 h-full w-full bg-gradient-to-br" />
      <div class="from-warm-950 via-warm-950/50 absolute inset-0 bg-gradient-to-t to-transparent" />
    </div>

    <!-- Content -->
    <div class="relative flex h-full flex-col justify-end">
      <div class="container mx-auto max-w-7xl px-6 pb-12 lg:px-12 lg:pb-16">
        <!-- Breadcrumbs -->
        <nav
          v-if="category.breadcrumbs?.length"
          class="mb-6 flex items-center gap-2 text-sm text-white/50"
        >
          <NuxtLink to="/" class="transition-colors hover:text-white/80">Home</NuxtLink>
          <template v-for="(crumb, index) in category.breadcrumbs as any[]" :key="crumb.key">
            <span class="text-white/30">/</span>
            <NuxtLink
              v-if="(index as number) < category.breadcrumbs.length - 1"
              :to="crumb.link?.path ?? ''"
              class="transition-colors hover:text-white/80"
            >
              {{ crumb.name }}
            </NuxtLink>
            <span v-else class="text-white/80">{{ crumb.name }}</span>
          </template>
        </nav>

        <h1 class="font-serif text-4xl font-light text-white sm:text-5xl lg:text-6xl">
          {{ category.name }}
        </h1>

        <p
          v-if="category.description"
          class="mt-4 max-w-2xl text-lg leading-relaxed font-light text-white/60"
        >
          {{ category.description }}
        </p>
      </div>
    </div>
  </div>
</template>
