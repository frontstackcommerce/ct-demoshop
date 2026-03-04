<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'

import {
  ComboboxAnchor,
  ComboboxTrigger,
  type ComboboxTriggerProps,
  useForwardProps,
} from 'reka-ui'

const props = defineProps<ComboboxTriggerProps>()

const forwardedProps = useForwardProps(props)
</script>

<template>
  <ComboboxTrigger
    v-bind="forwardedProps"
    class="inline-flex w-full items-center justify-between pl-0 font-medium transition-all [&[data-state=open]]:text-lg [&[data-state=open]>svg]:rotate-90"
  >
    <slot />
    <ChevronRight class="h-8 w-6 shrink-0 transition-transform duration-200" stroke-width="{1}" />
  </ComboboxTrigger>
</template>
