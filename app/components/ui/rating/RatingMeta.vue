<script setup lang="ts">
const props = defineProps<{
  rating: number
  max: number
  count?: number
}>()
</script>

<template>
  <div data-slot="rating-meta" class="ml-2 flex items-baseline gap-1">
    <span>{{ props.rating }}/{{ props.max }}</span>
    <span v-if="props.count" class="text-xs text-muted-foreground">({{ props.count }})</span>
  </div>
</template>
