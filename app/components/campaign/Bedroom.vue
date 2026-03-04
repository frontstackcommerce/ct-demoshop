<script setup lang="ts">
const props = defineProps<{
  campaign: any
  products: any[]
  premiumProducts: any[]
}>()

const heroProduct = computed(() => props.products?.[0] || props.premiumProducts?.[0])
const showcaseProducts = computed(() => props.premiumProducts?.slice(0, 8) || [])

const isLoaded = ref(false)
const activeTestimonial = ref(0)
const scrollProgress = ref(0)

onMounted(() => {
  requestAnimationFrame(() => {
    isLoaded.value = true
  })

  const testimonials = props.campaign?.data?.testimonials || []
  if (testimonials.length) {
    setInterval(() => {
      activeTestimonial.value = (activeTestimonial.value + 1) % testimonials.length
    }, 6000)
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      scrollProgress.value = window.scrollY
    })
  }
})
</script>

<template>
  <div class="bg-background min-h-screen overflow-hidden">
    <!-- Immersive Hero - Full Viewport with Video-like Feel -->
    <section class="relative h-[100svh] min-h-[700px] overflow-hidden">
      <!-- Layered Background for Depth -->
      <div class="bg-warm-950 absolute inset-0">
        <!-- Primary Image -->
        <div
          class="absolute inset-0 transition-transform duration-1000"
          :style="{ transform: `scale(${1.1 - scrollProgress * 0.0001})` }"
        >
          <NuxtImg
            :src="campaign.data.heroImage"
            :alt="$t('campaign.bedroom.hero.title-1')"
            class="h-full w-full object-cover opacity-70"
          />
        </div>
        <!-- Gradient Overlays for Cinematic Feel -->
        <div
          class="from-warm-950/80 via-warm-950/30 to-warm-950 absolute inset-0 bg-gradient-to-b"
        />
        <div
          class="from-warm-950/60 to-warm-950/60 absolute inset-0 bg-gradient-to-r via-transparent"
        />
        <!-- Vignette Effect -->
        <div class="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.5)]" />
      </div>

      <!-- Hero Content - Dramatic Typography -->
      <div class="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <div class="max-w-4xl">
          <!-- Floating Badge -->
          <div
            class="mb-8 inline-flex items-center gap-2 border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-sm transition-all duration-1000"
            :class="isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'"
          >
            <span class="bg-primary h-2 w-2 animate-pulse rounded-full" />
            <span class="text-xs tracking-[0.25em] text-white/80 uppercase">{{
              $t('campaign.bedroom.hero.badge')
            }}</span>
          </div>

          <!-- Main Headline - Split for Drama -->
          <h1 class="relative">
            <span
              class="block font-serif text-6xl leading-[0.9] font-light text-white transition-all delay-100 duration-1000 sm:text-7xl md:text-8xl lg:text-9xl"
              :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
            >
              {{ $t('campaign.bedroom.hero.title-1') }}
            </span>
            <span
              class="text-primary block font-serif text-6xl leading-[0.9] font-light italic transition-all delay-200 duration-1000 sm:text-7xl md:text-8xl lg:text-9xl"
              :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
            >
              {{ $t('campaign.bedroom.hero.title-2') }}
            </span>
            <span
              class="block font-serif text-6xl leading-[0.9] font-light text-white transition-all delay-300 duration-1000 sm:text-7xl md:text-8xl lg:text-9xl"
              :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
            >
              {{ $t('campaign.bedroom.hero.title-3') }}
            </span>
          </h1>

          <!-- Subheadline -->
          <p
            class="mx-auto mt-8 max-w-2xl text-lg leading-relaxed font-light text-white/60 transition-all delay-400 duration-1000 sm:text-xl lg:text-2xl"
            :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
          >
            {{ $t('campaign.bedroom.hero.description') }}
          </p>

          <!-- CTA Group -->
          <div
            class="mt-12 flex flex-col items-center justify-center gap-4 transition-all delay-500 duration-1000 sm:flex-row"
            :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
          >
            <a
              href="#collection"
              class="group text-warm-950 hover:bg-primary inline-flex items-center gap-3 bg-white px-10 py-5 text-sm tracking-[0.15em] uppercase transition-all duration-500 hover:text-white"
            >
              <span>{{ $t('campaign.bedroom.cta.explore') }}</span>
              <IconArrowDown class="size-4 transition-transform group-hover:translate-y-1" />
            </a>
            <a
              href="#story"
              class="inline-flex items-center gap-3 text-sm tracking-[0.15em] text-white/70 uppercase transition-colors hover:text-white"
            >
              <span>{{ $t('campaign.bedroom.cta.philosophy') }}</span>
              <IconArrowRight class="size-4" />
            </a>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator - Animated -->
      <div
        class="absolute bottom-12 left-1/2 -translate-x-1/2 transition-all delay-700 duration-1000"
        :class="isLoaded ? 'opacity-100' : 'opacity-0'"
      >
        <div class="flex flex-col items-center">
          <div
            class="relative h-16 w-px overflow-hidden bg-gradient-to-b from-transparent via-white/40 to-transparent"
          >
            <div
              class="absolute top-0 left-0 h-4 w-full animate-[scrollDown_2s_ease-in-out_infinite] bg-white/60"
            />
          </div>
        </div>
      </div>

      <!-- Side Stats - Desktop Only -->
      <div
        class="absolute top-1/2 right-12 hidden -translate-y-1/2 flex-col gap-8 transition-all delay-600 duration-1000 lg:flex"
        :class="isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'"
      >
        <div class="text-right">
          <p class="font-serif text-4xl text-white">{{ $t('campaign.bedroom.stats.sleep-better-value') }}</p>
          <p class="text-xs tracking-wider text-white/50 uppercase">
            {{ $t('campaign.bedroom.stats.sleep-better') }}
          </p>
        </div>
        <div class="h-12 w-px self-end bg-white/20" />
        <div class="text-right">
          <p class="font-serif text-4xl text-white">{{ $t('campaign.bedroom.stats.warranty-value') }}</p>
          <p class="text-xs tracking-wider text-white/50 uppercase">
            {{ $t('campaign.bedroom.stats.warranty') }}
          </p>
        </div>
        <div class="h-12 w-px self-end bg-white/20" />
        <div class="text-right">
          <p class="font-serif text-4xl text-white">{{ $t('campaign.bedroom.stats.night-trial-value') }}</p>
          <p class="text-xs tracking-wider text-white/50 uppercase">
            {{ $t('campaign.bedroom.stats.night-trial') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Trust Bar - Social Proof -->
    <section class="bg-warm-950 overflow-hidden border-y border-white/10 py-6">
      <div class="mx-auto max-w-7xl px-6">
        <div
          class="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm text-white/40"
        >
          <span class="flex items-center gap-2">
            <IconStar class="fill-primary text-primary size-4" />
            <IconStar class="fill-primary text-primary size-4" />
            <IconStar class="fill-primary text-primary size-4" />
            <IconStar class="fill-primary text-primary size-4" />
            <IconStar class="fill-primary text-primary size-4" />
            <span class="ml-2">{{ $t('campaign.bedroom.trust-bar.reviews') }}</span>
          </span>
          <span class="hidden sm:inline">&bull;</span>
          <span>{{ $t('campaign.bedroom.trust-bar.delivery') }}</span>
          <span class="hidden sm:inline">&bull;</span>
          <span>{{ $t('campaign.bedroom.trust-bar.trial') }}</span>
          <span class="hidden sm:inline">&bull;</span>
          <span>{{ $t('campaign.bedroom.trust-bar.handcrafted') }}</span>
        </div>
      </div>
    </section>

    <!-- Philosophy Section - Editorial Storytelling -->
    <section id="story" class="bg-background py-24 lg:py-40">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <!-- Left: Image Composition -->
          <div class="relative">
            <div class="relative aspect-[4/5]">
              <NuxtImg
                :src="campaign.data.philosophyImages.main"
                :alt="$t('campaign.bedroom.philosophy.label')"
                class="h-full w-full object-cover"
              />
            </div>
            <!-- Floating Accent Image -->
            <div class="absolute -right-8 -bottom-8 aspect-square w-1/2 shadow-2xl lg:-right-16">
              <NuxtImg
                :src="campaign.data.philosophyImages.accent"
                :alt="$t('campaign.bedroom.philosophy.title-1')"
                class="h-full w-full object-cover"
              />
            </div>
            <!-- Decorative Element -->
            <div class="border-primary/30 absolute -top-4 -left-4 h-24 w-24 border" />
          </div>

          <!-- Right: Content -->
          <div class="lg:pl-8">
            <span class="text-primary text-xs font-medium tracking-[0.3em] uppercase">{{
              $t('campaign.bedroom.philosophy.label')
            }}</span>
            <h2 class="mt-6 font-serif text-4xl leading-[1.1] lg:text-5xl xl:text-6xl">
              {{ $t('campaign.bedroom.philosophy.title-1') }}<br />
              <span class="text-primary italic">{{
                $t('campaign.bedroom.philosophy.title-2')
              }}</span>
            </h2>
            <div class="text-muted-foreground mt-8 space-y-6 text-lg leading-relaxed font-light">
              <p>
                {{ $t('campaign.bedroom.philosophy.text-1') }}
              </p>
              <p>
                {{ $t('campaign.bedroom.philosophy.text-2') }}
              </p>
            </div>

            <!-- Signature/Quote -->
            <div class="border-border mt-12 border-t pt-8">
              <p class="text-foreground/80 font-serif text-xl italic">
                "{{ $t('campaign.bedroom.philosophy.quote') }}"
              </p>
              <p class="text-muted-foreground mt-3 text-sm">
                {{ $t('campaign.bedroom.philosophy.attribution') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section - Icon Grid -->
    <section class="bg-warm-100 py-20">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div
            v-for="(benefit, index) in campaign.data.sleepBenefits"
            :key="index"
            class="text-center lg:text-left"
          >
            <div
              class="bg-background border-border mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border"
            >
              <IconMoon v-if="benefit.icon === 'moon'" class="text-primary size-7" />
              <IconHeart v-if="benefit.icon === 'heart'" class="text-primary size-7" />
              <IconSun v-if="benefit.icon === 'sun'" class="text-primary size-7" />
              <IconShield v-if="benefit.icon === 'shield'" class="text-primary size-7" />
            </div>
            <h3 class="mb-2 font-serif text-xl">
              {{
                benefit.icon === 'moon'
                  ? $t('campaign.bedroom.benefits.deep-sleep')
                  : benefit.icon === 'heart'
                    ? $t('campaign.bedroom.benefits.spinal')
                    : benefit.icon === 'sun'
                      ? $t('campaign.bedroom.benefits.refreshed')
                      : $t('campaign.bedroom.benefits.warranty-title')
              }}
            </h3>
            <p class="text-muted-foreground text-sm leading-relaxed font-light">
              {{
                benefit.icon === 'moon'
                  ? $t('campaign.bedroom.benefits.deep-sleep-desc')
                  : benefit.icon === 'heart'
                    ? $t('campaign.bedroom.benefits.spinal-desc')
                    : benefit.icon === 'sun'
                      ? $t('campaign.bedroom.benefits.refreshed-desc')
                      : $t('campaign.bedroom.benefits.warranty-desc')
              }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Collection - Dramatic Product Grid -->
    <section id="collection" class="bg-background py-24 lg:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <!-- Section Header -->
        <div class="mb-16 max-w-3xl lg:mb-24">
          <span class="text-primary text-xs font-medium tracking-[0.3em] uppercase">{{
            $t('campaign.bedroom.collection.label')
          }}</span>
          <h2 class="mt-4 font-serif text-4xl lg:text-5xl">
            {{ $t('campaign.bedroom.collection.title') }}
          </h2>
          <p class="text-muted-foreground mt-6 text-lg font-light">
            {{ $t('campaign.bedroom.collection.description') }}
          </p>
        </div>

        <!-- Hero Product - Full Width -->
        <div v-if="heroProduct" class="mb-12">
          <NuxtLink :to="heroProduct.link?.path" class="group relative block">
            <div class="grid gap-8 lg:grid-cols-5 lg:gap-0">
              <!-- Image - Takes 3 columns -->
              <div
                class="bg-warm-100 relative aspect-[4/3] overflow-hidden lg:col-span-3 lg:aspect-auto lg:h-[600px]"
              >
                <NuxtImg
                  :src="heroProduct.variants?.[0]?.images?.[0]?.src"
                  :alt="heroProduct.name"
                  class="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <!-- Bestseller Badge -->
                <div
                  class="bg-primary text-primary-foreground absolute top-6 left-6 px-4 py-2 text-xs tracking-wider uppercase"
                >
                  {{ $t('campaign.bedroom.collection.bestseller') }}
                </div>
              </div>

              <!-- Content - Takes 2 columns -->
              <div
                class="lg:bg-warm-950 flex flex-col justify-center p-8 lg:col-span-2 lg:p-12 lg:text-white xl:p-16"
              >
                <span class="text-primary mb-4 text-xs tracking-[0.2em] uppercase">{{
                  $t('campaign.bedroom.collection.signature')
                }}</span>
                <h3 class="mb-4 font-serif text-3xl lg:text-4xl lg:text-white xl:text-5xl">
                  {{ heroProduct.name }}
                </h3>
                <p class="text-muted-foreground mb-6 leading-relaxed font-light lg:text-white/70">
                  {{ $t('campaign.bedroom.collection.hero-desc') }}
                </p>
                <div class="mb-8 flex items-baseline gap-4">
                  <span class="font-serif text-3xl lg:text-4xl lg:text-white">{{
                    formatPrice(heroProduct.price)
                  }}</span>
                  <span class="text-muted-foreground text-sm lg:text-white/50">{{
                    $t('campaign.bedroom.collection.free-delivery')
                  }}</span>
                </div>
                <div class="flex flex-wrap gap-4">
                  <span
                    class="text-warm-950 group-hover:bg-primary inline-flex items-center gap-3 bg-white px-8 py-4 text-sm tracking-wider uppercase transition-all duration-300 group-hover:text-white"
                  >
                    {{ $t('campaign.bedroom.collection.view-details') }}
                    <IconArrowRight class="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Product Grid - Asymmetric -->
        <div class="grid grid-cols-12 gap-4 lg:gap-6">
          <template v-for="(product, index) in showcaseProducts.slice(0, 6)" :key="product.key">
            <!-- Larger items for first two -->
            <div
              :class="[
                index < 2 ? 'col-span-12 sm:col-span-6' : 'col-span-6 lg:col-span-4',
                index === 1 ? 'lg:mt-12' : '',
              ]"
            >
              <NuxtLink :to="product.link?.path" class="group block">
                <div
                  class="bg-warm-100 relative mb-5 overflow-hidden"
                  :class="index < 2 ? 'aspect-[4/5]' : 'aspect-square'"
                >
                  <NuxtImg
                    :src="product.variants?.[0]?.images?.[0]?.src"
                    :alt="product.name"
                    class="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <!-- Hover Overlay -->
                  <div
                    class="bg-warm-950/0 group-hover:bg-warm-950/20 absolute inset-0 transition-colors duration-500"
                  />
                  <!-- Quick View Button -->
                  <div
                    class="absolute inset-x-6 bottom-6 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <span
                      class="block w-full bg-white/95 py-3 text-center text-sm font-medium tracking-wider uppercase backdrop-blur-sm"
                    >
                      {{ $t('campaign.bedroom.collection.quick-view') }}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 class="group-hover:text-primary font-serif text-xl transition-colors">
                    {{ product.name }}
                  </h3>
                  <p class="mt-1 text-lg font-medium">{{ formatPrice(product.price) }}</p>
                </div>
              </NuxtLink>
            </div>
          </template>
        </div>

        <!-- View All CTA -->
        <div class="mt-16 text-center">
          <NuxtLink
            :to="campaign.data.categoryLink"
            class="border-foreground text-foreground hover:bg-foreground hover:text-background inline-flex items-center gap-3 border-2 px-10 py-5 text-sm tracking-[0.15em] uppercase transition-all duration-300"
          >
            {{ $t('campaign.bedroom.collection.view-all') }}
            <IconArrowRight class="size-4" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Testimonials - Cinematic Carousel -->
    <section class="bg-warm-950 relative overflow-hidden py-32 lg:py-40">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div
          class="absolute inset-0"
          style="
            background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0);
            background-size: 40px 40px;
          "
        />
      </div>

      <div class="relative mx-auto max-w-5xl px-6 text-center lg:px-12">
        <span class="text-primary text-xs font-medium tracking-[0.3em] uppercase">{{
          $t('campaign.bedroom.testimonials.label')
        }}</span>
        <h2 class="mt-4 mb-16 font-serif text-3xl text-white lg:text-4xl">
          {{ $t('campaign.bedroom.testimonials.title') }}
        </h2>

        <!-- Testimonial Cards -->
        <div class="relative h-[300px]">
          <TransitionGroup name="testimonial">
            <div
              v-for="(testimonial, index) in campaign.data.testimonials"
              v-show="activeTestimonial === index"
              :key="index"
              class="absolute inset-0 flex flex-col items-center justify-center"
            >
              <!-- Stars -->
              <div class="mb-8 flex gap-1">
                <IconStar
                  v-for="n in testimonial.rating"
                  :key="n"
                  class="fill-primary text-primary size-5"
                />
              </div>

              <!-- Quote -->
              <blockquote
                class="max-w-3xl font-serif text-2xl leading-relaxed font-light text-white italic sm:text-3xl lg:text-4xl"
              >
                "{{ testimonial.quote }}"
              </blockquote>

              <!-- Author -->
              <div class="mt-10">
                <p class="font-medium text-white">{{ testimonial.author }}</p>
                <p class="text-sm text-white/50">{{ testimonial.location }}</p>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <!-- Navigation Dots -->
        <div class="mt-12 flex justify-center gap-3">
          <button
            v-for="(_, index) in campaign.data.testimonials"
            :key="index"
            class="h-2 w-2 rounded-full transition-all duration-300"
            :class="
              activeTestimonial === index ? 'bg-primary w-8' : 'bg-white/30 hover:bg-white/50'
            "
            @click="activeTestimonial = index as number"
          />
        </div>
      </div>
    </section>

    <!-- Craftsmanship Section -->
    <section class="bg-background py-24 lg:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span class="text-primary text-xs font-medium tracking-[0.3em] uppercase">{{
              $t('campaign.bedroom.craftsmanship.label')
            }}</span>
            <h2 class="mt-4 font-serif text-4xl lg:text-5xl">
              {{ $t('campaign.bedroom.craftsmanship.title-1') }}<br />{{
                $t('campaign.bedroom.craftsmanship.title-2')
              }}
            </h2>
            <p class="text-muted-foreground mt-6 text-lg leading-relaxed font-light">
              {{ $t('campaign.bedroom.craftsmanship.description') }}
            </p>

            <div class="mt-12 grid grid-cols-2 gap-8">
              <div>
                <p class="text-primary font-serif text-4xl">
                  {{ campaign.data.craftsmanshipStats[0].value }}
                </p>
                <p class="text-muted-foreground mt-1 text-sm">
                  {{ $t('campaign.bedroom.craftsmanship.stat-hours') }}
                </p>
              </div>
              <div>
                <p class="text-primary font-serif text-4xl">
                  {{ campaign.data.craftsmanshipStats[1].value }}
                </p>
                <p class="text-muted-foreground mt-1 text-sm">
                  {{ $t('campaign.bedroom.craftsmanship.stat-generation') }}
                </p>
              </div>
              <div>
                <p class="text-primary font-serif text-4xl">
                  {{ campaign.data.craftsmanshipStats[2].value }}
                </p>
                <p class="text-muted-foreground mt-1 text-sm">
                  {{ $t('campaign.bedroom.craftsmanship.stat-sustainable') }}
                </p>
              </div>
              <div>
                <p class="text-primary font-serif text-4xl">
                  {{ campaign.data.craftsmanshipStats[3].value }}
                </p>
                <p class="text-muted-foreground mt-1 text-sm">
                  {{ $t('campaign.bedroom.craftsmanship.stat-compromises') }}
                </p>
              </div>
            </div>
          </div>

          <!-- Image Grid -->
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-4">
              <div class="bg-warm-100 aspect-[3/4] overflow-hidden">
                <NuxtImg
                  :src="campaign.data.craftsmanshipImages[0]"
                  :alt="$t('campaign.bedroom.craftsmanship.label')"
                  class="h-full w-full object-cover"
                />
              </div>
              <div class="bg-warm-100 aspect-square overflow-hidden">
                <NuxtImg
                  :src="campaign.data.craftsmanshipImages[1]"
                  :alt="$t('campaign.bedroom.craftsmanship.label')"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>
            <div class="space-y-4 pt-8">
              <div class="bg-warm-100 aspect-square overflow-hidden">
                <NuxtImg
                  :src="campaign.data.craftsmanshipImages[2]"
                  :alt="$t('campaign.bedroom.craftsmanship.label')"
                  class="h-full w-full object-cover"
                />
              </div>
              <div class="bg-warm-100 aspect-[3/4] overflow-hidden">
                <NuxtImg
                  :src="campaign.data.craftsmanshipImages[3]"
                  :alt="$t('campaign.bedroom.craftsmanship.label')"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sleep Consultation CTA -->
    <section class="relative overflow-hidden py-24 lg:py-32">
      <div class="absolute inset-0">
        <NuxtImg
          :src="campaign.data.consultationImage"
          :alt="$t('campaign.bedroom.consultation.label')"
          class="h-full w-full object-cover"
        />
        <div class="bg-warm-950/80 absolute inset-0" />
      </div>

      <div class="relative mx-auto max-w-4xl px-6 text-center text-white lg:px-12">
        <span class="text-primary text-xs font-medium tracking-[0.3em] uppercase">{{
          $t('campaign.bedroom.consultation.label')
        }}</span>
        <h2 class="mt-4 font-serif text-4xl lg:text-5xl xl:text-6xl">
          {{ $t('campaign.bedroom.consultation.title') }}
        </h2>
        <p class="mx-auto mt-6 max-w-2xl text-lg font-light text-white/70 lg:text-xl">
          {{ $t('campaign.bedroom.consultation.description') }}
        </p>
        <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#consultation"
            class="text-warm-950 hover:bg-primary inline-flex items-center gap-3 bg-white px-10 py-5 text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:text-white"
          >
            {{ $t('campaign.bedroom.consultation.book') }}
          </a>
          <a
            href="tel:+4912345678"
            class="inline-flex items-center gap-3 text-sm tracking-[0.15em] text-white/70 uppercase transition-colors hover:text-white"
          >
            <IconPhone class="size-4" />
            {{ $t('campaign.bedroom.consultation.call') }}
          </a>
        </div>
      </div>
    </section>

    <!-- Final Trust Section -->
    <section class="bg-warm-100 py-16">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          <div class="flex flex-col items-center">
            <IconTruck class="text-primary mb-4 size-8" />
            <h3 class="mb-1 font-medium">
              {{ $t('campaign.bedroom.trust.delivery-title') }}
            </h3>
            <p class="text-muted-foreground text-sm">
              {{ $t('campaign.bedroom.trust.delivery-desc') }}
            </p>
          </div>
          <div class="flex flex-col items-center">
            <IconRefreshCw class="text-primary mb-4 size-8" />
            <h3 class="mb-1 font-medium">
              {{ $t('campaign.bedroom.trust.trial-title') }}
            </h3>
            <p class="text-muted-foreground text-sm">
              {{ $t('campaign.bedroom.trust.trial-desc') }}
            </p>
          </div>
          <div class="flex flex-col items-center">
            <IconShield class="text-primary mb-4 size-8" />
            <h3 class="mb-1 font-medium">
              {{ $t('campaign.bedroom.trust.warranty-title') }}
            </h3>
            <p class="text-muted-foreground text-sm">
              {{ $t('campaign.bedroom.trust.warranty-desc') }}
            </p>
          </div>
          <div class="flex flex-col items-center">
            <IconLeaf class="text-primary mb-4 size-8" />
            <h3 class="mb-1 font-medium">
              {{ $t('campaign.bedroom.trust.sustainable-title') }}
            </h3>
            <p class="text-muted-foreground text-sm">
              {{ $t('campaign.bedroom.trust.sustainable-desc') }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes scrollDown {
  0%,
  100% {
    transform: translateY(-100%);
  }
  50% {
    transform: translateY(400%);
  }
}

.testimonial-enter-active,
.testimonial-leave-active {
  transition: all 0.8s ease;
}

.testimonial-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.testimonial-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
