<script setup lang="ts">
const props = defineProps<{
  campaign: any
  products: any[]
}>()

const isLoaded = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    isLoaded.value = true
  })
})

const heroProduct = computed(() => props.products?.[0])
const featuredProducts = computed(() => props.products?.slice(1, 4) || [])
const gridProducts = computed(() => props.products?.slice(4, 8) || [])

const iconMap: Record<string, string> = {
  truck: 'truck',
  package: 'package',
  shield: 'shield',
}
</script>

<template>
  <div class="bg-background min-h-screen">
    <!-- Hero Section - Split Screen -->
    <section class="relative grid min-h-[90vh] lg:grid-cols-2">
      <!-- Left: Editorial Content -->
      <div
        class="order-2 flex flex-col justify-center px-8 py-20 lg:order-1 lg:px-16 lg:py-0 xl:px-24"
      >
        <div class="max-w-xl">
          <p
            class="text-primary mb-6 text-xs font-medium tracking-[0.3em] uppercase transition-all duration-700"
            :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
          >
            {{ $t('campaign.kitchen.hero.label') }}
          </p>
          <h1
            class="mb-6 font-serif text-5xl leading-[1.05] transition-all delay-100 duration-700 sm:text-6xl lg:text-7xl"
            :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
          >
            {{ $t('campaign.kitchen.hero.title') }}<br />
            <span class="text-primary italic">{{
              $t('campaign.kitchen.hero.title-highlight')
            }}</span
            ><br />
            {{ $t('campaign.kitchen.hero.price') }}
          </h1>
          <p
            class="text-muted-foreground mb-10 text-lg leading-relaxed font-light transition-all delay-200 duration-700 lg:text-xl"
            :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
          >
            {{ $t('campaign.kitchen.hero.description') }}
          </p>
          <div
            class="flex flex-wrap gap-4 transition-all delay-300 duration-700"
            :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
          >
            <a
              href="#products"
              class="bg-foreground text-background hover:bg-foreground/90 inline-flex items-center gap-3 px-8 py-4 text-sm tracking-wide uppercase transition-all"
            >
              {{ $t('actions.shop-the-edit') }}
              <IconArrowDown class="size-4" />
            </a>
            <span class="text-muted-foreground self-center text-sm">
              {{ $t('campaign.kitchen.hero.pieces-curated', { count: products?.length || 0 }) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Right: Hero Product -->
      <div class="bg-shade relative order-1 min-h-[50vh] overflow-hidden lg:order-2 lg:min-h-full">
        <div v-if="heroProduct" class="absolute inset-0">
          <NuxtImg
            :src="heroProduct.variants?.[0]?.images?.[0]?.src"
            :alt="heroProduct.name"
            class="h-full w-full object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-l lg:from-black/30"
          />
        </div>

        <!-- Floating Price Tag -->
        <div
          v-if="heroProduct"
          class="bg-background/95 absolute bottom-8 left-8 max-w-xs p-6 backdrop-blur-sm transition-all delay-500 duration-700 lg:bottom-12 lg:left-12"
          :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
        >
          <p class="text-muted-foreground mb-2 text-xs tracking-wider uppercase">
            {{ $t('product.featured') }}
          </p>
          <h3 class="mb-2 font-serif text-xl">{{ heroProduct.name }}</h3>
          <p class="text-primary text-2xl font-medium">{{ formatPrice(heroProduct.price) }}</p>
          <NuxtLink
            :to="heroProduct.link?.path"
            class="mt-4 inline-flex items-center gap-2 text-sm transition-all hover:gap-3"
          >
            {{ $t('actions.view-product') }} <IconArrowRight class="size-4" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Value Proposition Strip -->
    <section class="bg-foreground text-background py-6">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="flex flex-wrap justify-center gap-8 text-sm lg:gap-16">
          <div
            v-for="(prop, index) in campaign.data.valueProps"
            :key="index"
            class="flex items-center gap-3"
          >
            <IconTruck v-if="iconMap[prop.icon] === 'truck'" class="size-5 opacity-60" />
            <IconPackage v-if="iconMap[prop.icon] === 'package'" class="size-5 opacity-60" />
            <IconShield v-if="iconMap[prop.icon] === 'shield'" class="size-5 opacity-60" />
            <span v-if="iconMap[prop.icon] === 'truck'">{{
              $t('campaign.kitchen.value-props.free-shipping')
            }}</span>
            <span v-if="iconMap[prop.icon] === 'package'">{{
              $t('campaign.kitchen.value-props.easy-returns')
            }}</span>
            <span v-if="iconMap[prop.icon] === 'shield'">{{
              $t('campaign.kitchen.value-props.warranty')
            }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Editorial Quote -->
    <section class="py-20 lg:py-28">
      <div class="mx-auto max-w-4xl px-6 text-center lg:px-12">
        <p
          class="text-foreground/80 font-serif text-2xl leading-relaxed italic sm:text-3xl lg:text-4xl"
        >
          <i18n-t keypath="campaign.kitchen.quote.text" tag="span">
            <template #highlight>
              <span class="text-primary not-italic">{{
                $t('campaign.kitchen.quote.highlight')
              }}</span>
            </template>
          </i18n-t>
        </p>
        <p class="text-muted-foreground mt-8 text-sm tracking-wider uppercase">
          {{ $t('campaign.kitchen.quote.attribution') }}
        </p>
      </div>
    </section>

    <!-- Featured Products - Asymmetric Bento Grid -->
    <section id="products" class="bg-shade py-16 lg:py-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-primary mb-2 text-xs font-medium tracking-[0.2em] uppercase">
              {{ $t('campaign.kitchen.featured.label') }}
            </p>
            <h2 class="font-serif text-3xl lg:text-4xl">
              {{ $t('campaign.kitchen.featured.title') }}
            </h2>
          </div>
          <p class="text-muted-foreground max-w-md text-sm">
            {{ $t('campaign.kitchen.featured.description') }}
          </p>
        </div>

        <!-- Bento Grid Layout -->
        <div class="grid grid-cols-12 gap-4 lg:gap-6">
          <!-- Large Feature (spans 8 cols) -->
          <div v-if="featuredProducts[0]" class="col-span-12 row-span-2 lg:col-span-8">
            <NuxtLink
              :to="featuredProducts[0].link?.path"
              class="group bg-background relative block h-full min-h-[500px] overflow-hidden lg:min-h-[600px]"
            >
              <NuxtImg
                :src="featuredProducts[0].variants?.[0]?.images?.[0]?.src"
                :alt="featuredProducts[0].name"
                class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
              <div class="absolute right-0 bottom-0 left-0 p-8 lg:p-12">
                <span
                  class="bg-primary text-primary-foreground mb-4 inline-block px-3 py-1 text-xs tracking-wider uppercase"
                >
                  {{ $t('campaign.kitchen.featured.best-value') }}
                </span>
                <h3 class="mb-2 font-serif text-3xl text-white lg:text-4xl">
                  {{ featuredProducts[0].name }}
                </h3>
                <p class="mb-4 max-w-md text-white/70">
                  {{ $t('campaign.kitchen.featured.product-description') }}
                </p>
                <div class="flex items-center gap-4">
                  <span class="text-2xl font-medium text-white">{{
                    formatPrice(featuredProducts[0].price)
                  }}</span>
                  <span class="text-sm text-white/60">{{
                    $t('campaign.kitchen.featured.shop-now')
                  }}</span>
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- Stacked Right Column -->
          <template v-for="product in featuredProducts.slice(1, 3)" :key="product.key">
            <div class="col-span-6 lg:col-span-4">
              <NuxtLink
                :to="product.link?.path"
                class="group bg-background relative block aspect-[4/5] overflow-hidden"
              >
                <NuxtImg
                  :src="product.variants?.[0]?.images?.[0]?.src"
                  :alt="product.name"
                  class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div
                  class="absolute right-0 bottom-0 left-0 translate-y-2 p-5 transition-transform duration-500 group-hover:translate-y-0"
                >
                  <h3 class="mb-1 line-clamp-1 font-medium text-white">{{ product.name }}</h3>
                  <p class="text-lg font-medium text-white/80">{{ formatPrice(product.price) }}</p>
                </div>
              </NuxtLink>
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- Story Section - Full Bleed Image with Overlay -->
    <section class="relative flex min-h-[70vh] items-center">
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url('${campaign.data.storyBackgroundImage}')` }"
      >
        <div class="bg-foreground/70 absolute inset-0" />
      </div>
      <div class="relative mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-32">
        <div class="text-background max-w-2xl">
          <p class="text-background/60 mb-6 text-xs tracking-[0.3em] uppercase">
            {{ $t('campaign.kitchen.story.label') }}
          </p>
          <h2 class="mb-6 font-serif text-4xl leading-tight lg:text-5xl">
            <i18n-t keypath="campaign.kitchen.story.title" tag="span">
              <template #highlight>
                <span class="italic">{{ $t('campaign.kitchen.story.highlight') }}</span>
              </template>
            </i18n-t>
          </h2>
          <p class="text-background/70 mb-8 text-lg leading-relaxed font-light">
            {{ $t('campaign.kitchen.story.description') }}
          </p>
          <div class="flex flex-wrap gap-8 text-sm">
            <div v-for="(stat, index) in campaign.data.storyStats" :key="index">
              <p class="text-primary mb-1 font-serif text-3xl">{{ stat.value }}</p>
              <p v-if="index === 0" class="text-background/60">
                {{ $t('campaign.kitchen.story.stats.products') }}
              </p>
              <p v-if="index === 1" class="text-background/60">
                {{ $t('campaign.kitchen.story.stats.rating') }}
              </p>
              <p v-if="index === 2" class="text-background/60">
                {{ $t('campaign.kitchen.story.stats.warranty') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Showcase - Staggered Grid -->
    <section class="py-16 lg:py-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-primary mb-2 text-xs font-medium tracking-[0.2em] uppercase">
              {{ $t('campaign.kitchen.showcase.label') }}
            </p>
            <h2 class="font-serif text-3xl lg:text-4xl">
              {{ $t('campaign.kitchen.showcase.title') }}
            </h2>
          </div>
          <NuxtLink
            :to="campaign.data.categoryLink"
            class="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            {{ $t('campaign.kitchen.showcase.view-all') }}
          </NuxtLink>
        </div>

        <!-- Diagonal/Staggered Layout -->
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          <template v-for="(product, index) in gridProducts" :key="product.key">
            <NuxtLink
              :to="product.link?.path"
              class="group block"
              :class="index % 2 === 1 ? 'lg:translate-y-12' : ''"
            >
              <div class="bg-shade relative mb-4 aspect-[3/4] overflow-hidden">
                <NuxtImg
                  :src="product.variants?.[0]?.images?.[0]?.src"
                  :alt="product.name"
                  class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <!-- Quick Add Overlay -->
                <div
                  class="bg-foreground/0 group-hover:bg-foreground/10 absolute inset-0 transition-colors duration-300"
                />
                <button
                  class="bg-background/95 absolute right-4 bottom-4 left-4 translate-y-2 py-3 text-sm font-medium opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  {{ $t('actions.quick-view') }}
                </button>
              </div>
              <div>
                <p class="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                  {{ product.brand || 'CT Demo Shop' }}
                </p>
                <h3
                  class="text-foreground group-hover:text-primary mb-1 line-clamp-1 font-medium transition-colors"
                >
                  {{ product.name }}
                </h3>
                <p class="text-foreground font-medium">{{ formatPrice(product.price) }}</p>
              </div>
            </NuxtLink>
          </template>
        </div>
      </div>
    </section>

    <!-- Newsletter / CTA Section -->
    <section class="bg-shade py-20 lg:py-28">
      <div class="mx-auto max-w-3xl px-6 text-center lg:px-12">
        <p class="text-primary mb-4 text-xs font-medium tracking-[0.3em] uppercase">
          {{ $t('campaign.kitchen.newsletter.label') }}
        </p>
        <h2 class="mb-6 font-serif text-4xl lg:text-5xl">
          {{ $t('campaign.kitchen.newsletter.title') }}
        </h2>
        <p class="text-muted-foreground mx-auto mb-10 max-w-xl text-lg font-light">
          {{ $t('campaign.kitchen.newsletter.description') }}
        </p>
        <div class="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            :placeholder="$t('campaign.kitchen.newsletter.placeholder')"
            class="bg-background border-border focus:border-foreground h-14 flex-1 border px-6 transition-colors focus:outline-none"
          />
          <button
            class="bg-foreground text-background hover:bg-foreground/90 h-14 px-8 text-sm tracking-wide uppercase transition-colors"
          >
            {{ $t('actions.subscribe') }}
          </button>
        </div>
        <p class="text-muted-foreground mt-4 text-xs">
          {{ $t('campaign.kitchen.newsletter.disclaimer') }}
        </p>
      </div>
    </section>

    <!-- Final CTA Strip -->
    <section class="bg-primary text-primary-foreground py-8">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p class="text-lg font-light">
            {{ $t('campaign.kitchen.cta.text') }}
            <span class="font-medium">{{ $t('campaign.kitchen.cta.highlight') }}</span>
          </p>
          <NuxtLink
            :to="campaign.data.categoryLink"
            class="border-primary-foreground/30 hover:bg-primary-foreground hover:text-primary inline-flex items-center gap-2 border px-6 py-3 text-sm tracking-wide uppercase transition-all"
          >
            {{ $t('actions.shop-now') }}
            <IconArrowRight class="size-4" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
