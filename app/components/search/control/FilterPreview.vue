<script setup lang="ts">
defineProps<{
  selectedOptions: FilterGroup
}>()
</script>

<template>
  <template v-if="selectedOptions.length > 0">
    <div class="flex items-center gap-2">
      <span
        class="inline-flex items-center bg-foreground px-2.5 py-1 text-xs font-medium tracking-wide text-background"
      >
        {{ selectedOptions[0]?.option }}
      </span>
      <span
        v-if="selectedOptions.length > 1"
        class="inline-flex items-center text-xs font-medium text-primary"
      >
        +{{ selectedOptions.length - 1 }}
      </span>
    </div>
  </template>
</template>
