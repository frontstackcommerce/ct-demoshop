<script setup lang="ts">
const props = defineProps<{
  category: CategoryFull
}>()

const showResultControl = ref(false)
const { hideNavMenu } = useShopNav()

// Hide/show nav menu when sheet opens/closes
watch(showResultControl, (isOpen) => {
  hideNavMenu.value = isOpen
})

const { listing, state, searchTerm, sortItems, filterItems, resetFilter } = useProductSearch(
  props.category.key
)

// Wrapper functions to handle string-to-typed conversions from UI components
function handleResetFilter(filterField?: string) {
  resetFilter(filterField as any)
}

function handleFilterResult(filterField: string, filterOptions: string[]) {
  filterItems(filterField as any, filterOptions as any)
}

function handleSortResult(sortBy: string) {
  sortItems(sortBy as any)
}
</script>

<template>
  <CategoryContent :category="category" />
  <div class="mx-auto my-12 max-w-6xl px-5">
    <div class="flex items-center justify-between">
      <h1 class="font-display text-3xl font-light">{{ category.name }}</h1>
      <SearchControlSheet
        v-model:open="showResultControl"
        :available-filters="state.availableFilters ?? []"
        :available-sorts="state.availableSorts ?? []"
        :current-filter="state.filter ?? {}"
        :search-term="searchTerm"
        :total-results="state.total ?? 0"
        :active-filter-count="state.activeFilterCount ?? 0"
        @reset-filter="handleResetFilter"
        @filter-result="handleFilterResult"
        @sort-result="handleSortResult"
        @update-search="searchTerm = String($event).trim()"
        @close-control="showResultControl = false"
      />
    </div>
    <div v-if="listing?.items" class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <ProductCard v-for="product in listing?.items" :key="product.key" :product="product" />
    </div>
  </div>
</template>
