<script setup lang="ts">
import { NavigationMenuViewport, type NavigationMenuViewportProps, useForwardProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<NavigationMenuViewportProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <div class="absolute top-full left-0 flex w-full justify-center perspective-[2000px]">
    <NavigationMenuViewport
      v-bind="forwardedProps"
      :class="
        cn(
          'relative mt-2 w-full max-w-5xl overflow-hidden rounded-lg border border-border/50 bg-background shadow-2xl shadow-black/10',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2',
          'duration-200 ease-out',
          props.class
        )
      "
    />
  </div>
</template>
