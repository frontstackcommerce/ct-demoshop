<script setup lang="ts">
import type { AccordionRootEmits, AccordionRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { VariantProps } from "class-variance-authority"
import { provide } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { AccordionRoot, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"
import type { accordionVariants } from "."

type AccordionVariants = VariantProps<typeof accordionVariants>

const props = defineProps<
  AccordionRootProps & {
    class?: HTMLAttributes["class"]
    variant?: AccordionVariants["variant"]
  }
>()
const emits = defineEmits<AccordionRootEmits>()

provide("accordion", {
  variant: props.variant,
})

const delegatedProps = reactiveOmit(props, "class", "variant")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <AccordionRoot
    v-slot="slotProps"
    data-slot="accordion"
    v-bind="forwarded"
    :class="cn('flex w-full max-w-full flex-col gap-2', props.class)"
  >
    <slot v-bind="slotProps" />
  </AccordionRoot>
</template>
