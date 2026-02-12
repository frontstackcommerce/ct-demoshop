<script setup lang="ts">
const props = defineProps<{
  category: CategoryFull
}>()

const showResultControl = ref(false)
const { hideNavMenu } = useShopNav()

watch(showResultControl, (isOpen) => {
  hideNavMenu.value = isOpen
})

const { listing, state, searchTerm, sortItems, filterItems, resetFilter } = useProductSearch(
  props.category.key
)

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
  <div>
    <CategoryContent :category="category" />
    
    <div class="container mx-auto px-6 lg:px-12 max-w-7xl py-12 lg:py-16">
      <!-- Toolbar -->
      <div class="flex items-center justify-between pb-8 border-b border-border">
        <p v-if="state.total" class="text-sm text-muted-foreground">
          <span class="text-foreground font-medium">{{ state.total }}</span> products
        </p>
        
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
      
      <!-- Product Grid -->
      <div v-if="listing?.items" class="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 md:grid-cols-3 lg:grid-cols-4 pt-10">
        <ProductCard v-for="product in listing?.items" :key="product.key" :product="product" />
      </div>
      
      <!-- Empty State -->
      <div v-else class="flex flex-col items-center justify-center py-24 text-center">
        <div class="w-20 h-20 rounded-full bg-shade flex items-center justify-center mb-6">
          <IconPackage class="size-10 text-muted-foreground" />
        </div>
        <h3 class="text-xl font-medium text-foreground mb-2">No products found</h3>
        <p class="text-muted-foreground font-light max-w-md">
          Try adjusting your filters or search terms to find what you're looking for.
        </p>
        <Button variant="outline" class="mt-6" @click="handleResetFilter()">
          Clear all filters
        </Button>
      </div>
    </div>
  </div>
</template>
