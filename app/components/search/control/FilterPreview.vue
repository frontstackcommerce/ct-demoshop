<script setup lang="ts">
defineProps<{
  selectedOptions: FilterGroup
}>()
</script>

<template>
  <template v-if="selectedOptions.length > 0">
    <div class="flex items-center gap-3">
      <div class="border border-border px-3 py-1 text-xs font-medium uppercase">
        {{ selectedOptions[0]?.option }}
      </div>
      <div v-if="selectedOptions.length > 1" class="flex items-center gap-1 text-muted-foreground">
        <IconPlus class="size-3" />
        <span class="text-sm">{{ selectedOptions.length - 1 }}</span>
      </div>
    </div>
  </template>
</template>
