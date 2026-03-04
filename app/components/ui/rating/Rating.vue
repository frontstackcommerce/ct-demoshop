<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { computed } from "vue"

import { RatingIcon, RatingMeta } from "."

import { type RatingVariants, ratingVariants } from "."

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    color?: RatingVariants["color"]
    size?: RatingVariants["size"]
    rating: number
    max?: number
    count?: number
    showValue?: boolean
  }>(),
  {
    max: 5,
    showValue: false,
  },
)

const filledStars = computed(() => {
  const rounded = Math.round(props.rating)
  return Math.max(0, Math.min(rounded, props.max))
})

const emptyStars = computed(() => {
  return props.max - filledStars.value
})

const ariaLabel = computed(() => {
  return `${filledStars.value} out of ${props.max} stars`
})
</script>

<template>
  <div
    data-slot="rating"
    role="img"
    :aria-label="ariaLabel"
    class="flex items-center gap-0.5"
  >
    <RatingIcon
      v-for="i in filledStars"
      :key="`filled-${i}`"
      aria-hidden="true"
      :class="cn(ratingVariants({ color: props.color, size: props.size }), props.class)"
    />
    <RatingIcon
      v-for="i in emptyStars"
      :key="`empty-${i}`"
      aria-hidden="true"
      :class="cn(ratingVariants({ size: props.size, color: 'muted' }), props.class)"
    />
    <RatingMeta
      v-if="props.showValue"
      :rating="props.rating"
      :max="props.max"
      :count="props.count"
    />
  </div>
</template>
