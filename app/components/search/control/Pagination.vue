<script setup lang="ts">
import { ArrowUp, SlidersHorizontal } from 'lucide-vue-next'

const props = defineProps<{
  loadedItems: number
  totalItems: number
  hasNextPage: boolean
  filterCount: number
}>()

const emit = defineEmits<{
  loadMore: []
  filterResult: []
  scrollTop: []
}>()

const progress = computed(() => {
  if (!props.totalItems) return 0
  return Math.round((props.loadedItems / props.totalItems) * 100)
})
</script>

<template>
  <div class="mx-auto flex max-w-md flex-col items-center gap-4">
    <div class="w-full space-y-2">
      <ClientOnly>
        <Progress :model-value="progress" class="h-1.5 w-full" />
      </ClientOnly>
      <p class="text-center text-sm text-muted-foreground">
        {{ $t('control.pagination.showed', { count: loadedItems, total: totalItems }) }}
      </p>
    </div>

    <Button
      v-if="hasNextPage && loadedItems < totalItems"
      size="lg"
      class="w-full"
      @click="emit('loadMore')"
    >
      {{ $t('control.pagination.next') }}
    </Button>

    <div class="flex w-full items-center gap-3">
      <Button
        variant="outline"
        size="sm"
        class="flex-1"
        @click="emit('filterResult')"
      >
        <SlidersHorizontal class="size-4" />
        {{
          filterCount > 0
            ? $t('control.pagination.edit-filter')
            : $t('control.pagination.add-filter')
        }}
      </Button>
      <Button
        variant="outline"
        size="sm"
        class="flex-1"
        @click="emit('scrollTop')"
      >
        <ArrowUp class="size-4" />
        {{ $t('control.pagination.goto-top') }}
      </Button>
    </div>
  </div>
</template>
