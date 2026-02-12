<script setup lang="ts">
defineI18nRoute({
  paths: {
    de: '/marken',
  },
})

const { brands } = useBrands()

// Split brands for different sections
const featuredBrand = computed(() => brands.value?.items?.[0])
const highlightedBrands = computed(() => brands.value?.items?.slice(1, 4) || [])
const remainingBrands = computed(() => brands.value?.items?.slice(4) || [])

const isLoaded = ref(false)
onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Cinematic Hero Section -->
    <section class="relative h-[90vh] overflow-hidden bg-warm-950">
      <!-- Background with featured brand -->
      <div v-if="featuredBrand" class="absolute inset-0">
        <NuxtImg
          :src="featuredBrand.hero?.src"
          :alt="featuredBrand.name"
          class="size-full object-cover opacity-40 scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-warm-950/60 via-warm-950/40 to-warm-950" />
        <div class="absolute inset-0 bg-gradient-to-r from-warm-950/80 via-transparent to-warm-950/80" />
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <span
          class="mb-6 inline-block text-xs font-medium uppercase tracking-[0.3em] text-primary/80 transition-all duration-1000"
          :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
        >
          Curated Excellence
        </span>
        
        <h1
          class="font-serif text-5xl font-light leading-tight text-white md:text-7xl lg:text-8xl transition-all duration-1000 delay-100"
          :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
        >
          The Makers
        </h1>
        
        <p
          class="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/70 md:text-xl transition-all duration-1000 delay-200"
          :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
        >
          Discover the artisans and visionaries behind our collection. 
          Each brand tells a story of craftsmanship, innovation, and timeless design.
        </p>

        <!-- Scroll indicator -->
        <div
          class="absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-500"
          :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
        >
          <div class="flex flex-col items-center gap-3 text-white/50">
            <span class="text-xs uppercase tracking-widest">Explore</span>
            <div class="h-12 w-px bg-gradient-to-b from-white/50 to-transparent" />
          </div>
        </div>
      </div>

      <!-- Floating Brand Logos Preview -->
      <div
        class="absolute bottom-24 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-300"
        :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
      >
        <div class="flex items-center gap-8">
          <template v-for="(brand, index) in brands?.items?.slice(0, 5)" :key="brand.key">
            <div
              class="h-8 w-20 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0"
              :style="{ transitionDelay: `${400 + index * 100}ms` }"
            >
              <NuxtImg
                :src="brand.logo?.src"
                :alt="brand.name"
                class="size-full object-contain brightness-0 invert"
              />
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- Featured Brand Spotlight -->
    <section v-if="featuredBrand" class="relative bg-background">
      <div class="mx-auto max-w-7xl px-6 py-32">
        <div class="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <!-- Brand Image -->
          <div class="relative">
            <div class="aspect-[4/5] overflow-hidden">
              <NuxtImg
                :src="featuredBrand.hero?.src"
                :alt="featuredBrand.name"
                class="size-full object-cover"
              />
            </div>
            <!-- Floating accent -->
            <div class="absolute -bottom-8 -right-8 h-32 w-32 bg-primary/10" />
          </div>

          <!-- Brand Info -->
          <div class="flex flex-col justify-center">
            <span class="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Featured Brand
            </span>
            
            <div class="my-6 h-16 w-40">
              <NuxtImg
                :src="featuredBrand.logo?.src"
                :alt="featuredBrand.name"
                class="size-full object-contain object-left"
              />
            </div>

            <h2 class="font-serif text-4xl font-light text-foreground md:text-5xl">
              {{ featuredBrand.name }}
            </h2>

            <div class="mt-8 space-y-4">
              <p class="text-lg font-light leading-relaxed text-muted-foreground">
                Discover a world where form meets function, where every piece tells a story 
                of meticulous craftsmanship and thoughtful design.
              </p>
            </div>

            <NuxtLink
              :to="featuredBrand.link?.path"
              class="group mt-10 inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-foreground"
            >
              <span>Explore Collection</span>
              <svg class="h-4 w-4 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Highlighted Brands - Editorial Grid -->
    <section class="bg-warm-100 py-32">
      <div class="mx-auto max-w-7xl px-6">
        <div class="mb-16 text-center">
          <span class="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Signature Collections
          </span>
          <h2 class="mt-4 font-serif text-4xl font-light text-foreground">
            Brands We Love
          </h2>
        </div>

        <!-- Asymmetric Grid -->
        <div class="grid gap-6 md:grid-cols-12 md:grid-rows-2">
          <!-- Large card -->
          <div
            v-if="highlightedBrands[0]"
            class="group relative md:col-span-7 md:row-span-2"
          >
            <NuxtLink :to="highlightedBrands[0].link?.path" class="block h-full">
              <div class="relative h-full min-h-[500px] overflow-hidden bg-warm-200">
                <NuxtImg
                  :src="highlightedBrands[0].hero?.src"
                  :alt="highlightedBrands[0].name"
                  class="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-warm-950/80 via-warm-950/20 to-transparent" />
                
                <!-- Content -->
                <div class="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <div class="mb-4 h-10 w-32">
                    <NuxtImg
                      :src="highlightedBrands[0].logo?.src"
                      :alt="highlightedBrands[0].name"
                      class="size-full object-contain object-left brightness-0 invert"
                    />
                  </div>
                  <h3 class="font-serif text-3xl font-light text-white md:text-4xl">
                    {{ highlightedBrands[0].name }}
                  </h3>
                  <p class="mt-3 max-w-md text-sm font-light text-white/70">
                    Explore the complete collection of thoughtfully designed pieces.
                  </p>
                  
                  <div class="mt-6 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/80 transition-all group-hover:gap-4">
                    <span>View Collection</span>
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- Stacked cards -->
          <template v-for="(brand, index) in highlightedBrands.slice(1, 3)" :key="brand.key">
            <div class="group relative md:col-span-5">
              <NuxtLink :to="brand.link?.path" class="block">
                <div class="relative aspect-[4/3] overflow-hidden bg-warm-200">
                  <NuxtImg
                    :src="brand.hero?.src"
                    :alt="brand.name"
                    class="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-warm-950/70 via-transparent to-transparent" />
                  
                  <!-- Content -->
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
                </div>
              </NuxtLink>
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- Brand Philosophy Section -->
    <section class="relative overflow-hidden bg-warm-950 py-32">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>
      
      <div class="relative mx-auto max-w-4xl px-6 text-center">
        <span class="text-xs font-medium uppercase tracking-[0.3em] text-primary">
          Our Philosophy
        </span>
        
        <h2 class="mt-8 font-serif text-3xl font-light leading-relaxed text-white md:text-4xl lg:text-5xl">
          "We believe in the power of thoughtful design to transform 
          <span class="text-primary">everyday moments</span> 
          into meaningful experiences."
        </h2>
        
        <p class="mt-10 text-lg font-light text-white/60">
          Each brand in our collection shares this vision—creating pieces that are 
          beautiful, functional, and built to last.
        </p>
      </div>
    </section>

    <!-- All Brands Grid -->
    <section class="bg-background py-32">
      <div class="mx-auto max-w-7xl px-6">
        <div class="mb-16 flex flex-col items-center text-center">
          <span class="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Complete Directory
          </span>
          <h2 class="mt-4 font-serif text-4xl font-light text-foreground">
            All Brands
          </h2>
          <p class="mt-4 max-w-xl text-muted-foreground">
            Browse our complete collection of carefully selected brands, each chosen for their 
            commitment to quality and design excellence.
          </p>
        </div>

        <!-- Interactive Brand Grid -->
        <div class="grid gap-1 sm:grid-cols-2 lg:grid-cols-4">
          <template v-for="brand in brands?.items" :key="brand.key">
            <NuxtLink
              :to="brand.link?.path"
              class="group relative aspect-square overflow-hidden bg-warm-100"
            >
              <!-- Background Image -->
              <NuxtImg
                :src="brand.hero?.src"
                :alt="brand.name"
                class="absolute inset-0 size-full object-cover opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
              />
              
              <!-- Overlay -->
              <div class="absolute inset-0 bg-warm-950/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <!-- Default State - Logo -->
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
        </div>
      </div>
    </section>

    <!-- Brand Story CTA -->
    <section class="bg-warm-100">
      <div class="mx-auto max-w-7xl px-6 py-24">
        <div class="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <h2 class="font-serif text-3xl font-light text-foreground">
              Want to learn more about our brands?
            </h2>
            <p class="mt-2 text-muted-foreground">
              Discover the stories, craftsmanship, and inspiration behind each collection.
            </p>
          </div>
          <NuxtLink
            to="/about"
            class="group inline-flex items-center gap-3 bg-foreground px-8 py-4 text-sm font-medium uppercase tracking-widest text-background transition-all hover:bg-primary"
          >
            <span>Our Story</span>
            <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
