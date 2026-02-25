<script setup lang="ts">
import type { AccordionItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { VariantProps } from "class-variance-authority"
import { inject } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { AccordionItem, useForwardProps } from "reka-ui"
import { cn } from "@/lib/utils"
import { accordionVariants } from "."

type AccordionVariants = VariantProps<typeof accordionVariants>

const props = defineProps<
  AccordionItemProps & {
    class?: HTMLAttributes["class"]
    variant?: AccordionVariants["variant"]
  }
>()

const context = inject<AccordionVariants>("accordion", { variant: undefined })

const delegatedProps = reactiveOmit(props, "class", "variant")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <AccordionItem
    v-slot="slotProps"
    data-slot="accordion-item"
    v-bind="forwardedProps"
    :class="
      cn(
        accordionVariants({
          variant: context?.variant || variant,
        }),
        'last:border-b-0',
        props.class,
      )
    "
  >
    <slot v-bind="slotProps" />
  </AccordionItem>
</template>
