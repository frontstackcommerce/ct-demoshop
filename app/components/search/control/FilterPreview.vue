<script setup lang="ts">
defineProps<{
  selectedOptions: FilterGroup
}>()
</script>

<template>
  <template v-if="selectedOptions.length > 0">
    <div class="flex items-center gap-2">
      <span
        class="bg-foreground text-background inline-flex items-center px-2.5 py-1 text-xs font-medium tracking-wide"
      >
        {{ selectedOptions[0]?.option }}
      </span>
      <span
        v-if="selectedOptions.length > 1"
        class="text-primary inline-flex items-center text-xs font-medium"
      >
        +{{ selectedOptions.length - 1 }}
      </span>
    </div>
  </template>
</template>
