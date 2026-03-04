<script setup lang="ts">
import type { ToggleGroupRootEmits, ToggleGroupRootProps } from "reka-ui"
import type { VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "vue"
import type { swatchVariants } from "@/components/ui/swatch"
import { reactiveOmit } from "@vueuse/core"
import { ToggleGroupRoot, useForwardPropsEmits } from "reka-ui"
import { provide } from "vue"
import { cn } from "@/lib/utils"

type SwatchGroupVariants = VariantProps<typeof swatchVariants>

const props = defineProps<
  ToggleGroupRootProps & {
    class?: HTMLAttributes["class"]
    variant?: SwatchGroupVariants["variant"]
    size?: SwatchGroupVariants["size"]
  }
>()
const emits = defineEmits<ToggleGroupRootEmits>()

provide("swatchGroup", {
  variant: props.variant,
  size: props.size,
})

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ToggleGroupRoot
    data-slot="swatch-group"
    v-bind="forwarded"
    :class="cn('flex flex-wrap gap-3 md:gap-2', props.class)"
  >
    <slot />
  </ToggleGroupRoot>
</template>
