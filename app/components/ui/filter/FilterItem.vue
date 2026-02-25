<script setup lang="ts">
import type { ComboboxItemEmits, ComboboxItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ComboboxItem, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"

export interface FilterOption {
  option: string
  count?: number
}

const props = defineProps<
  ComboboxItemProps & {
    class?: HTMLAttributes["class"]
    option?: FilterOption
  }
>()
const emits = defineEmits<ComboboxItemEmits>()

const delegatedProps = reactiveOmit(props, "class", "option")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ComboboxItem
    v-slot="slotProps"
    data-slot="filter-item"
    v-bind="forwarded"
    :class="
      cn(
        'relative flex h-6 cursor-pointer select-none items-center rounded-sm px-3 py-5 leading-none text-foreground data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[disabled]:text-muted-foreground data-[highlighted]:text-accent-foreground data-[highlighted]:outline-none',
        props.class
      )
    "
  >
    <slot v-bind="slotProps" />
    <template v-if="option">
      <span class="ml-3 flex flex-grow capitalize">{{ option.option }}</span>
      <span v-if="option.count !== undefined">{{ option.count }}</span>
    </template>
  </ComboboxItem>
</template>
