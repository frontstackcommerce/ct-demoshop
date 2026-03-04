<script setup lang="ts">
import type { ComboboxItemIndicatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ComboboxItemIndicator, useForwardProps } from "reka-ui"
import { Check } from "lucide-vue-next"
import { cn } from "@/lib/utils"

const props = defineProps<
  ComboboxItemIndicatorProps & {
    class?: HTMLAttributes["class"]
    disabled?: boolean
  }
>()

const delegatedProps = reactiveOmit(props, "class", "disabled")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <span
    data-slot="filter-indicator"
    class="size-6 border"
    :class="
      cn('border-foreground bg-background', {
        'border-shade-300': props.disabled,
      })
    "
  >
    <ComboboxItemIndicator
      v-bind="forwardedProps"
      :class="
        cn(
          'data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in',
          props.class
        )
      "
    >
      <div
        class="flex min-h-full min-w-full items-center justify-center bg-inverted text-inverted-foreground"
      >
        <Check class="size-4" :stroke-width="4" />
      </div>
    </ComboboxItemIndicator>
  </span>
</template>
