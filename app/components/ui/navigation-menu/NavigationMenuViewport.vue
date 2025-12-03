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
  <div class="absolute top-full left-0 flex w-full justify-start bg-amber-300">
    <NavigationMenuViewport
      v-bind="forwardedProps"
      :class="
        cn(
          'origin-top-center text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative h-[calc(100vh-10rem)] w-full overflow-hidden rounded-b-md border bg-blue-300 shadow-xl',
          'menu-animation',
          props.class
        )
      "
    />
  </div>
</template>

<style>
.menu-animation {
  transform-origin: top;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-animation[data-state='open'] {
  animation: expand 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.menu-animation[data-state='closed'] {
  animation: collapse 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes expand {
  0% {
    opacity: 0;
    transform: scaleY(0);
  }
  100% {
    opacity: 1;
    transform: scaleY(1);
  }
}

@keyframes collapse {
  0% {
    opacity: 1;
    transform: scaleY(1);
  }
  100% {
    opacity: 0;
    transform: scaleY(0);
  }
}

/* Optional: Add backdrop blur effect */
.menu-animation[data-state='open']::before {
  content: '';
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(4px);
  z-index: -1;
  opacity: 1;
  transition: opacity 0.4s ease;
}

.menu-animation[data-state='closed']::before {
  opacity: 0;
}
</style>
