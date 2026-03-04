<script setup lang="ts">
import type { ComboboxItemEmits, ComboboxItemProps } from 'reka-ui'
import { ComboboxItem, useForwardPropsEmits } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<ComboboxItemProps & { class?: HTMLAttributes['class']; option: any }>()
const emits = defineEmits<ComboboxItemEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ComboboxItem
    v-bind="forwarded"
    :class="
      cn(
        'text-foreground data-highlighted:bg-warm-200 data-disabled:text-muted-foreground/40 relative flex cursor-pointer items-center px-3 py-3 leading-none select-none data-disabled:pointer-events-none data-highlighted:outline-none rounded-sm transition-colors',
        props.class
      )
    "
  >
    <slot />
    <span class="ml-3 flex flex-grow text-sm font-light capitalize">{{ option.option }}</span>
    <span class="text-xs text-muted-foreground tabular-nums">{{ option.count }}</span>
  </ComboboxItem>
</template>
