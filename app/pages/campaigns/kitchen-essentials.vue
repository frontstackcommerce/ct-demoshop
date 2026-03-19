<script setup lang="ts">
import client from '../../../.frontstack/generated-client'

defineI18nRoute({
  paths: {
    de: '/kampagnen/kuechen-essentials',
  },
})

// Fetch products under €100 (10000 cents)
const { data: products, status } = await useAsyncData('kitchen-products', async () => {
  const response = await client.listing('ProductSearch', {}, {
    query: {
      filter: [
        {
          type: 'range',
          field: 'price.amount',
          from: 100,
          to: 10000
        }
      ],
      sort: {
        field: 'price.amount',
        order: 'asc'
      },
      limit: 12
    }
  })
  return response.items || []
})

const isLoaded = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    isLoaded.value = true
  })
})

// Split products into different display groups
const heroProduct = computed(() => products.value?.[0])
const featuredProducts = computed(() => products.value?.slice(1, 4) || [])
const gridProducts = computed(() => products.value?.slice(4, 8) || [])
const carouselProducts = computed(() => products.value?.slice(8, 12) || [])
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Hero Section - Split Screen -->
    <section class="relative min-h-[90vh] grid lg:grid-cols-2">
      <!-- Left: Editorial Content -->
      <div class="flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-20 lg:py-0 order-2 lg:order-1">
        <div class="max-w-xl">
          <p 
            class="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-6 transition-all duration-700"
            :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          >
            {{ $t('campaign.kitchen.hero.label') }}
          </p>
          <h1 
            class="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6 transition-all duration-700 delay-100"
            :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
          >
            {{ $t('campaign.kitchen.hero.title') }}<br>
            <span class="italic text-primary">{{ $t('campaign.kitchen.hero.titleHighlight') }}</span><br>
            {{ $t('campaign.kitchen.hero.price') }}
          </h1>
          <p 
            class="text-muted-foreground text-lg lg:text-xl font-light leading-relaxed mb-10 transition-all duration-700 delay-200"
            :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
          >
            {{ $t('campaign.kitchen.hero.description') }}
          </p>
          <div 
            class="flex flex-wrap gap-4 transition-all duration-700 delay-300"
            :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
          >
            <a href="#products" class="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-sm tracking-wide uppercase hover:bg-foreground/90 transition-all">
              {{ $t('actions.shopTheEdit') }}
              <IconArrowDown class="size-4" />
            </a>
            <span class="self-center text-sm text-muted-foreground">
              {{ $t('campaign.kitchen.hero.piecesCurated', { count: products?.length || 0 }) }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- Right: Hero Product -->
      <div class="relative bg-shade min-h-[50vh] lg:min-h-full order-1 lg:order-2 overflow-hidden">
        <div v-if="heroProduct" class="absolute inset-0">
          <NuxtImg
            :src="heroProduct.variants?.[0]?.images?.[0]?.src"
            :alt="heroProduct.name"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-l lg:from-black/30" />
        </div>
        
        <!-- Floating Price Tag -->
        <div 
          v-if="heroProduct"
          class="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 bg-background/95 backdrop-blur-sm p-6 max-w-xs transition-all duration-700 delay-500"
          :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <p class="text-xs text-muted-foreground tracking-wider uppercase mb-2">{{ $t('product.featured') }}</p>
          <h3 class="font-serif text-xl mb-2">{{ heroProduct.name }}</h3>
          <p class="text-2xl font-medium text-primary">{{ formatPrice(heroProduct.price) }}</p>
          <NuxtLink :to="heroProduct.link?.path" class="inline-flex items-center gap-2 text-sm mt-4 hover:gap-3 transition-all">
            {{ $t('actions.viewProduct') }} <IconArrowRight class="size-4" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Value Proposition Strip -->
    <section class="bg-foreground text-background py-6">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="flex flex-wrap justify-center gap-8 lg:gap-16 text-sm">
          <div class="flex items-center gap-3">
            <IconTruck class="size-5 opacity-60" />
            <span>{{ $t('campaign.kitchen.valueProps.freeShipping') }}</span>
          </div>
          <div class="flex items-center gap-3">
            <IconPackage class="size-5 opacity-60" />
            <span>{{ $t('campaign.kitchen.valueProps.easyReturns') }}</span>
          </div>
          <div class="flex items-center gap-3">
            <IconShield class="size-5 opacity-60" />
            <span>{{ $t('campaign.kitchen.valueProps.warranty') }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Editorial Quote -->
    <section class="py-20 lg:py-28">
      <div class="mx-auto max-w-4xl px-6 lg:px-12 text-center">
        <p class="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-foreground/80 leading-relaxed">
          <i18n-t keypath="campaign.kitchen.quote.text" tag="span">
            <template #highlight>
              <span class="text-primary not-italic">{{ $t('campaign.kitchen.quote.highlight') }}</span>
            </template>
          </i18n-t>
        </p>
        <p class="mt-8 text-sm text-muted-foreground tracking-wider uppercase">{{ $t('campaign.kitchen.quote.attribution') }}</p>
      </div>
    </section>

    <!-- Featured Products - Asymmetric Bento Grid -->
    <section id="products" class="py-16 lg:py-24 bg-shade">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p class="text-primary text-xs tracking-[0.2em] uppercase font-medium mb-2">{{ $t('campaign.kitchen.featured.label') }}</p>
            <h2 class="font-serif text-3xl lg:text-4xl">{{ $t('campaign.kitchen.featured.title') }}</h2>
          </div>
          <p class="text-muted-foreground text-sm max-w-md">
            {{ $t('campaign.kitchen.featured.description') }}
          </p>
        </div>
        
        <!-- Bento Grid Layout -->
        <div class="grid grid-cols-12 gap-4 lg:gap-6">
          <!-- Large Feature (spans 8 cols) -->
          <div v-if="featuredProducts[0]" class="col-span-12 lg:col-span-8 row-span-2">
            <NuxtLink :to="featuredProducts[0].link?.path" class="group block relative h-full min-h-[500px] lg:min-h-[600px] bg-background overflow-hidden">
              <NuxtImg
                :src="featuredProducts[0].variants?.[0]?.images?.[0]?.src"
                :alt="featuredProducts[0].name"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
              <div class="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                <span class="inline-block bg-primary text-primary-foreground text-xs tracking-wider uppercase px-3 py-1 mb-4">
                  {{ $t('campaign.kitchen.featured.bestValue') }}
                </span>
                <h3 class="font-serif text-white text-3xl lg:text-4xl mb-2">{{ featuredProducts[0].name }}</h3>
                <p class="text-white/70 mb-4 max-w-md">{{ $t('campaign.kitchen.featured.productDescription') }}</p>
                <div class="flex items-center gap-4">
                  <span class="text-white text-2xl font-medium">{{ formatPrice(featuredProducts[0].price) }}</span>
                  <span class="text-white/60 text-sm">{{ $t('campaign.kitchen.featured.shopNow') }}</span>
                </div>
              </div>
            </NuxtLink>
          </div>
          
          <!-- Stacked Right Column -->
          <template v-for="(product, index) in featuredProducts.slice(1, 3)" :key="product.key">
            <div class="col-span-6 lg:col-span-4">
              <NuxtLink :to="product.link?.path" class="group block relative aspect-[4/5] bg-background overflow-hidden">
                <NuxtImg
                  :src="product.variants?.[0]?.images?.[0]?.src"
                  :alt="product.name"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div class="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 class="text-white font-medium mb-1 line-clamp-1">{{ product.name }}</h3>
                  <p class="text-white/80 text-lg font-medium">{{ formatPrice(product.price) }}</p>
                </div>
              </NuxtLink>
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- Story Section - Full Bleed Image with Overlay -->
    <section class="relative min-h-[70vh] flex items-center">
      <div class="absolute inset-0 bg-[url('https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Minimalist_Modern_Kitchen-1.1.jpeg')] bg-cover bg-center">
        <div class="absolute inset-0 bg-foreground/70" />
      </div>
      <div class="relative mx-auto max-w-7xl px-6 lg:px-12 py-20 lg:py-32">
        <div class="max-w-2xl text-background">
          <p class="text-background/60 text-xs tracking-[0.3em] uppercase mb-6">{{ $t('campaign.kitchen.story.label') }}</p>
          <h2 class="font-serif text-4xl lg:text-5xl mb-6 leading-tight">
            <i18n-t keypath="campaign.kitchen.story.title" tag="span">
              <template #highlight>
                <span class="italic">{{ $t('campaign.kitchen.story.highlight') }}</span>
              </template>
            </i18n-t>
          </h2>
          <p class="text-background/70 text-lg font-light leading-relaxed mb-8">
            {{ $t('campaign.kitchen.story.description') }}
          </p>
          <div class="flex flex-wrap gap-8 text-sm">
            <div>
              <p class="text-3xl font-serif text-primary mb-1">100+</p>
              <p class="text-background/60">{{ $t('campaign.kitchen.story.stats.products') }}</p>
            </div>
            <div>
              <p class="text-3xl font-serif text-primary mb-1">4.8</p>
              <p class="text-background/60">{{ $t('campaign.kitchen.story.stats.rating') }}</p>
            </div>
            <div>
              <p class="text-3xl font-serif text-primary mb-1">2yr</p>
              <p class="text-background/60">{{ $t('campaign.kitchen.story.stats.warranty') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Showcase - Horizontal Scroll on Mobile -->
    <section class="py-16 lg:py-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p class="text-primary text-xs tracking-[0.2em] uppercase font-medium mb-2">{{ $t('campaign.kitchen.showcase.label') }}</p>
            <h2 class="font-serif text-3xl lg:text-4xl">{{ $t('campaign.kitchen.showcase.title') }}</h2>
          </div>
          <NuxtLink to="/kitchen" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {{ $t('campaign.kitchen.showcase.viewAll') }}
          </NuxtLink>
        </div>
        
        <!-- Diagonal/Staggered Layout -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <template v-for="(product, index) in gridProducts" :key="product.key">
            <NuxtLink 
              :to="product.link?.path" 
              class="group block"
              :class="index % 2 === 1 ? 'lg:translate-y-12' : ''"
            >
              <div class="relative aspect-[3/4] bg-shade overflow-hidden mb-4">
                <NuxtImg
                  :src="product.variants?.[0]?.images?.[0]?.src"
                  :alt="product.name"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div>
                <p class="text-xs text-muted-foreground tracking-wider uppercase mb-1">{{ product.brand || 'CT Demo Shop' }}</p>
                <h3 class="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1">{{ product.name }}</h3>
                <p class="text-foreground font-medium">{{ formatPrice(product.price) }}</p>
              </div>
            </NuxtLink>
          </template>
        </div>
      </div>
    </section>

    <!-- Newsletter / CTA Section -->
    <section class="py-20 lg:py-28 bg-shade">
      <div class="mx-auto max-w-3xl px-6 lg:px-12 text-center">
        <p class="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-4">{{ $t('campaign.kitchen.newsletter.label') }}</p>
        <h2 class="font-serif text-4xl lg:text-5xl mb-6">
          {{ $t('campaign.kitchen.newsletter.title') }}
        </h2>
        <p class="text-muted-foreground text-lg font-light mb-10 max-w-xl mx-auto">
          {{ $t('campaign.kitchen.newsletter.description') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input 
            type="email" 
            :placeholder="$t('campaign.kitchen.newsletter.placeholder')"
            class="flex-1 h-14 px-6 bg-background border border-border focus:border-foreground focus:outline-none transition-colors"
          />
          <button class="h-14 px-8 bg-foreground text-background text-sm tracking-wide uppercase hover:bg-foreground/90 transition-colors">
            {{ $t('actions.subscribe') }}
          </button>
        </div>
        <p class="text-xs text-muted-foreground mt-4">
          {{ $t('campaign.kitchen.newsletter.disclaimer') }}
        </p>
      </div>
    </section>

    <!-- Final CTA Strip -->
    <section class="bg-primary text-primary-foreground py-8">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-lg font-light">
            {{ $t('campaign.kitchen.cta.text') }} <span class="font-medium">{{ $t('campaign.kitchen.cta.highlight') }}</span>
          </p>
          <NuxtLink to="/kitchen" class="inline-flex items-center gap-2 border border-primary-foreground/30 px-6 py-3 text-sm tracking-wide uppercase hover:bg-primary-foreground hover:text-primary transition-all">
            {{ $t('actions.shopNow') }}
            <IconArrowRight class="size-4" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
