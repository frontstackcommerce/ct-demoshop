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
    class="size-6 border"
    :class="
      cn('border-foreground bg-background', {
        'border-shade-300': props.disabled,
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
        class="bg-inverted text-inverted-foreground flex min-h-full min-w-full items-center justify-center"
      >
        <IconCheck class="size-4" :stroke-width="4" />
      </div>
    </ComboboxItemIndicator>
  </span>
</template>
