<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { BadgeVariants } from "."
import { reactiveOmit } from "@vueuse/core"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"
import { badgeVariants } from "."

const props = defineProps<PrimitiveProps & {
  variant?: BadgeVariants["variant"]
  color?: BadgeVariants["color"]
  size?: BadgeVariants["size"]
  class?: HTMLAttributes["class"]
}>()

const delegatedProps = reactiveOmit(props, "class", "variant", "color", "size")
</script>

<template>
  <Primitive
    data-slot="badge"
    :class="cn(badgeVariants({ variant, color, size }), props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </Primitive>
</template>
