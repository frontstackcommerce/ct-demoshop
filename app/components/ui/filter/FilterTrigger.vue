<script setup lang="ts">
import type { ComboboxTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ComboboxTrigger, useForwardProps } from "reka-ui"
import { ChevronRight } from "lucide-vue-next"
import { cn } from "@/lib/utils"

const props = defineProps<
  ComboboxTriggerProps & {
    class?: HTMLAttributes["class"]
  }
>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <ComboboxTrigger
    data-slot="filter-trigger"
    v-bind="forwardedProps"
    :class="
      cn(
        'inline-flex w-full items-center justify-between pl-0 font-medium transition-all [&[data-state=open]>svg]:rotate-90 [&[data-state=open]]:text-lg',
        props.class
      )
    "
  >
    <slot />
    <ChevronRight class="h-8 w-6 shrink-0 transition-transform duration-200" :stroke-width="1" />
  </ComboboxTrigger>
</template>
