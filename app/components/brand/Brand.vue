<script setup lang="ts">
const props = defineProps<{
  brand: BrandFull
}>()

const isLoaded = ref(false)
onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})

// Format price helper
const formatPrice = (price: { amount: number; currency: string; precision: number }) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
  }).format(price.amount / Math.pow(10, price.precision))
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Cinematic Hero -->
    <section class="relative h-[70vh] overflow-hidden bg-warm-950">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <NuxtImg
          :src="brand.hero?.src"
          :alt="brand.name"
          class="size-full object-cover opacity-50 scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-warm-950/40 via-warm-950/60 to-warm-950" />
        <div class="absolute inset-0 bg-gradient-to-r from-warm-950/60 via-transparent to-warm-950/60" />
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <!-- Logo -->
        <div
          class="mb-8 h-16 w-48 transition-all duration-1000"
          :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
        >
          <NuxtImg
            :src="brand.logo?.src"
            :alt="brand.name"
            class="size-full object-contain brightness-0 invert"
          />
        </div>

        <h1
          class="font-serif text-5xl font-light text-white md:text-6xl lg:text-7xl transition-all duration-1000 delay-100"
          :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
        >
          {{ brand.name }}
        </h1>

        <p
          class="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/70 transition-all duration-1000 delay-200"
          :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
        >
          {{ brand.products?.total }} carefully curated pieces
        </p>

        <!-- Scroll indicator -->
        <div
          class="absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-500"
          :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
        >
          <div class="flex flex-col items-center gap-3 text-white/50">
            <span class="text-xs uppercase tracking-widest">Discover</span>
            <div class="h-12 w-px bg-gradient-to-b from-white/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>

    <!-- Brand Story -->
    <section class="bg-background py-24">
      <div class="mx-auto max-w-4xl px-6">
        <div class="text-center">
          <span class="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            The Story
          </span>
          <h2 class="mt-4 font-serif text-3xl font-light text-foreground md:text-4xl">
            About {{ brand.name }}
          </h2>
          <p class="mt-8 text-lg font-light leading-relaxed text-muted-foreground">
            {{ brand.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Featured Products - Bento Grid -->
    <section v-if="brand.products?.items?.length" class="bg-warm-100 py-24">
      <div class="mx-auto max-w-7xl px-6">
        <div class="mb-16 text-center">
          <span class="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            The Collection
          </span>
          <h2 class="mt-4 font-serif text-3xl font-light text-foreground md:text-4xl">
            Featured Pieces
          </h2>
        </div>

        <!-- Bento Grid for first 4 products -->
        <div
          v-if="brand.products.items.length >= 4"
          class="grid gap-4 md:grid-cols-12 md:grid-rows-2"
        >
          <!-- Large featured product -->
          <div class="group md:col-span-7 md:row-span-2">
            <NuxtLink
              :to="brand.products.items[0].link?.path"
              class="relative block h-full min-h-[500px] overflow-hidden bg-white"
            >
              <NuxtImg
                :src="brand.products.items[0].variants?.[0]?.images?.[0]?.src"
                :alt="brand.products.items[0].name"
                class="size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-warm-950/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              
              <!-- Product Info -->
              <div class="absolute bottom-0 left-0 right-0 p-8 translate-y-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <h3 class="font-serif text-2xl font-light text-white">
                  {{ brand.products.items[0].name }}
                </h3>
                <p class="mt-2 text-lg text-white/80">
                  {{ formatPrice(brand.products.items[0].price) }}
                </p>
              </div>

              <!-- Quick view badge -->
              <div class="absolute right-6 top-6 bg-white px-4 py-2 text-xs font-medium uppercase tracking-widest opacity-0 transition-all group-hover:opacity-100">
                View Details
              </div>
            </NuxtLink>
          </div>

          <!-- Smaller products -->
          <template v-for="(product, index) in brand.products.items.slice(1, 4)" :key="product.key">
            <div class="group md:col-span-5" :class="index === 0 ? '' : ''">
              <NuxtLink
                :to="product.link?.path"
                class="relative block aspect-square overflow-hidden bg-white md:aspect-auto md:h-full"
              >
                <NuxtImg
                  :src="product.variants?.[0]?.images?.[0]?.src"
                  :alt="product.name"
                  class="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-warm-950/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                
                <!-- Product Info -->
                <div class="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 class="font-serif text-xl font-light text-white">
                    {{ product.name }}
                  </h3>
                  <p class="mt-1 text-white/80">
                    {{ formatPrice(product.price) }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- All Products Grid -->
    <section class="bg-background py-24">
      <div class="mx-auto max-w-7xl px-6">
        <div class="mb-12 flex items-end justify-between">
          <div>
            <span class="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Full Collection
            </span>
            <h2 class="mt-2 font-serif text-3xl font-light text-foreground">
              All Products
            </h2>
          </div>
          <p class="text-sm text-muted-foreground">
            {{ brand.products?.total }} items
          </p>
        </div>

        <!-- Product Grid -->
        <div class="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          <template v-for="product in brand.products?.items" :key="product.key">
            <ProductCard :product="product" />
          </template>
        </div>

        <!-- Empty state -->
        <div
          v-if="!brand.products?.items?.length"
          class="py-24 text-center"
        >
          <p class="text-muted-foreground">
            No products available at the moment.
          </p>
        </div>
      </div>
    </section>

    <!-- Brand Values -->
    <section class="bg-warm-950 py-24">
      <div class="mx-auto max-w-7xl px-6">
        <div class="grid gap-12 md:grid-cols-3">
          <div class="text-center">
            <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/20">
              <svg class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="font-serif text-xl font-light text-white">Quality Assured</h3>
            <p class="mt-3 text-sm text-white/60">
              Every piece meets our rigorous standards for materials and craftsmanship.
            </p>
          </div>
          
          <div class="text-center">
            <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/20">
              <svg class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="font-serif text-xl font-light text-white">Timeless Design</h3>
            <p class="mt-3 text-sm text-white/60">
              Created to transcend trends and bring lasting beauty to your space.
            </p>
          </div>
          
          <div class="text-center">
            <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/20">
              <svg class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="font-serif text-xl font-light text-white">Sustainably Made</h3>
            <p class="mt-3 text-sm text-white/60">
              Committed to responsible practices and environmental stewardship.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Back to Brands CTA -->
    <section class="bg-background py-16">
      <div class="mx-auto max-w-7xl px-6">
        <div class="flex items-center justify-center">
          <NuxtLink
            to="/brands"
            class="group inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg class="h-4 w-4 transition-transform group-hover:-translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span>Back to All Brands</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
