<script setup lang="ts">
import type { WithClassAsProps } from './interface'
import { cn } from '@/lib/utils'
import { onBeforeUnmount, ref, watch } from 'vue'
import { useCarousel } from './useCarousel'

const props = withDefaults(
  defineProps<
    {
      visibleSlides?: number
    } & WithClassAsProps
  >(),
  {
    visibleSlides: 3,
  }
)

const { carouselApi } = useCarousel()

const progress = ref(0)

let cleanup: (() => void) | undefined

watch(
  () => carouselApi.value,
  (api) => {
    cleanup?.()
    if (!api) return

    const updateProgress = () => {
      if (!api) return

      const totalSlides = api.scrollSnapList().length
      const chunkPercentage = Math.min(props.visibleSlides / totalSlides, 1)
      const rawProgress = api.scrollProgress()
      const adjustedProgress = chunkPercentage + rawProgress * (1 - chunkPercentage)

      progress.value = Math.max(0, Math.min(1, adjustedProgress))
    }

    api.on('init', updateProgress)
    api.on('reInit', updateProgress)
    api.on('scroll', updateProgress)
    api.on('slideFocus', updateProgress)
    api.on('resize', updateProgress)

    cleanup = () => {
      api.off('init', updateProgress)
      api.off('reInit', updateProgress)
      api.off('scroll', updateProgress)
      api.off('slideFocus', updateProgress)
      api.off('resize', updateProgress)
    }

    updateProgress()
  },
  { immediate: true }
)

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <div
    data-slot="carousel-progress"
    :class="cn('mt-3 h-[3px] w-full overflow-hidden rounded-sm bg-muted/30', props.class)"
  >
    <div
      class="h-full w-full bg-foreground transition-transform duration-100 ease-out"
      :style="{
        transform: `translate3d(${(progress - 1) * 100}%,0px,0px)`,
        transformOrigin: '0%',
      }"
    />
  </div>
</template>
