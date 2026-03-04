<script setup lang="ts">
import type { ComboboxViewportProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ComboboxViewport, useForwardProps } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<
  ComboboxViewportProps & {
    class?: HTMLAttributes["class"]
  }
>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <ComboboxViewport
    data-slot="filter-list"
    v-bind="forwardedProps"
    :class="cn('max-h-96 sm:min-w-72', props.class)"
  >
    <slot />
  </ComboboxViewport>
</template>
