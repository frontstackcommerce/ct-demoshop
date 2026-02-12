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
    
    <div class="container mx-auto px-6 lg:px-12 max-w-7xl py-12 lg:py-20">
      <!-- Toolbar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-border">
        <div class="flex items-center gap-6">
          <p v-if="state.total" class="text-sm text-muted-foreground">
            Showing <span class="text-foreground font-medium">{{ listing?.items?.length || 0 }}</span> 
            of <span class="text-foreground font-medium">{{ state.total }}</span> products
          </p>
          
          <!-- Active Filter Tags -->
          <div v-if="state.activeFilterCount && state.activeFilterCount > 0" class="hidden lg:flex items-center gap-2">
            <button 
              class="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
              @click="handleResetFilter()"
            >
              Clear all filters
            </button>
          </div>
        </div>
        
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
      <div v-if="listing?.items && listing.items.length > 0" class="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14 md:grid-cols-3 lg:grid-cols-4 pt-12">
        <ProductCard v-for="product in listing?.items" :key="product.key" :product="product" />
      </div>
      
      <!-- Empty State -->
      <div v-else class="flex flex-col items-center justify-center py-32 text-center">
        <div class="w-24 h-24 rounded-full bg-warm-100 flex items-center justify-center mb-8">
          <IconPackage class="size-12 text-muted-foreground/50" />
        </div>
        <h3 class="font-serif text-2xl text-foreground mb-3">No products found</h3>
        <p class="text-muted-foreground font-light max-w-md mb-8">
          We couldn't find any products matching your current filters. Try adjusting your selection or clearing all filters.
        </p>
        <Button 
          variant="outline" 
          class="h-12 px-8 text-sm font-medium tracking-wide uppercase border-foreground/20 hover:border-foreground hover:bg-transparent"
          @click="handleResetFilter()"
        >
          Clear all filters
        </Button>
      </div>
      
      <!-- Pagination placeholder -->
      <div v-if="listing?.items && listing.items.length > 0 && state.total && state.total > listing.items.length" class="flex justify-center pt-16">
        <p class="text-sm text-muted-foreground">
          Showing {{ listing.items.length }} of {{ state.total }} products
        </p>
      </div>
    </div>
  </div>
</template>
