<script setup lang="ts">
defineProps<{
  brand: BrandCard
  variant?: 'default' | 'minimal' | 'featured'
}>()
</script>

<template>
  <!-- Featured Variant -->
  <NuxtLink
    v-if="variant === 'featured'"
    :to="brand.link?.path"
    class="group relative block aspect-[4/3] overflow-hidden bg-warm-100"
  >
    <NuxtImg
      :src="brand.hero?.src"
      :alt="brand.name"
      class="size-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-warm-950/80 via-warm-950/20 to-transparent" />
    
    <div class="absolute bottom-0 left-0 right-0 p-6">
      <div class="mb-3 h-8 w-24">
        <NuxtImg
          :src="brand.logo?.src"
          :alt="brand.name"
          class="size-full object-contain object-left brightness-0 invert"
        />
      </div>
      <h3 class="font-serif text-2xl font-light text-white">
        {{ brand.name }}
      </h3>
      <div class="mt-4 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/70 transition-all group-hover:gap-3 group-hover:text-white">
        <span>Discover</span>
        <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  </NuxtLink>

  <!-- Minimal Variant -->
  <NuxtLink
    v-else-if="variant === 'minimal'"
    :to="brand.link?.path"
    class="group flex flex-col items-center p-6 transition-all hover:bg-warm-100"
  >
    <div class="h-12 w-32 grayscale transition-all group-hover:grayscale-0">
      <NuxtImg
        :src="brand.logo?.src"
        :alt="brand.name"
        class="size-full object-contain"
      />
    </div>
    <span class="mt-3 text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground">
      {{ brand.name }}
    </span>
  </NuxtLink>

  <!-- Default Variant -->
  <NuxtLink
    v-else
    :to="brand.link?.path"
    class="group relative block aspect-square overflow-hidden bg-warm-100"
  >
    <!-- Background Image (hidden by default, shown on hover) -->
    <NuxtImg
      :src="brand.hero?.src"
      :alt="brand.name"
      class="absolute inset-0 size-full object-cover opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
    />
    
    <!-- Overlay -->
    <div class="absolute inset-0 bg-warm-950/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    
    <!-- Default State - Logo centered -->
    <div class="absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-500 group-hover:opacity-0">
      <div class="h-12 w-32">
        <NuxtImg
          :src="brand.logo?.src"
          :alt="brand.name"
          class="size-full object-contain"
        />
      </div>
      <span class="mt-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {{ brand.name }}
      </span>
    </div>
    
    <!-- Hover State -->
    <div class="absolute inset-0 flex flex-col items-center justify-center p-8 opacity-0 transition-all duration-500 group-hover:opacity-100">
      <div class="h-10 w-28 mb-4">
        <NuxtImg
          :src="brand.logo?.src"
          :alt="brand.name"
          class="size-full object-contain brightness-0 invert"
        />
      </div>
      <h3 class="font-serif text-2xl font-light text-white">
        {{ brand.name }}
      </h3>
      <div class="mt-6 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/80">
        <span>Explore</span>
        <svg class="h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  </NuxtLink>
</template>
