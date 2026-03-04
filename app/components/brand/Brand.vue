<script setup lang="ts">
defineProps<{
  brand: BrandFull
}>()
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="relative h-[60vh] max-h-[600px] min-h-[400px] overflow-hidden bg-warm-950">
      <div class="absolute inset-0">
        <NuxtImg
          v-if="brand.hero?.src"
          :src="brand.hero.src"
          :alt="brand.name"
          class="h-full w-full object-cover opacity-60"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-warm-950/90 via-warm-950/40 to-transparent"
        />
      </div>
      <div class="relative flex h-full flex-col justify-end">
        <div class="container mx-auto max-w-7xl px-6 pb-12 lg:px-12 lg:pb-16">
          <div v-if="brand.logo?.src" class="mb-6 h-12 w-32">
            <NuxtImg
              :src="brand.logo.src"
              :alt="brand.name"
              class="size-full object-contain object-left brightness-0 invert"
            />
          </div>
          <h1 class="font-serif text-4xl font-light text-white sm:text-5xl lg:text-6xl">
            {{ brand.name }}
          </h1>
          <p
            v-if="brand.description"
            class="mt-4 max-w-2xl text-lg font-light leading-relaxed text-white/60"
          >
            {{ brand.description }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
