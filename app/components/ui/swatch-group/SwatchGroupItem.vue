<script setup lang="ts">
import type { ToggleGroupItemProps } from "reka-ui"
import type { VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ToggleGroupItem, useForwardProps } from "reka-ui"
import { inject } from "vue"
import { cn } from "@/lib/utils"
import { swatchVariants } from "@/components/ui/swatch"

type SwatchGroupVariants = VariantProps<typeof swatchVariants>

const props = withDefaults(
  defineProps<
    ToggleGroupItemProps & {
      class?: HTMLAttributes["class"]
      variant?: SwatchGroupVariants["variant"]
      size?: SwatchGroupVariants["size"]
      color?: string
      image?: string
    }
  >(),
  {
    variant: "default",
    size: "md",
    disabled: false,
  },
)

const context = inject<SwatchGroupVariants>("swatchGroup")

const delegatedProps = reactiveOmit(props, "class", "variant", "size", "color", "image")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <ToggleGroupItem
    data-slot="swatch-group-item"
    v-bind="forwardedProps"
    :class="
      cn(
        swatchVariants({
          variant: context?.variant || variant,
          size: context?.size || size,
        }),
        props.class,
      )
    "
  >
    <slot v-if="props.color">
      <div
        class="m-px h-full w-full border-4 border-background"
        :class="[(context?.variant || variant) === 'circle' ? 'rounded-full' : 'rounded-md']"
        :style="{ backgroundColor: props.color }"
      />
    </slot>

    <slot v-else-if="props.image">
      <img
        :src="props.image"
        class="h-full w-full border border-background object-cover"
        :class="[(context?.variant || variant) === 'circle' ? 'rounded-full' : 'rounded-md']"
      />
    </slot>

    <slot v-else />
  </ToggleGroupItem>
</template>
