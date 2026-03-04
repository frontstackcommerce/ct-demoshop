<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from "reka-ui"
import { cn } from "@/lib/utils"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    modelValue?: number[]
    label?: string
    min?: number
    max?: number
    step?: number
    unit?: string
    disabled?: boolean
  }>(),
  {
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
  }
)

const emits = defineEmits<{
  "update:modelValue": [value: number[]]
}>()

const currentValue = computed(() => props.modelValue ?? [props.min, props.max])

const displayValue = computed(() => {
  const [low, high] = currentValue.value
  const u = props.unit ?? ""
  return `${u}${low} — ${u}${high}`
})
</script>

<template>
  <div
    data-slot="filter-range-item"
    :class="
      cn(
        'flex flex-col gap-3 rounded-md px-3 py-2.5',
        props.disabled && 'pointer-events-none opacity-50',
        props.class
      )
    "
  >
    <div class="flex items-center justify-between">
      <label v-if="label" class="text-sm font-medium leading-none text-foreground">
        {{ label }}
      </label>
      <span class="text-xs tabular-nums text-muted-foreground">
        {{ displayValue }}
      </span>
    </div>
    <SliderRoot
      :model-value="currentValue"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      class="relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50"
      @update:model-value="$event && emits('update:modelValue', $event)"
    >
      <SliderTrack
        class="relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted"
      >
        <SliderRange class="absolute h-full bg-primary" />
      </SliderTrack>
      <SliderThumb
        v-for="(_, i) in currentValue"
        :key="i"
        class="block size-4 shrink-0 rounded-full border border-primary bg-background shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:outline-hidden focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50"
      />
    </SliderRoot>
  </div>
</template>
