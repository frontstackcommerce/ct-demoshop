<script setup lang="ts">
defineI18nRoute({
  paths: {
    de: '/marken',
  },
})

const { listing: brands } = useFronticListing('BrandListing', {})

// Split brands for different sections
const featuredBrand = computed(() => brands.value?.items?.[0])
const highlightedBrands = computed(() => brands.value?.items?.slice(1, 4) || [])
const _remainingBrands = computed(() => brands.value?.items?.slice(4) || [])

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
    <section class="bg-warm-950 relative h-[90vh] overflow-hidden">
      <!-- Background with featured brand -->
      <div v-if="featuredBrand" class="absolute inset-0">
        <NuxtImg
          :src="featuredBrand.hero?.src"
          :alt="featuredBrand.name"
          class="size-full scale-105 object-cover opacity-40"
        />
        <div
          class="from-warm-950/60 via-warm-950/40 to-warm-950 absolute inset-0 bg-gradient-to-b"
        />
        <div
          class="from-warm-950/80 to-warm-950/80 absolute inset-0 bg-gradient-to-r via-transparent"
        />
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <span
          class="text-primary/80 mb-6 inline-block text-xs font-medium tracking-[0.3em] uppercase transition-all duration-1000"
          :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
        >
          {{ $t('brands.hero.label') }}
        </span>

        <h1
          class="font-serif text-5xl leading-tight font-light text-white transition-all delay-100 duration-1000 md:text-7xl lg:text-8xl"
          :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
        >
          {{ $t('brands.hero.title') }}
        </h1>

        <p
          class="mt-6 max-w-2xl text-lg leading-relaxed font-light text-white/70 transition-all delay-200 duration-1000 md:text-xl"
          :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
        >
          {{ $t('brands.hero.description') }}
        </p>

        <!-- Scroll indicator -->
        <div
          class="absolute bottom-12 left-1/2 -translate-x-1/2 transition-all delay-500 duration-1000"
          :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
        >
          <div class="flex flex-col items-center gap-3 text-white/50">
            <span class="text-xs tracking-widest uppercase">{{ $t('brands.scroll') }}</span>
            <div class="h-12 w-px bg-gradient-to-b from-white/50 to-transparent" />
          </div>
        </div>
      </div>

      <!-- Floating Brand Logos Preview -->
      <div
        class="absolute bottom-24 left-1/2 -translate-x-1/2 transition-all delay-300 duration-1000"
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
    <section v-if="featuredBrand" class="bg-background relative">
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
            <div class="bg-primary/10 absolute -right-8 -bottom-8 h-32 w-32" />
          </div>

          <!-- Brand Info -->
          <div class="flex flex-col justify-center">
            <span class="text-primary text-xs font-medium tracking-[0.2em] uppercase">
              {{ $t('brands.featured.label') }}
            </span>

            <div class="my-6 h-16 w-40">
              <NuxtImg
                :src="featuredBrand.logo?.src"
                :alt="featuredBrand.name"
                class="size-full object-contain object-left"
              />
            </div>

            <h2 class="text-foreground font-serif text-4xl font-light md:text-5xl">
              {{ featuredBrand.name }}
            </h2>

            <div class="mt-8 space-y-4">
              <p class="text-muted-foreground text-lg leading-relaxed font-light">
                {{ $t('brands.featured.description') }}
              </p>
            </div>

            <NuxtLink
              :to="featuredBrand.link?.path"
              class="group text-foreground mt-10 inline-flex items-center gap-3 text-sm font-medium tracking-widest uppercase"
            >
              <span>{{ $t('actions.explore-collection') }}</span>
              <svg
                class="h-4 w-4 transition-transform group-hover:translate-x-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
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
          <span class="text-primary text-xs font-medium tracking-[0.2em] uppercase">
            {{ $t('brands.highlighted.label') }}
          </span>
          <h2 class="text-foreground mt-4 font-serif text-4xl font-light">
            {{ $t('brands.highlighted.title') }}
          </h2>
        </div>

        <!-- Asymmetric Grid -->
        <div class="grid gap-6 md:grid-cols-12 md:grid-rows-2">
          <!-- Large card -->
          <div v-if="highlightedBrands[0]" class="group relative md:col-span-7 md:row-span-2">
            <NuxtLink :to="highlightedBrands[0].link?.path" class="block h-full">
              <div class="bg-warm-200 relative h-full min-h-[500px] overflow-hidden">
                <NuxtImg
                  :src="highlightedBrands[0].hero?.src"
                  :alt="highlightedBrands[0].name"
                  class="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  class="from-warm-950/80 via-warm-950/20 absolute inset-0 bg-gradient-to-t to-transparent"
                />

                <!-- Content -->
                <div class="absolute right-0 bottom-0 left-0 p-8 md:p-12">
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
                    {{ $t('brands.highlighted.card-description') }}
                  </p>

                  <div
                    class="mt-6 flex items-center gap-2 text-xs font-medium tracking-widest text-white/80 uppercase transition-all group-hover:gap-4"
                  >
                    <span>{{ $t('actions.view-collection') }}</span>
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- Stacked cards -->
          <template v-for="(brand, _index) in highlightedBrands.slice(1, 3)" :key="brand.key">
            <div class="group relative md:col-span-5">
              <NuxtLink :to="brand.link?.path" class="block">
                <div class="bg-warm-200 relative aspect-[4/3] overflow-hidden">
                  <NuxtImg
                    :src="brand.hero?.src"
                    :alt="brand.name"
                    class="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    class="from-warm-950/70 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
                  />

                  <!-- Content -->
                  <div class="absolute right-0 bottom-0 left-0 p-6">
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

                    <div
                      class="mt-4 flex items-center gap-2 text-xs font-medium tracking-widest text-white/70 uppercase transition-all group-hover:gap-3 group-hover:text-white"
                    >
                      <span>{{ $t('actions.discover') }}</span>
                      <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
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
    <section class="bg-warm-950 relative overflow-hidden py-32">
      <div class="absolute inset-0 opacity-10">
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"
        />
      </div>

      <div class="relative mx-auto max-w-4xl px-6 text-center">
        <span class="text-primary text-xs font-medium tracking-[0.3em] uppercase">
          {{ $t('brands.philosophy.label') }}
        </span>

        <h2
          class="mt-8 font-serif text-3xl leading-relaxed font-light text-white md:text-4xl lg:text-5xl"
        >
          <i18n-t keypath="brands.philosophy.quote" tag="span">
            <template #highlight>
              <span class="text-primary">{{ $t('brands.philosophy.highlight') }}</span>
            </template>
          </i18n-t>
        </h2>

        <p class="mt-10 text-lg font-light text-white/60">
          {{ $t('brands.philosophy.description') }}
        </p>
      </div>
    </section>

    <!-- All Brands Grid -->
    <section class="bg-background py-32">
      <div class="mx-auto max-w-7xl px-6">
        <div class="mb-16 flex flex-col items-center text-center">
          <span class="text-primary text-xs font-medium tracking-[0.2em] uppercase">
            {{ $t('brands.directory.label') }}
          </span>
          <h2 class="text-foreground mt-4 font-serif text-4xl font-light">
            {{ $t('brands.directory.title') }}
          </h2>
          <p class="text-muted-foreground mt-4 max-w-xl">
            {{ $t('brands.directory.description') }}
          </p>
        </div>

        <!-- Interactive Brand Grid -->
        <div class="grid gap-1 sm:grid-cols-2 lg:grid-cols-4">
          <template v-for="brand in brands?.items" :key="brand.key">
            <NuxtLink
              :to="brand.link?.path"
              class="group bg-warm-100 relative aspect-square overflow-hidden"
            >
              <!-- Background Image -->
              <NuxtImg
                :src="brand.hero?.src"
                :alt="brand.name"
                class="absolute inset-0 size-full object-cover opacity-0 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
              />

              <!-- Overlay -->
              <div
                class="bg-warm-950/70 absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              <!-- Default State - Logo -->
              <div
                class="absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-500 group-hover:opacity-0"
              >
                <div class="h-12 w-32">
                  <NuxtImg
                    :src="brand.logo?.src"
                    :alt="brand.name"
                    class="size-full object-contain"
                  />
                </div>
                <span
                  class="text-muted-foreground mt-4 text-xs font-medium tracking-widest uppercase"
                >
                  {{ brand.name }}
                </span>
              </div>

              <!-- Hover State -->
              <div
                class="absolute inset-0 flex flex-col items-center justify-center p-8 opacity-0 transition-all duration-500 group-hover:opacity-100"
              >
                <div class="mb-4 h-10 w-28">
                  <NuxtImg
                    :src="brand.logo?.src"
                    :alt="brand.name"
                    class="size-full object-contain brightness-0 invert"
                  />
                </div>
                <h3 class="font-serif text-2xl font-light text-white">
                  {{ brand.name }}
                </h3>
                <div
                  class="mt-6 flex items-center gap-2 text-xs font-medium tracking-widest text-white/80 uppercase"
                >
                  <span>{{ $t('actions.explore') }}</span>
                  <svg
                    class="h-3 w-3 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
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
            <h2 class="text-foreground font-serif text-3xl font-light">
              {{ $t('brands.cta.title') }}
            </h2>
            <p class="text-muted-foreground mt-2">
              {{ $t('brands.cta.description') }}
            </p>
          </div>
          <NuxtLink
            to="/about"
            class="group bg-foreground text-background hover:bg-primary inline-flex items-center gap-3 px-8 py-4 text-sm font-medium tracking-widest uppercase transition-all"
          >
            <span>{{ $t('actions.our-story') }}</span>
            <svg
              class="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
