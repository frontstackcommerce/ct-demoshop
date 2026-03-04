<script setup lang="ts">
import { ComboboxViewport, type ComboboxViewportProps, useForwardProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <ComboboxViewport v-bind="forwardedProps" :class="cn('max-h-96 sm:min-w-72', props.class)">
    <slot />
  </ComboboxViewport>
</template>
