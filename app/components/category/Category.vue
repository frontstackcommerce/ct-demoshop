<script setup lang="ts">
const props = defineProps<{
  category: CategoryFull
}>()

const showResultControl = ref(false)
const { hideNavMenu } = useShopNav()

watch(showResultControl, (isOpen) => {
  hideNavMenu.value = isOpen
})

const { result, state, searchTerm, sortResult, filterResult, resetFilter } = useFronticSearch(
  'ProductSearch',
  { categoryKey: props.category.key },
)

function handleResetFilter(filterField?: string) {
  resetFilter(filterField as any)
}

function handleFilterResult(filterField: string, filterOptions: string[]) {
  filterResult(filterField as any, filterOptions as any)
}

function handleSortResult(sortBy: string) {
  sortResult(sortBy as any)
}
</script>

<template>
  <div>
    <CategoryContent :category="category" />

    <div class="container mx-auto max-w-7xl px-6 py-12 lg:px-12 lg:py-20">
      <!-- Toolbar -->
      <div
        class="border-border flex flex-col justify-between gap-4 border-b pb-8 sm:flex-row sm:items-center"
      >
        <div class="flex items-center gap-6">
          <p v-if="state.available.count.result" class="text-muted-foreground text-sm">
            Showing
            <span class="text-foreground font-medium">{{ result?.items?.length || 0 }}</span> of
            <span class="text-foreground font-medium">{{ state.available.count.result }}</span>
            products
          </p>

          <!-- Active Filter Tags -->
          <div
            v-if="state.active.count.filter && state.active.count.filter > 0"
            class="hidden items-center gap-2 lg:flex"
          >
            <button
              class="text-primary hover:text-primary/80 text-xs font-medium transition-colors"
              @click="handleResetFilter()"
            >
              Clear all filters
            </button>
          </div>
        </div>

        <SearchControlSheet
          v-model:open="showResultControl"
          :available-filters="state.available.filter ?? []"
          :available-sorts="state.available.sorting ?? []"
          :current-filter="state.active.filter ?? {}"
          :search-term="searchTerm"
          :total-results="state.available.count.result ?? 0"
          :active-filter-count="state.active.count.filter ?? 0"
          @reset-filter="handleResetFilter"
          @filter-result="handleFilterResult"
          @sort-result="handleSortResult"
          @update-search="searchTerm = String($event).trim()"
          @close-control="showResultControl = false"
        />
      </div>

      <!-- Product Grid with Quick View -->
      <div v-if="result?.items && result.items.length > 0" class="pt-12">
        <ProductGrid :products="result.items" :columns="4" />
      </div>

      <!-- Empty State -->
      <div v-else class="flex flex-col items-center justify-center py-32 text-center">
        <div class="bg-warm-100 mb-8 flex h-24 w-24 items-center justify-center rounded-full">
          <IconPackage class="text-muted-foreground/50 size-12" />
        </div>
        <h3 class="text-foreground mb-3 font-serif text-2xl">No products found</h3>
        <p class="text-muted-foreground mb-8 max-w-md font-light">
          We couldn't find any products matching your current filters. Try adjusting your selection
          or clearing all filters.
        </p>
        <Button
          variant="outline"
          class="border-foreground/20 hover:border-foreground h-12 px-8 text-sm font-medium tracking-wide uppercase hover:bg-transparent"
          @click="handleResetFilter()"
        >
          Clear all filters
        </Button>
      </div>

      <!-- Pagination placeholder -->
      <div
        v-if="
          result?.items &&
          result.items.length > 0 &&
          state.available.count.result &&
          state.available.count.result > result.items.length
        "
        class="flex justify-center pt-16"
      >
        <p class="text-muted-foreground text-sm">
          Showing {{ result.items.length }} of {{ state.available.count.result }} products
        </p>
      </div>
    </div>
  </div>
</template>
