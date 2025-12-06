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
        'text-foreground data-[highlighted]:bg-accent data-[disabled]:text-muted-foreground data-[highlighted]:text-accent-foreground relative flex h-6 cursor-pointer items-center px-3 py-5 leading-none select-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none',
        props.class
      )
    "
  >
    <slot />
    <span class="ml-3 flex flex-grow capitalize"> {{ option.option }}</span>
    <span> {{ option.count }} </span>
  </ComboboxItem>
</template>
