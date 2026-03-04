<script setup lang="ts">
import type { ComboboxInputProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ComboboxInput, useForwardProps } from "reka-ui"
import { Search } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<
  ComboboxInputProps & {
    class?: HTMLAttributes["class"]
  }
>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <div data-slot="filter-input-wrapper" class="my-1.5 flex items-center border px-3">
    <Search class="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <ComboboxInput
      data-slot="filter-input"
      v-bind="{ ...forwardedProps, ...$attrs }"
      auto-focus
      :class="
        cn(
          'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          props.class
        )
      "
    />
  </div>
</template>
