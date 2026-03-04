<script setup lang="ts">
import type { ComboboxRootEmits, ComboboxRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ComboboxRoot, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<
  ComboboxRootProps & {
    class?: HTMLAttributes["class"]
  }
>()
const emits = defineEmits<ComboboxRootEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ComboboxRoot
    v-slot="slotProps"
    data-slot="filter"
    v-bind="forwarded"
    :class="
      cn(
        'overflow-hidden rounded-md border border-border bg-popover p-2 text-popover-foreground shadow-md sm:min-w-72',
        props.class
      )
    "
  >
    <slot v-bind="slotProps" />
  </ComboboxRoot>
</template>
