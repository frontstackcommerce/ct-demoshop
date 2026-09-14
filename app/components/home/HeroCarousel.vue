<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

interface HeroSlide {
  src: string
  alt: string
  loading: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
  width: number
  height: number
}

const props = defineProps<{
  slides: HeroSlide[]
}>()

const { t } = useI18n()

const AUTOPLAY_INTERVAL_MS = 6000

const activeIndex = ref(0)
const isHovered = ref(false)
const isFocused = ref(false)
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

const isPaused = computed(() => isHovered.value || isFocused.value)

let autoplayTimer: ReturnType<typeof setInterval> | null = null

function goTo(index: number) {
  const total = props.slides.length
  activeIndex.value = ((index % total) + total) % total
}

function next() {
  goTo(activeIndex.value + 1)
}

function prev() {
  goTo(activeIndex.value - 1)
}

function startAutoplay() {
  stopAutoplay()

  if (prefersReducedMotion.value || props.slides.length <= 1) return

  autoplayTimer = setInterval(() => {
    if (!isPaused.value) next()
  }, AUTOPLAY_INTERVAL_MS)
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

function pause() {
  isHovered.value = true
}

function resume() {
  isHovered.value = false
}

function focusPause() {
  isFocused.value = true
}

function focusResume() {
  isFocused.value = false
}

watch(prefersReducedMotion, (reduced) => {
  if (reduced) {
    stopAutoplay()
    activeIndex.value = 0
  } else {
    startAutoplay()
  }
})

onMounted(() => {
  startAutoplay()
})

onBeforeUnmount(() => {
  stopAutoplay()
})

defineExpose({
  pause,
  resume,
  focusPause,
  focusResume,
})
</script>

<template>
  <div class="absolute inset-0">
    <!-- Slides -->
    <div
      v-for="(slide, index) in slides"
      :key="slide.src"
      class="absolute inset-0"
      :class="[
        index === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none',
        prefersReducedMotion ? '' : 'transition-opacity duration-1000 ease-in-out',
      ]"
      :aria-hidden="index !== activeIndex"
    >
      <NuxtImg
        :src="slide.src"
        :alt="slide.alt"
        :loading="slide.loading"
        :fetchpriority="slide.fetchPriority"
        :width="slide.width"
        :height="slide.height"
        class="h-full w-full object-cover"
      />
    </div>
    <div class="absolute inset-0 bg-black/50" />

    <!-- Prev / Next Controls -->
    <template v-if="slides.length > 1">
      <button
        type="button"
        class="absolute left-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        :aria-label="t('home.hero.carousel-previous')"
        @click="prev"
      >
        <IconChevronLeft class="size-5" />
      </button>
      <button
        type="button"
        class="absolute right-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        :aria-label="t('home.hero.carousel-next')"
        @click="next"
      >
        <IconChevronRight class="size-5" />
      </button>

      <!-- Dot Indicators -->
      <div class="absolute bottom-20 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        <button
          v-for="(slide, index) in slides"
          :key="`dot-${slide.src}`"
          type="button"
          class="h-2 rounded-full transition-all"
          :class="index === activeIndex ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'"
          :aria-label="t('home.hero.carousel-goto-slide', { number: index + 1 })"
          :aria-current="index === activeIndex ? 'true' : undefined"
          @click="goTo(index)"
        />
      </div>
    </template>
  </div>
</template>
