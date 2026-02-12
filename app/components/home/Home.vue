<script setup lang="ts">
const { fullTree } = useShopMenu()

const images = [
  'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Ivory_Lounge_Chair-1.3.jpeg',
  'https://a.storyblok.com/f/282508/x/baaa9b88cd/vitra-bild.avif',
  'https://a.storyblok.com/f/282508/1536x1024/9eb7427a46/trivaro-hero.png',
  'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Rattan_Lounge_Chair-1.2.jpeg'
]

const categories = computed(() => {
  const childrenFlat = fullTree.value?.items?.flatMap((item) => item.children?.items ?? [])
  return [...(fullTree.value?.items?.slice(0, 4) ?? []), ...(childrenFlat?.slice(0, 4) ?? []).map((item, index) => ({
    ...item,
    image: { src: images[index] }
  }))]
})

const featuredProducts = [
  {
    image: 'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Traditional_L_Seater_Sofa-1.3.jpeg',
    title: 'The Lounge Collection',
    subtitle: 'Timeless comfort',
    link: '/traditional-l-seater-sofa'
  },
  {
    image: 'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Braided_Rug-1.2.jpeg',
    title: 'Artisan Textiles',
    subtitle: 'Handcrafted details',
    link: '/braided-rug'
  },
  {
    image: 'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Jute_Rug-1.3.jpeg',
    title: 'Natural Materials',
    subtitle: 'Sustainable luxury',
    link: '/jute-rug'
  },
]

// Kitchen promo images - using verified working images
const kitchenImages = {
  main: 'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Travel_Coffee_Mug-1.1.jpeg',
  secondary1: 'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Cocktail_Shaker-1.1.jpeg',
  secondary2: 'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Harvest_Plate-1.1.jpeg'
}

const isLoaded = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    isLoaded.value = true
  })
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section - Centered -->
    <section class="relative h-[100svh] min-h-[600px] max-h-[900px] overflow-hidden bg-foreground">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <NuxtImg 
          src="https://a.storyblok.com/f/282508/1536x1024/b44eabb6eb/furniture.png"
          :alt="$t('home.hero.imageAlt')" 
          class="h-full w-full object-cover"
          loading="eager"
        />
        <div class="absolute inset-0 bg-black/50" />
      </div>
      
      <!-- Hero Content - Centered both horizontally and vertically -->
      <div class="relative h-full flex items-center justify-center">
        <div class="w-full px-6 lg:px-12">
          <div class="max-w-3xl mx-auto text-center">
            <!-- Label -->
            <p 
              class="text-white/60 text-xs sm:text-sm tracking-[0.3em] uppercase mb-6 transition-all duration-700 ease-out"
              :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            >
              New Season 2025
            </p>
            
            <!-- Headline -->
            <h1 
              class="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6 transition-all duration-700 ease-out delay-100"
              :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            >
              {{ $t('home.hero.title') }}
            </h1>
            
            <!-- Description -->
            <p 
              class="text-white/70 text-base sm:text-lg lg:text-xl font-light max-w-xl mx-auto mb-10 leading-relaxed transition-all duration-700 ease-out delay-200"
              :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            >
              Curated pieces that transform spaces into sanctuaries of modern living.
            </p>
            
            <!-- CTA Button -->
            <div 
              class="transition-all duration-700 ease-out delay-300"
              :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            >
              <NuxtLink to="/new-arrivals">
                <button class="group inline-flex items-center gap-3 bg-white text-foreground px-8 py-4 text-sm tracking-wide uppercase hover:bg-white/90 transition-all duration-300">
                  {{ $t('home.hero.button') }}
                  <IconArrowRight class="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div 
        class="absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-500"
        :class="isLoaded ? 'opacity-100' : 'opacity-0'"
      >
        <div class="flex flex-col items-center gap-2">
          <span class="text-white/40 text-[10px] tracking-widest uppercase">Scroll</span>
          <div class="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>

    <!-- 🔥 PROMO BANNER - Kitchen Essentials Campaign -->
    <section class="relative overflow-hidden">
      <NuxtLink to="/campaigns/kitchen-essentials" class="group block">
        <div class="grid lg:grid-cols-2">
          <!-- Left: Content - Centered horizontally and vertically -->
          <div class="relative bg-primary flex items-center justify-center px-8 lg:px-16 py-16 lg:py-24 order-2 lg:order-1 min-h-[400px] lg:min-h-[500px]">
            <!-- Decorative Elements -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div class="relative z-10 max-w-lg text-center">
              <span class="inline-block bg-white/20 text-white text-xs tracking-widest uppercase px-4 py-2 mb-6">
                Limited Time
              </span>
              <h2 class="font-serif text-4xl lg:text-5xl xl:text-6xl text-white leading-[1.1] mb-4">
                Kitchen<br>
                <span class="italic">Essentials</span>
              </h2>
              <p class="text-white/80 text-xl lg:text-2xl font-light mb-6">
                Under <span class="font-serif text-3xl lg:text-4xl">€100</span>
              </p>
              <p class="text-white/60 font-light mb-8 max-w-sm mx-auto">
                Transform your culinary space without transforming your budget. 100+ pieces curated for you.
              </p>
              <span class="inline-flex items-center gap-3 bg-white text-primary px-8 py-4 text-sm tracking-wide uppercase group-hover:bg-white/90 transition-all duration-300">
                Shop the Edit
                <IconArrowRight class="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
          
          <!-- Right: Image Collage -->
          <div class="relative order-1 lg:order-2 h-[300px] lg:h-auto lg:min-h-[500px]">
            <div class="absolute inset-0 grid grid-cols-2 gap-1.5 p-1.5 bg-warm-200">
              <!-- Main large image (left column, full height) -->
              <div class="relative overflow-hidden bg-warm-300">
                <NuxtImg
                  :src="kitchenImages.main"
                  alt="Kitchen Essentials"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <!-- Right column with 2 stacked images -->
              <div class="grid grid-rows-2 gap-1.5">
                <div class="relative overflow-hidden bg-warm-300">
                  <NuxtImg
                    :src="kitchenImages.secondary1"
                    alt="Kitchen Item"
                    class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div class="relative overflow-hidden bg-warm-300">
                  <NuxtImg
                    :src="kitchenImages.secondary2"
                    alt="Kitchen Item"
                    class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
            <!-- Floating Price Badge -->
            <div class="absolute bottom-4 right-4 lg:bottom-8 lg:right-8 bg-white px-5 py-3 shadow-lg z-10">
              <p class="text-xs text-muted-foreground tracking-wider uppercase">Starting at</p>
              <p class="font-serif text-2xl text-foreground">€9.99</p>
            </div>
          </div>
        </div>
      </NuxtLink>
    </section>

    <!-- Editorial Quote -->
    <section class="py-20 lg:py-28 bg-background">
      <div class="mx-auto max-w-4xl px-6 lg:px-12 text-center">
        <p class="font-serif italic text-xl sm:text-2xl lg:text-3xl text-foreground/70 leading-relaxed">
          "We believe in the power of thoughtful design—pieces that honor craftsmanship, 
          embrace sustainability, and create spaces where life unfolds beautifully."
        </p>
      </div>
    </section>

    <!-- Categories Grid -->
    <section class="py-16 lg:py-24 bg-shade">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <!-- Section Header -->
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 lg:mb-14">
          <div>
            <p class="text-primary text-xs tracking-[0.2em] uppercase font-medium mb-2">Collections</p>
            <h2 class="font-serif text-3xl lg:text-4xl">{{ $t('home.categories.title') }}</h2>
          </div>
          <NuxtLink to="/categories" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
            View all →
          </NuxtLink>
        </div>
        
        <!-- Categories Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <template v-for="(item, index) in categories.slice(0, 8)" :key="item.key">
            <NuxtLink 
              :to="item.link?.path ?? ''" 
              class="group relative overflow-hidden bg-muted"
              :class="index === 0 ? 'col-span-2 row-span-2' : ''"
            >
              <div :class="index === 0 ? 'aspect-square' : 'aspect-[3/4]'">
                <NuxtImg 
                  v-if="item.image?.src"
                  :src="item.image?.src" 
                  :alt="item.name" 
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                <div class="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                  <h3 class="text-white font-medium" :class="index === 0 ? 'text-xl sm:text-2xl' : 'text-sm sm:text-base'">
                    {{ item.name }}
                  </h3>
                </div>
              </div>
            </NuxtLink>
          </template>
        </div>
      </div>
    </section>

    <!-- Featured Section -->
    <section class="py-20 lg:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <!-- Section Header -->
        <div class="mb-12 lg:mb-20">
          <p class="text-primary text-xs tracking-[0.2em] uppercase font-medium mb-2">Curated Selection</p>
          <h2 class="font-serif text-3xl lg:text-4xl">{{ $t('home.featured.loungeFurniture') }}</h2>
        </div>
        
        <!-- Main Feature -->
        <div class="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16 lg:mb-24">
          <NuxtLink :to="featuredProducts[0]?.link" class="group">
            <div class="relative aspect-[4/5] overflow-hidden bg-muted">
              <NuxtImg 
                :src="featuredProducts[0]?.image" 
                :alt="featuredProducts[0]?.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </div>
          </NuxtLink>
          <div class="flex flex-col justify-center">
            <p class="text-muted-foreground text-sm tracking-wider uppercase mb-4">01</p>
            <h3 class="font-serif text-3xl lg:text-4xl xl:text-5xl mb-6">{{ featuredProducts[0]?.title }}</h3>
            <p class="text-muted-foreground text-lg font-light leading-relaxed mb-8 max-w-md">
              Sink into unparalleled comfort with our signature lounge collection. 
              Each piece is crafted with meticulous attention to detail.
            </p>
            <NuxtLink :to="featuredProducts[0]?.link">
              <button class="group inline-flex items-center gap-2 border border-foreground text-foreground px-6 py-3 text-sm tracking-wide uppercase hover:bg-foreground hover:text-background transition-all duration-300">
                Explore
                <IconArrowRight class="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </NuxtLink>
          </div>
        </div>
        
        <!-- Secondary Features -->
        <div class="grid sm:grid-cols-2 gap-8 lg:gap-12">
          <template v-for="(product, index) in featuredProducts.slice(1)" :key="product.link">
            <NuxtLink :to="product.link" class="group">
              <div class="relative aspect-[4/3] overflow-hidden bg-muted mb-5">
                <NuxtImg 
                  :src="product.image" 
                  :alt="product.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <p class="text-muted-foreground text-sm tracking-wider uppercase mb-2">0{{ index + 2 }}</p>
              <h3 class="font-serif text-2xl lg:text-3xl mb-2 group-hover:text-primary transition-colors duration-300">
                {{ product.title }}
              </h3>
              <p class="text-muted-foreground font-light">{{ product.subtitle }}</p>
            </NuxtLink>
          </template>
        </div>
      </div>
    </section>

    <!-- Brand Values -->
    <section class="py-20 lg:py-28 bg-foreground text-background">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="grid lg:grid-cols-4 gap-10 lg:gap-8">
          <!-- Header -->
          <div>
            <p class="text-background/40 text-xs tracking-[0.2em] uppercase mb-2">Our Promise</p>
            <h2 class="font-serif text-2xl lg:text-3xl">Crafted with intention</h2>
          </div>
          
          <!-- Values -->
          <div class="lg:col-span-3 grid sm:grid-cols-3 gap-8 lg:gap-10">
            <div>
              <div class="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center mb-5">
                <IconLeaf class="size-4 text-background/60" />
              </div>
              <h3 class="font-medium mb-2">Sustainable Materials</h3>
              <p class="text-background/50 text-sm font-light leading-relaxed">
                Responsibly sourced materials that honor both craftsmanship and our planet.
              </p>
            </div>
            
            <div>
              <div class="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center mb-5">
                <IconHeart class="size-4 text-background/60" />
              </div>
              <h3 class="font-medium mb-2">Artisan Crafted</h3>
              <p class="text-background/50 text-sm font-light leading-relaxed">
                Made by skilled artisans who bring generations of expertise to every piece.
              </p>
            </div>
            
            <div>
              <div class="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center mb-5">
                <IconShield class="size-4 text-background/60" />
              </div>
              <h3 class="font-medium mb-2">Lifetime Quality</h3>
              <p class="text-background/50 text-sm font-light leading-relaxed">
                Built to last generations, with a commitment to timeless design.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- New Arrivals CTA -->
    <section class="py-24 lg:py-32">
      <div class="mx-auto max-w-3xl px-6 lg:px-12 text-center">
        <p class="text-primary text-xs tracking-[0.2em] uppercase font-medium mb-4">
          {{ $t('home.newArrivals.label') }}
        </p>
        <h2 class="font-serif text-4xl sm:text-5xl lg:text-6xl mb-6">
          {{ $t('home.newArrivals.title') }}
        </h2>
        <p class="text-muted-foreground text-lg font-light max-w-lg mx-auto mb-10">
          Discover our latest arrivals—thoughtfully designed pieces that bring warmth to every space.
        </p>
        <NuxtLink to="/new-arrivals">
          <button class="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 text-sm tracking-wide uppercase hover:bg-foreground/90 transition-colors duration-300">
            {{ $t('home.newArrivals.button') }}
          </button>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
