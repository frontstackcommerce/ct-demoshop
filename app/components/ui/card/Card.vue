<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="card"
    :class="
      cn('bg-card text-card-foreground flex flex-col gap-6 border py-6 shadow-sm', props.class)
    "
  >
    <slot />
  </div>
</template>
