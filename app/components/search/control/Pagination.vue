<script setup lang="ts">
const props = defineProps<{
  loadedItems: number
  totalItems: number
  loadedChunks: number
  filterCount: number
}>()

const emit = defineEmits<{
  (e: 'loadMore' | 'filterResult' | 'scrollTop'): void
}>()

const progress = computed(() => {
  return (props.loadedItems / props.totalItems) * 100
})
</script>

<template>
  <div class="mx-auto flex flex-col gap-3">
    <Progress v-model="progress" class="mx-auto w-2/3 max-sm:h-4 sm:mx-0 sm:w-full" />
    <p class="mx-auto text-sm text-muted-foreground sm:text-xs">
      {{ $t('control.pagination.showed', { count: loadedItems, total: totalItems }) }}
    </p>
    <Button
      v-if="loadedChunks >= 0"
      class="w-full max-sm:py-8 max-sm:text-base"
      size="xl"
      @click="emit('loadMore')"
      >{{ $t('control.pagination.next') }}</Button
    >
    <div class="mt-4 flex items-center gap-4">
      <Button
        class="flex w-full items-center gap-2 rounded-full"
        variant="outline"
        @click="emit('filterResult')"
        ><IconSettings2 class="size-4" />
        {{
          filterCount > 0
            ? $t('control.pagination.edit-filter')
            : $t('control.pagination.add-filter')
        }}</Button
      >
      <Button
        class="flex w-full items-center gap-2 rounded-full"
        variant="outline"
        @click="emit('scrollTop')"
        ><IconArrowUp class="size-4" /> {{ $t('control.pagination.goto-top') }}</Button
      >
    </div>
  </div>
</template>
