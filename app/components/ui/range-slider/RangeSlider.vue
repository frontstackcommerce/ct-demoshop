<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

interface RangeSliderProps extends /* @vue-ignore */ SliderRootProps {
  /** Controls whether to show a single thumb or range (two thumbs) */
  variant?: 'single' | 'range'
  /** Optional label text displayed above the slider */
  label?: string
  /** Show min/max legend values below the slider */
  showLegend?: boolean
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<RangeSliderProps>(), {
  variant: 'single',
  min: 0,
  max: 100,
  step: 1,
})

const emits = defineEmits<SliderRootEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'variant', 'label', 'showLegend')
const forwarded = useForwardPropsEmits(delegatedProps, emits)

const isRange = computed(() => props.variant === 'range')

// Compute the number of thumbs based on modelValue or defaultValue
const thumbCount = computed(() => {
  if (props.modelValue) {
    return props.modelValue.length
  }
  if (props.defaultValue) {
    return props.defaultValue.length
  }
  return isRange.value ? 2 : 1
})
</script>

<template>
  <div data-slot="range-slider" class="flex w-full flex-col">
    <label
      v-if="label"
      data-slot="range-slider-label"
      class="text-foreground mb-2 text-sm font-medium leading-none"
    >
      {{ label }}
    </label>

    <SliderRoot
      v-slot="{ modelValue }"
      data-slot="range-slider-root"
      :class="cn(
        'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
        props.class,
      )"
      v-bind="forwarded"
    >
      <SliderTrack
        data-slot="range-slider-track"
        class="bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
      >
        <SliderRange
          data-slot="range-slider-range"
          class="bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
        />
      </SliderTrack>

      <SliderThumb
        v-for="(_, key) in (modelValue ?? thumbCount)"
        :key="key"
        data-slot="range-slider-thumb"
        class="border-primary ring-ring/50 block size-4 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
      />
    </SliderRoot>

    <div
      v-if="showLegend"
      data-slot="range-slider-legend"
      class="text-muted-foreground mt-2 flex justify-between text-xs font-medium tracking-wide"
    >
      <span>{{ min }}</span>
      <span>{{ max }}</span>
    </div>
  </div>
</template>
