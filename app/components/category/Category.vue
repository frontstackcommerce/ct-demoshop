<script setup lang="ts">
import { Package } from 'lucide-vue-next'

const props = defineProps<{
  category: CategoryFull
}>()

const { result, sortResult, filterResult, resetFilter } = useFronticSearch(
  'CategoryProducts',
  { key: props.category.key },
)

function handleResetFilter(filterField?: string) {
  resetFilter(filterField as any)
}

function _handleFilterResult(filterField: string, filterOptions: string[]) {
  filterResult(filterField as any, filterOptions as any)
}

function _handleSortResult(sortBy: string) {
  sortResult(sortBy as any)
}
</script>

<template>
  <div>
    <CategoryContent :category="category" />

    <div class="container mx-auto max-w-7xl px-6 py-12 lg:px-12 lg:py-20">
      <div
        class="flex flex-col justify-between gap-4 border-b border-border pb-8 sm:flex-row sm:items-center"
      >
        <div class="flex items-center gap-6">
          <p v-if="result?.items" class="text-sm text-muted-foreground">
            {{
              $t('control.pagination.showed', {
                count: result?.items?.length || 0,
                total: result?.items?.length || 0,
              })
            }}
          </p>
        </div>
      </div>

      <div v-if="result?.items && result.items.length > 0" class="pt-12">
        <ProductGrid :products="result.items" :columns="4" />
      </div>

      <div v-else class="flex flex-col items-center justify-center py-32 text-center">
        <div class="mb-8 flex size-24 items-center justify-center rounded-full bg-warm-100">
          <Package class="size-12 text-muted-foreground/50" />
        </div>
        <h3 class="mb-3 font-serif text-2xl text-foreground">
          {{ $t('listing.counter', { count: 0 }) }}
        </h3>
        <p class="mb-8 max-w-md font-light text-muted-foreground">
          {{ $t('error.not-found.description') }}
        </p>
        <Button
          variant="outline"
          class="h-12 border-foreground/20 px-8 text-sm font-medium uppercase tracking-wide hover:border-foreground hover:bg-transparent"
          @click="handleResetFilter()"
        >
          {{ $t('control.reset') }}
        </Button>
      </div>
    </div>
  </div>
</template>
