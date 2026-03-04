<script setup lang="ts">
import { ArrowRight, Leaf, Heart, Shield } from 'lucide-vue-next'

const { locale } = useI18n()
const { fullTree } = useShopMenu()

const { data: home } = await useAsyncData(`home-${locale.value}`, () =>
  queryCollection(`home_${locale.value}`).first(),
)

const iconMap: Record<string, any> = { leaf: Leaf, heart: Heart, shield: Shield }

const categories = computed(() => {
  const fallbackImages = home.value?.categories?.fallbackImages ?? []
  const childrenFlat = fullTree.value?.items?.flatMap((item) => item.children?.items ?? [])
  return [
    ...(fullTree.value?.items?.slice(0, 4) ?? []),
    ...(childrenFlat?.slice(0, 4) ?? []).map((item, index) => ({
      ...item,
      image: { src: fallbackImages[index] },
    })),
  ]
})

const isLoaded = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    isLoaded.value = true
  })
})
</script>

<template>
  <div v-if="home" class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-[100svh] max-h-[900px] min-h-[600px] overflow-hidden bg-foreground">
      <div class="absolute inset-0">
        <NuxtImg
          :src="home.hero.image"
          :alt="home.hero.imageAlt"
          class="h-full w-full object-cover"
          loading="eager"
        />
        <div class="absolute inset-0 bg-black/50" />
      </div>

      <div class="relative flex h-full items-center justify-center">
        <div class="w-full px-6 lg:px-12">
          <div class="mx-auto max-w-3xl text-center">
            <p
              class="mb-6 text-xs uppercase tracking-[0.3em] text-white/60 transition-all duration-700 ease-out sm:text-sm"
              :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
            >
              {{ home.hero.label }}
            </p>
            <h1
              class="mb-6 font-serif text-4xl leading-[1.1] text-white transition-all delay-100 duration-700 ease-out sm:text-5xl md:text-6xl lg:text-7xl"
              :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
            >
              {{ home.hero.title }}
            </h1>
            <p
              class="mx-auto mb-10 max-w-xl text-base font-light leading-relaxed text-white/70 transition-all delay-200 duration-700 ease-out sm:text-lg lg:text-xl"
              :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
            >
              {{ home.hero.description }}
            </p>
            <div
              class="transition-all delay-300 duration-700 ease-out"
              :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
            >
              <NuxtLink :to="home.hero.buttonLink">
                <button
                  class="group inline-flex items-center gap-3 bg-white px-8 py-4 text-sm uppercase tracking-wide text-foreground transition-all duration-300 hover:bg-white/90"
                >
                  {{ home.hero.buttonText }}
                  <ArrowRight
                    class="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div
        class="absolute bottom-8 left-1/2 -translate-x-1/2 transition-all delay-500 duration-700"
        :class="isLoaded ? 'opacity-100' : 'opacity-0'"
      >
        <div class="flex flex-col items-center gap-2">
          <span class="text-[10px] uppercase tracking-widest text-white/40">{{
            home.hero.scrollLabel
          }}</span>
          <div class="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>

    <!-- Promo Banner - Kitchen -->
    <section class="relative overflow-hidden">
      <NuxtLink :to="home.promo.link" class="group block">
        <div class="grid lg:grid-cols-2">
          <div
            class="relative order-2 flex min-h-[400px] items-center justify-center bg-primary px-8 py-16 lg:order-1 lg:min-h-[500px] lg:px-16 lg:py-24"
          >
            <div class="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/5" />
            <div class="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/5" />
            <div class="relative z-10 max-w-lg text-center">
              <span
                class="mb-6 inline-block bg-white/20 px-4 py-2 text-xs uppercase tracking-widest text-white"
              >
                {{ home.promo.label }}
              </span>
              <h2 class="mb-4 font-serif text-4xl leading-[1.1] text-white lg:text-5xl xl:text-6xl">
                {{ home.promo.title }}<br />
                <span class="italic">{{ home.promo.titleHighlight }}</span>
              </h2>
              <p class="mb-6 text-xl font-light text-white/80 lg:text-2xl">
                {{ home.promo.priceLabel }}
                <span class="font-serif text-3xl lg:text-4xl">{{ home.promo.priceAmount }}</span>
              </p>
              <p class="mx-auto mb-8 max-w-sm font-light text-white/60">
                {{ home.promo.description }}
              </p>
              <span
                class="inline-flex items-center gap-3 bg-white px-8 py-4 text-sm uppercase tracking-wide text-primary transition-all duration-300 group-hover:bg-white/90"
              >
                {{ $t('actions.shop-the-edit') }}
                <ArrowRight
                  class="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </div>
          </div>

          <div class="relative order-1 h-[300px] lg:order-2 lg:h-auto lg:min-h-[500px]">
            <div class="absolute inset-0 grid grid-cols-2 gap-1.5 bg-warm-200 p-1.5">
              <div class="relative overflow-hidden bg-warm-300">
                <NuxtImg
                  :src="home.promo.images.main"
                  :alt="home.promo.title"
                  class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div class="grid grid-rows-2 gap-1.5">
                <div class="relative overflow-hidden bg-warm-300">
                  <NuxtImg
                    :src="home.promo.images.secondary1"
                    :alt="home.promo.title"
                    class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div class="relative overflow-hidden bg-warm-300">
                  <NuxtImg
                    :src="home.promo.images.secondary2"
                    :alt="home.promo.title"
                    class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
            <div class="absolute bottom-4 right-4 z-10 bg-white px-5 py-3 shadow-lg lg:bottom-8 lg:right-8">
              <p class="text-xs uppercase tracking-wider text-muted-foreground">
                {{ home.promo.startingAtLabel }}
              </p>
              <p class="font-serif text-2xl text-foreground">{{ home.promo.startingAtPrice }}</p>
            </div>
          </div>
        </div>
      </NuxtLink>
    </section>

    <!-- Editorial Quote -->
    <section class="bg-background py-20 lg:py-28">
      <div class="mx-auto max-w-4xl px-6 text-center lg:px-12">
        <p class="font-serif text-xl italic leading-relaxed text-foreground/70 sm:text-2xl lg:text-3xl">
          {{ home.quote }}
        </p>
      </div>
    </section>

    <!-- Categories Grid -->
    <section class="bg-shade py-16 lg:py-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-14">
          <div>
            <p class="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {{ home.categories.label }}
            </p>
            <h2 class="font-serif text-3xl lg:text-4xl">{{ home.categories.title }}</h2>
          </div>
          <NuxtLink
            to="/categories"
            class="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {{ $t('actions.view-all') }}
          </NuxtLink>
        </div>

        <div class="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
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
                  class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
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

    <!-- Bedroom Promo -->
    <section class="relative overflow-hidden">
      <NuxtLink :to="home.bedroom.link" class="group block">
        <div class="relative min-h-[600px] lg:min-h-[700px]">
          <div class="absolute inset-0">
            <NuxtImg
              :src="home.bedroom.image"
              :alt="home.bedroom.imageAlt"
              class="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-r from-warm-950/90 via-warm-950/70 to-warm-950/40" />
            <div class="absolute inset-0 bg-gradient-to-t from-warm-950/60 via-transparent to-warm-950/30" />
          </div>
          <div class="relative flex min-h-[600px] items-center lg:min-h-[700px]">
            <div class="mx-auto w-full max-w-7xl px-6 lg:px-12">
              <div class="max-w-xl">
                <h2
                  class="mb-6 font-serif text-5xl leading-[1.05] text-white lg:text-6xl xl:text-7xl"
                >
                  {{ home.bedroom.titleLine1 }}<br />
                  <span class="italic text-primary">{{ home.bedroom.titleHighlight }}</span
                  ><br />
                  {{ home.bedroom.titleLine3 }}
                </h2>
                <p
                  class="mb-8 max-w-md text-lg font-light leading-relaxed text-white/70 lg:text-xl"
                >
                  {{ home.bedroom.description }}
                </p>
                <span
                  class="inline-flex items-center gap-3 bg-white px-8 py-4 text-sm uppercase tracking-[0.15em] text-warm-950 transition-all duration-500 group-hover:bg-primary group-hover:text-white"
                >
                  {{ $t('actions.explore-collection') }}
                  <ArrowRight
                    class="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </NuxtLink>
    </section>

    <!-- Featured Section -->
    <section class="py-20 lg:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="mb-12 lg:mb-20">
          <p class="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            {{ home.featured.label }}
          </p>
          <h2 class="font-serif text-3xl lg:text-4xl">
            {{ home.featured.title }}
          </h2>
        </div>

        <div class="mb-16 grid gap-8 lg:mb-24 lg:grid-cols-2 lg:gap-16">
          <NuxtLink :to="home.featured.items[0]?.link" class="group">
            <div class="relative aspect-[4/5] overflow-hidden bg-muted">
              <NuxtImg
                :src="home.featured.items[0]?.image"
                :alt="home.featured.items[0]?.title"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </NuxtLink>
          <div class="flex flex-col justify-center">
            <p class="mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              {{ $t('home.featured.number', { index: 1 }) }}
            </p>
            <h3 class="mb-6 font-serif text-3xl lg:text-4xl xl:text-5xl">
              {{ home.featured.items[0]?.title }}
            </h3>
            <p class="mb-8 max-w-md text-lg font-light leading-relaxed text-muted-foreground">
              {{ home.featured.description }}
            </p>
            <NuxtLink :to="home.featured.items[0]?.link">
              <button
                class="group inline-flex items-center gap-2 border border-foreground px-6 py-3 text-sm uppercase tracking-wide text-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
              >
                {{ $t('actions.explore') }}
                <ArrowRight
                  class="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </NuxtLink>
          </div>
        </div>

        <div class="grid gap-8 sm:grid-cols-2 lg:gap-12">
          <template v-for="(product, index) in home.featured.items.slice(1)" :key="product.link">
            <NuxtLink :to="product.link" class="group">
              <div class="relative mb-5 aspect-[4/3] overflow-hidden bg-muted">
                <NuxtImg
                  :src="product.image"
                  :alt="product.title"
                  class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p class="mb-2 text-sm uppercase tracking-wider text-muted-foreground">
                {{ $t('home.featured.number', { index: index + 2 }) }}
              </p>
              <h3
                class="mb-2 font-serif text-2xl transition-colors duration-300 group-hover:text-primary lg:text-3xl"
              >
                {{ product.title }}
              </h3>
              <p class="font-light text-muted-foreground">{{ product.subtitle }}</p>
            </NuxtLink>
          </template>
        </div>
      </div>
    </section>

    <!-- Brand Values -->
    <section class="bg-foreground py-20 text-background lg:py-28">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="grid gap-10 lg:grid-cols-4 lg:gap-8">
          <div>
            <p class="mb-2 text-xs uppercase tracking-[0.2em] text-background/40">
              {{ home.values.label }}
            </p>
            <h2 class="font-serif text-2xl lg:text-3xl">{{ home.values.title }}</h2>
          </div>
          <div class="grid gap-8 sm:grid-cols-3 lg:col-span-3 lg:gap-10">
            <div v-for="value in home.values.items" :key="value.title">
              <div
                class="mb-5 flex size-10 items-center justify-center rounded-full border border-background/20"
              >
                <component :is="iconMap[value.icon]" class="size-4 text-background/60" />
              </div>
              <h3 class="mb-2 font-medium">{{ value.title }}</h3>
              <p class="text-sm font-light leading-relaxed text-background/50">
                {{ value.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- New Arrivals CTA -->
    <section class="py-24 lg:py-32">
      <div class="mx-auto max-w-3xl px-6 text-center lg:px-12">
        <p class="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-primary">
          {{ home.newArrivals.label }}
        </p>
        <h2 class="mb-6 font-serif text-4xl sm:text-5xl lg:text-6xl">
          {{ home.newArrivals.title }}
        </h2>
        <p class="mx-auto mb-10 max-w-lg text-lg font-light text-muted-foreground">
          {{ home.newArrivals.description }}
        </p>
        <NuxtLink :to="home.newArrivals.buttonLink">
          <button
            class="inline-flex items-center gap-2 bg-foreground px-8 py-4 text-sm uppercase tracking-wide text-background transition-colors duration-300 hover:bg-foreground/90"
          >
            {{ home.newArrivals.buttonText }}
          </button>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
