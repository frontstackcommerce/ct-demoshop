<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Toggle } from "reka-ui"
import { cn } from "@/lib/utils"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    color: string
    label?: string
    count?: number
    selected?: boolean
    disabled?: boolean
  }>(),
  {
    selected: false,
    disabled: false,
  }
)

const emits = defineEmits<{
  toggle: []
}>()
</script>

<template>
  <button
    data-slot="filter-swatch-item"
    type="button"
    :disabled="disabled"
    :class="
      cn(
        'group flex flex-col items-center gap-1.5 rounded-md p-1.5 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
        props.class
      )
    "
    @click="emits('toggle')"
  >
    <span
      class="inline-flex size-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors"
      :class="[
        selected
          ? 'border-foreground ring-2 ring-foreground/20'
          : 'border-border group-hover:border-muted-foreground',
      ]"
    >
      <span
        class="size-5 rounded-full"
        :style="{ backgroundColor: color }"
      />
    </span>
    <span v-if="label" class="text-[10px] leading-tight text-muted-foreground">
      {{ label }}
    </span>
    <span v-if="count !== undefined" class="text-[10px] leading-tight text-muted-foreground/70">
      {{ count }}
    </span>
  </button>
</template>
