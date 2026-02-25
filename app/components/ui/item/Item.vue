<script setup lang="ts">
defineProps<{
  asChild?: boolean
  variant?: string
}>()
</script>

<template>
  <div role="listitem">
    <slot />
  </div>
</template>
