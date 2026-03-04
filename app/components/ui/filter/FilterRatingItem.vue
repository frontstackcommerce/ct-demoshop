<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { Star } from "lucide-vue-next"
import { cn } from "@/lib/utils"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    modelValue?: number
    label?: string
    max?: number
    disabled?: boolean
  }>(),
  {
    modelValue: 0,
    max: 5,
    disabled: false,
  }
)

const emits = defineEmits<{
  "update:modelValue": [value: number]
}>()

const filledStars = computed(() => Math.max(0, Math.min(props.modelValue, props.max)))

function selectRating(star: number) {
  if (props.disabled) return
  // Click same star to deselect
  emits("update:modelValue", star === props.modelValue ? 0 : star)
}
</script>

<template>
  <div
    data-slot="filter-rating-item"
    :class="
      cn(
        'flex flex-col gap-2 rounded-md px-3 py-2.5',
        props.disabled && 'pointer-events-none opacity-50',
        props.class
      )
    "
  >
    <label v-if="label" class="text-sm font-medium leading-none text-foreground">
      {{ label }}
    </label>
    <div class="flex items-center gap-1">
      <button
        v-for="i in max"
        :key="i"
        type="button"
        class="shrink-0 cursor-pointer rounded-sm p-0.5 transition-colors hover:text-yellow-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        :aria-label="`${i} star${i > 1 ? 's' : ''} and up`"
        @click="selectRating(i)"
      >
        <Star
          class="size-5"
          :class="[
            i <= filledStars
              ? 'fill-yellow-400 stroke-yellow-400'
              : 'fill-transparent stroke-muted-foreground',
          ]"
        />
      </button>
      <span v-if="filledStars > 0" class="ml-1.5 text-xs text-muted-foreground">
        & up
      </span>
    </div>
  </div>
</template>
