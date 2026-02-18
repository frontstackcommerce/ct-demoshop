<script setup lang="ts">
defineProps<{
  selectedOptions: FilterGroup
}>()
</script>

<template>
  <template v-if="selectedOptions.length > 0">
    <div class="flex items-center gap-2">
      <span class="inline-flex items-center bg-foreground text-background px-2.5 py-1 text-xs font-medium tracking-wide">
        {{ selectedOptions[0]?.option }}
      </span>
      <span 
        v-if="selectedOptions.length > 1" 
        class="inline-flex items-center text-xs text-primary font-medium"
      >
        +{{ selectedOptions.length - 1 }}
      </span>
    </div>
  </template>
</template>
