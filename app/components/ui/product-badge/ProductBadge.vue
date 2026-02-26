<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ProductBadgeVariants } from '.'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { productBadgeVariants } from '.'

interface Props extends PrimitiveProps {
  type?: ProductBadgeVariants['type']
  variant?: ProductBadgeVariants['variant']
  size?: ProductBadgeVariants['size']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'span',
})
</script>

<template>
  <Primitive
    data-slot="product-badge"
    :data-type="type"
    :data-variant="variant"
    :data-size="size"
    :as="as"
    :as-child="asChild"
    :class="cn(productBadgeVariants({ type, variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
