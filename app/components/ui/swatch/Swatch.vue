<script setup lang="ts">
import type { ToggleEmits, ToggleProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Toggle, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"
import { type SwatchVariants, swatchVariants } from "."

const props = withDefaults(
  defineProps<
    ToggleProps & {
      class?: HTMLAttributes["class"]
      variant?: SwatchVariants["variant"]
      size?: SwatchVariants["size"]
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

const emits = defineEmits<ToggleEmits>()

const delegatedProps = reactiveOmit(props, "class", "size", "variant", "color", "image")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <Toggle
    data-slot="swatch"
    v-bind="forwarded"
    :class="cn(swatchVariants({ variant, size }), props.class)"
  >
    <slot v-if="props.color">
      <div
        class="m-px h-full w-full border-4 border-background"
        :class="[props.variant === 'circle' ? 'rounded-full' : 'rounded-md']"
        :style="{ backgroundColor: props.color }"
      />
    </slot>

    <slot v-else-if="props.image">
      <img
        :src="props.image"
        class="h-full w-full border-4 border-background object-cover"
        :class="[props.variant === 'circle' ? 'rounded-full' : 'rounded-md']"
      />
    </slot>

    <slot v-else />
  </Toggle>
</template>
