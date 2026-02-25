// TODO: Replace with Frontic search composable
export function useProductSearch(_categoryKey?: string) {
  const listing = ref<{ items: ProductCard[]; total: number } | null>(null)
  const searchTerm = ref('')
  const state = ref({
    availableFilters: [] as UiFilter[],
    availableSorts: [] as UiSort[],
    filter: {} as Record<string, unknown>,
    activeFilterCount: 0,
    total: 0,
  })

  const sortItems = (_sortBy: string) => {
    // stub
  }

  const filterItems = (_filterField: string, _filterOptions: string[]) => {
    // stub
  }

  const resetFilter = (_filterField?: string) => {
    // stub
  }

  return {
    listing,
    state,
    searchTerm,
    sortItems,
    filterItems,
    resetFilter,
  }
}
