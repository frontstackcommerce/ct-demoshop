<script setup lang="ts">
import type { WithClassAsProps } from './interface'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useCarousel } from './useCarousel'

const props = defineProps<WithClassAsProps>()

const { carouselApi, scrollTo } = useCarousel()
const slidesInView = computed<number[]>(() => {
  if (!carouselApi.value) return []
  return [...Array(carouselApi.value.scrollSnapList().length).keys()]
})

const activeIndex = ref(0)

let cleanup: (() => void) | undefined

watch(
  () => carouselApi.value,
  (api) => {
    cleanup?.()
    if (api) {
      const handler = () => {
        activeIndex.value = api.selectedScrollSnap()
      }
      api.on('select', handler)
      cleanup = () => api.off('select', handler)
    }
  },
  { immediate: true }
)

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <div
    v-if="slidesInView.length > 0"
    data-slot="carousel-dots"
    :class="cn('absolute bottom-0 left-1/2 flex -translate-x-1/2', props.class)"
  >
    <Button
      v-for="index in slidesInView"
      :key="index"
      variant="ghost"
      size="icon"
      class="px-1"
      :aria-label="`Go to slide ${index + 1}`"
      :aria-current="activeIndex === index"
      @click="scrollTo(index)"
    >
      <span
        class="h-0.5 w-10 opacity-90 sm:w-6"
        :class="cn(activeIndex === index ? 'bg-foreground' : 'bg-muted-foreground')"
      />
    </Button>
  </div>
</template>
