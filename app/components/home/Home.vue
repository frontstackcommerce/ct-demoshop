<script setup lang="ts">
const { t } = useI18n()
const { fullTree } = useShopMenu()

const images = [
  'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Ivory_Lounge_Chair-1.3.jpeg',
  'https://a.storyblok.com/f/282508/x/baaa9b88cd/vitra-bild.avif',
  'https://a.storyblok.com/f/282508/1536x1024/9eb7427a46/trivaro-hero.png',
  'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Rattan_Lounge_Chair-1.2.jpeg',
]

const categories = computed(() => {
  const childrenFlat = fullTree.value?.items?.flatMap((item) => item.children?.items ?? [])
  return [
    ...(fullTree.value?.items?.slice(0, 4) ?? []),
    ...(childrenFlat?.slice(0, 4) ?? []).map((item, index) => ({
      ...item,
      image: { src: images[index] },
    })),
  ]
})

const featuredProducts = computed(() => [
  {
    image:
      'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Traditional_L_Seater_Sofa-1.3.jpeg',
    title: t('home.featured.lounge-furniture'),
    subtitle: t('home.featured.artisan-subtitle'),
    link: '/traditional-l-seater-sofa',
  },
  {
    image:
      'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Braided_Rug-1.2.jpeg',
    title: t('home.featured.artisan-textiles'),
    subtitle: t('home.featured.artisan-subtitle'),
    link: '/braided-rug',
  },
  {
    image:
      'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Jute_Rug-1.3.jpeg',
    title: t('home.featured.natural-materials'),
    subtitle: t('home.featured.natural-subtitle'),
    link: '/jute-rug',
  },
])

// Kitchen promo images - using verified working images
const kitchenImages = {
  main: 'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Travel_Coffee_Mug-1.1.jpeg',
  secondary1:
    'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Cocktail_Shaker-1.1.jpeg',
  secondary2:
    'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Harvest_Plate-1.1.jpeg',
}

// Bedroom promo images
const bedroomImages = {
  main: 'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Opal_King_Bed-1.1.jpeg',
  secondary:
    'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Modern_Upholstered_Queen_Bed-1.1.jpeg',
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
    <section class="bg-foreground relative h-[100svh] max-h-[900px] min-h-[600px] overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <NuxtImg
          src="https://a.storyblok.com/f/282508/1536x1024/b44eabb6eb/furniture.png"
          :alt="$t('home.hero.image-alt')"
          class="h-full w-full object-cover"
          loading="eager"
        />
        <div class="absolute inset-0 bg-black/50" />
      </div>

      <!-- Hero Content - Centered both horizontally and vertically -->
      <div class="relative flex h-full items-center justify-center">
        <div class="w-full px-6 lg:px-12">
          <div class="mx-auto max-w-3xl text-center">
            <!-- Label -->
            <p
              class="mb-6 text-xs tracking-[0.3em] text-white/60 uppercase transition-all duration-700 ease-out sm:text-sm"
              :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
            >
              {{ $t('home.hero.label') }}
            </p>

            <!-- Headline -->
            <h1
              class="mb-6 font-serif text-4xl leading-[1.1] text-white transition-all delay-100 duration-700 ease-out sm:text-5xl md:text-6xl lg:text-7xl"
              :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
            >
              {{ $t('home.hero.title') }}
            </h1>

            <!-- Description -->
            <p
              class="mx-auto mb-10 max-w-xl text-base leading-relaxed font-light text-white/70 transition-all delay-200 duration-700 ease-out sm:text-lg lg:text-xl"
              :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
            >
              {{ $t('home.hero.description') }}
            </p>

            <!-- CTA Button -->
            <div
              class="transition-all delay-300 duration-700 ease-out"
              :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
            >
              <NuxtLink to="/new-arrivals">
                <button
                  class="group text-foreground inline-flex items-center gap-3 bg-white px-8 py-4 text-sm tracking-wide uppercase transition-all duration-300 hover:bg-white/90"
                >
                  {{ $t('home.hero.button') }}
                  <IconArrowRight
                    class="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div
        class="absolute bottom-8 left-1/2 -translate-x-1/2 transition-all delay-500 duration-700"
        :class="isLoaded ? 'opacity-100' : 'opacity-0'"
      >
        <div class="flex flex-col items-center gap-2">
          <span class="text-[10px] tracking-widest text-white/40 uppercase">{{
            $t('home.hero.scroll')
          }}</span>
          <div class="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>

    <!-- 🔥 PROMO BANNER - Kitchen Essentials Campaign -->
    <section class="relative overflow-hidden">
      <NuxtLink to="/campaigns/kitchen-essentials" class="group block">
        <div class="grid lg:grid-cols-2">
          <!-- Left: Content - Centered horizontally and vertically -->
          <div
            class="bg-primary relative order-2 flex min-h-[400px] items-center justify-center px-8 py-16 lg:order-1 lg:min-h-[500px] lg:px-16 lg:py-24"
          >
            <!-- Decorative Elements -->
            <div
              class="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5"
            />
            <div
              class="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/5"
            />

            <div class="relative z-10 max-w-lg text-center">
              <span
                class="mb-6 inline-block bg-white/20 px-4 py-2 text-xs tracking-widest text-white uppercase"
              >
                {{ $t('home.promo.label') }}
              </span>
              <h2 class="mb-4 font-serif text-4xl leading-[1.1] text-white lg:text-5xl xl:text-6xl">
                {{ $t('home.promo.title') }}<br />
                <span class="italic">{{ $t('home.promo.title-highlight') }}</span>
              </h2>
              <p class="mb-6 text-xl font-light text-white/80 lg:text-2xl">
                {{ $t('home.promo.price') }}
                <span class="font-serif text-3xl lg:text-4xl">€100</span>
              </p>
              <p class="mx-auto mb-8 max-w-sm font-light text-white/60">
                {{ $t('home.promo.description', { count: '100' }) }}
              </p>
              <span
                class="text-primary inline-flex items-center gap-3 bg-white px-8 py-4 text-sm tracking-wide uppercase transition-all duration-300 group-hover:bg-white/90"
              >
                {{ $t('actions.shop-the-edit') }}
                <IconArrowRight
                  class="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </div>
          </div>

          <!-- Right: Image Collage -->
          <div class="relative order-1 h-[300px] lg:order-2 lg:h-auto lg:min-h-[500px]">
            <div class="bg-warm-200 absolute inset-0 grid grid-cols-2 gap-1.5 p-1.5">
              <!-- Main large image (left column, full height) -->
              <div class="bg-warm-300 relative overflow-hidden">
                <NuxtImg
                  :src="kitchenImages.main"
                  alt="Kitchen Essentials"
                  class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <!-- Right column with 2 stacked images -->
              <div class="grid grid-rows-2 gap-1.5">
                <div class="bg-warm-300 relative overflow-hidden">
                  <NuxtImg
                    :src="kitchenImages.secondary1"
                    alt="Kitchen Item"
                    class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div class="bg-warm-300 relative overflow-hidden">
                  <NuxtImg
                    :src="kitchenImages.secondary2"
                    alt="Kitchen Item"
                    class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
            <!-- Floating Price Badge -->
            <div
              class="absolute right-4 bottom-4 z-10 bg-white px-5 py-3 shadow-lg lg:right-8 lg:bottom-8"
            >
              <p class="text-muted-foreground text-xs tracking-wider uppercase">
                {{ $t('home.promo.starting-at') }}
              </p>
              <p class="text-foreground font-serif text-2xl">€9.99</p>
            </div>
          </div>
        </div>
      </NuxtLink>
    </section>

    <!-- Editorial Quote -->
    <section class="bg-background py-20 lg:py-28">
      <div class="mx-auto max-w-4xl px-6 text-center lg:px-12">
        <p
          class="text-foreground/70 font-serif text-xl leading-relaxed italic sm:text-2xl lg:text-3xl"
        >
          {{ $t('home.quote') }}
        </p>
      </div>
    </section>

    <!-- Categories Grid -->
    <section class="bg-shade py-16 lg:py-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <!-- Section Header -->
        <div class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-14">
          <div>
            <p class="text-primary mb-2 text-xs font-medium tracking-[0.2em] uppercase">
              {{ $t('home.categories.label') }}
            </p>
            <h2 class="font-serif text-3xl lg:text-4xl">{{ $t('home.categories.title') }}</h2>
          </div>
          <NuxtLink
            to="/categories"
            class="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            {{ $t('actions.view-all') }}
          </NuxtLink>
        </div>

        <!-- Categories Grid -->
        <div class="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          <template v-for="(item, index) in categories.slice(0, 8)" :key="item.key">
            <NuxtLink
              :to="item.link?.path ?? ''"
              class="group bg-muted relative overflow-hidden"
              :class="index === 0 ? 'col-span-2 row-span-2' : ''"
            >
              <div :class="index === 0 ? 'aspect-square' : 'aspect-[3/4]'">
                <NuxtImg
                  v-if="item.image?.src"
                  :src="item.image?.src"
                  :alt="item.name"
                  class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"
                />
                <div class="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                  <h3
                    class="font-medium text-white"
                    :class="index === 0 ? 'text-xl sm:text-2xl' : 'text-sm sm:text-base'"
                  >
                    {{ item.name }}
                  </h3>
                </div>
              </div>
            </NuxtLink>
          </template>
        </div>
      </div>
    </section>

    <!-- 🛏️ PROMO BANNER - Bedroom Sanctuary Campaign -->
    <section class="relative overflow-hidden">
      <NuxtLink to="/campaigns/bedroom-sanctuary" class="group block">
        <div class="relative min-h-[600px] lg:min-h-[700px]">
          <!-- Full-width Background Image -->
          <div class="absolute inset-0">
            <NuxtImg
              :src="bedroomImages.main"
              alt="Bedroom Sanctuary"
              class="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div
              class="from-warm-950/90 via-warm-950/70 to-warm-950/40 absolute inset-0 bg-gradient-to-r"
            />
            <div
              class="from-warm-950/60 to-warm-950/30 absolute inset-0 bg-gradient-to-t via-transparent"
            />
          </div>

          <!-- Content -->
          <div class="relative flex h-full min-h-[600px] items-center lg:min-h-[700px]">
            <div class="mx-auto w-full max-w-7xl px-6 lg:px-12">
              <div class="max-w-xl">
                <!-- Badge -->
                <div
                  class="mb-8 inline-flex items-center gap-2 border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
                >
                  <IconMoon class="text-primary size-4" />
                  <span class="text-xs tracking-[0.2em] text-white/80 uppercase"
                    >The Art of Rest</span
                  >
                </div>

                <!-- Headline -->
                <h2
                  class="mb-6 font-serif text-5xl leading-[1.05] text-white lg:text-6xl xl:text-7xl"
                >
                  Your<br />
                  <span class="text-primary italic">Sanctuary</span><br />
                  Awaits
                </h2>

                <!-- Description -->
                <p
                  class="mb-8 max-w-md text-lg leading-relaxed font-light text-white/70 lg:text-xl"
                >
                  Discover beds that transform nights into journeys. Handcrafted luxury meets the
                  science of perfect sleep.
                </p>

                <!-- Trust Badges -->
                <div class="mb-10 flex flex-wrap gap-6 text-sm text-white/50">
                  <div class="flex items-center gap-2">
                    <IconShield class="size-4" />
                    <span>10-Year Warranty</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <IconTruck class="size-4" />
                    <span>White Glove Delivery</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <IconRefreshCw class="size-4" />
                    <span>100-Night Trial</span>
                  </div>
                </div>

                <!-- CTA -->
                <span
                  class="text-warm-950 group-hover:bg-primary inline-flex items-center gap-3 bg-white px-8 py-4 text-sm tracking-[0.15em] uppercase transition-all duration-500 group-hover:text-white"
                >
                  Explore the Collection
                  <IconArrowRight
                    class="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </div>
          </div>

          <!-- Floating Product Card - Desktop Only -->
          <div
            class="absolute right-12 bottom-12 hidden w-72 overflow-hidden bg-white shadow-2xl transition-transform duration-500 group-hover:translate-y-[-8px] lg:block xl:right-24"
          >
            <div class="aspect-[4/3] overflow-hidden">
              <NuxtImg
                :src="bedroomImages.secondary"
                alt="Featured Bed"
                class="h-full w-full object-cover"
              />
            </div>
            <div class="p-5">
              <p class="text-muted-foreground mb-1 text-xs tracking-wider uppercase">Featured</p>
              <h3 class="mb-2 font-serif text-lg">Modern Upholstered Bed</h3>
              <div class="flex items-center justify-between">
                <span class="font-medium">From €2,599</span>
                <span class="text-primary text-xs font-medium">View →</span>
              </div>
            </div>
          </div>

          <!-- Side Stats - Desktop Only -->
          <div
            class="absolute bottom-12 left-12 hidden flex-col gap-4 text-sm text-white/60 lg:flex"
          >
            <div class="flex items-center gap-3">
              <div class="flex">
                <IconStar class="fill-primary text-primary size-4" />
                <IconStar class="fill-primary text-primary size-4" />
                <IconStar class="fill-primary text-primary size-4" />
                <IconStar class="fill-primary text-primary size-4" />
                <IconStar class="fill-primary text-primary size-4" />
              </div>
              <span>4.9/5 from 2,847 reviews</span>
            </div>
          </div>
        </div>
      </NuxtLink>
    </section>

    <!-- Featured Section -->
    <section class="py-20 lg:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <!-- Section Header -->
        <div class="mb-12 lg:mb-20">
          <p class="text-primary mb-2 text-xs font-medium tracking-[0.2em] uppercase">
            {{ $t('home.featured.label') }}
          </p>
          <h2 class="font-serif text-3xl lg:text-4xl">
            {{ $t('home.featured.lounge-furniture') }}
          </h2>
        </div>

        <!-- Main Feature -->
        <div class="mb-16 grid gap-8 lg:mb-24 lg:grid-cols-2 lg:gap-16">
          <NuxtLink :to="featuredProducts[0]?.link" class="group">
            <div class="bg-muted relative aspect-[4/5] overflow-hidden">
              <NuxtImg
                :src="featuredProducts[0]?.image"
                :alt="featuredProducts[0]?.title"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </NuxtLink>
          <div class="flex flex-col justify-center">
            <p class="text-muted-foreground mb-4 text-sm tracking-wider uppercase">01</p>
            <h3 class="mb-6 font-serif text-3xl lg:text-4xl xl:text-5xl">
              {{ featuredProducts[0]?.title }}
            </h3>
            <p class="text-muted-foreground mb-8 max-w-md text-lg leading-relaxed font-light">
              {{ $t('home.featured.lounge-description') }}
            </p>
            <NuxtLink :to="featuredProducts[0]?.link">
              <button
                class="group border-foreground text-foreground hover:bg-foreground hover:text-background inline-flex items-center gap-2 border px-6 py-3 text-sm tracking-wide uppercase transition-all duration-300"
              >
                {{ $t('actions.explore') }}
                <IconArrowRight
                  class="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </NuxtLink>
          </div>
        </div>

        <!-- Secondary Features -->
        <div class="grid gap-8 sm:grid-cols-2 lg:gap-12">
          <template v-for="(product, index) in featuredProducts.slice(1)" :key="product.link">
            <NuxtLink :to="product.link" class="group">
              <div class="bg-muted relative mb-5 aspect-[4/3] overflow-hidden">
                <NuxtImg
                  :src="product.image"
                  :alt="product.title"
                  class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p class="text-muted-foreground mb-2 text-sm tracking-wider uppercase">
                0{{ index + 2 }}
              </p>
              <h3
                class="group-hover:text-primary mb-2 font-serif text-2xl transition-colors duration-300 lg:text-3xl"
              >
                {{ product.title }}
              </h3>
              <p class="text-muted-foreground font-light">{{ product.subtitle }}</p>
            </NuxtLink>
          </template>
        </div>
      </div>
    </section>

    <!-- Brand Values -->
    <section class="bg-foreground text-background py-20 lg:py-28">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="grid gap-10 lg:grid-cols-4 lg:gap-8">
          <!-- Header -->
          <div>
            <p class="text-background/40 mb-2 text-xs tracking-[0.2em] uppercase">
              {{ $t('home.values.label') }}
            </p>
            <h2 class="font-serif text-2xl lg:text-3xl">{{ $t('home.values.title') }}</h2>
          </div>

          <!-- Values -->
          <div class="grid gap-8 sm:grid-cols-3 lg:col-span-3 lg:gap-10">
            <div>
              <div
                class="border-background/20 mb-5 flex h-10 w-10 items-center justify-center rounded-full border"
              >
                <IconLeaf class="text-background/60 size-4" />
              </div>
              <h3 class="mb-2 font-medium">{{ $t('home.values.sustainable.title') }}</h3>
              <p class="text-background/50 text-sm leading-relaxed font-light">
                {{ $t('home.values.sustainable.description') }}
              </p>
            </div>

            <div>
              <div
                class="border-background/20 mb-5 flex h-10 w-10 items-center justify-center rounded-full border"
              >
                <IconHeart class="text-background/60 size-4" />
              </div>
              <h3 class="mb-2 font-medium">{{ $t('home.values.artisan.title') }}</h3>
              <p class="text-background/50 text-sm leading-relaxed font-light">
                {{ $t('home.values.artisan.description') }}
              </p>
            </div>

            <div>
              <div
                class="border-background/20 mb-5 flex h-10 w-10 items-center justify-center rounded-full border"
              >
                <IconShield class="text-background/60 size-4" />
              </div>
              <h3 class="mb-2 font-medium">{{ $t('home.values.quality.title') }}</h3>
              <p class="text-background/50 text-sm leading-relaxed font-light">
                {{ $t('home.values.quality.description') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- New Arrivals CTA -->
    <section class="py-24 lg:py-32">
      <div class="mx-auto max-w-3xl px-6 text-center lg:px-12">
        <p class="text-primary mb-4 text-xs font-medium tracking-[0.2em] uppercase">
          {{ $t('home.new-arrivals.label') }}
        </p>
        <h2 class="mb-6 font-serif text-4xl sm:text-5xl lg:text-6xl">
          {{ $t('home.new-arrivals.title') }}
        </h2>
        <p class="text-muted-foreground mx-auto mb-10 max-w-lg text-lg font-light">
          {{ $t('home.new-arrivals.description') }}
        </p>
        <NuxtLink to="/new-arrivals">
          <button
            class="bg-foreground text-background hover:bg-foreground/90 inline-flex items-center gap-2 px-8 py-4 text-sm tracking-wide uppercase transition-colors duration-300"
          >
            {{ $t('home.new-arrivals.button') }}
          </button>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
