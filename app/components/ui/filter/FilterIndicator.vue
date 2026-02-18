<script setup lang="ts">
import { ComboboxItemIndicator, useForwardProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  disabled?: boolean
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <span
    class="size-5 border rounded-sm flex items-center justify-center shrink-0 transition-colors"
    :class="
      cn('border-border bg-background hover:border-foreground/50', {
        'border-shade-300 bg-shade': props.disabled,
      })
    "
  >
    <ComboboxItemIndicator
      v-bind="forwardedProps"
      :class="
        cn(
          'data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in',
          props.class
        )
      "
    >
      <div
        class="bg-foreground text-background flex min-h-full min-w-full items-center justify-center rounded-sm"
      >
        <IconCheck class="size-3" :stroke-width="3" />
      </div>
    </ComboboxItemIndicator>
  </span>
</template>
