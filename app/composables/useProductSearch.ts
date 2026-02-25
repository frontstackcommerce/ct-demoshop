export function useProductSearch(categoryKey?: string) {
  const params = computed(() => (categoryKey ? { categoryKey } : {}))

  const { data, result, state: searchState, searchTerm, addFilter: _addFilter, filterResult, resetFilter: fronticResetFilter, sortResult } = useFronticSearch('ProductSearch', params)

  const listing = computed(() => {
    if (!data.value) return null
    return {
      items: result.value ?? [],
      total: data.value?._page?.total ?? 0,
    }
  })

  const state = computed(() => ({
    availableFilters: searchState.value?.filter ?? [],
    availableSorts: searchState.value?.sort ?? [],
    filter: searchState.value?.activeFilter ?? {},
    activeFilterCount: searchState.value?.activeFilterCount ?? 0,
    total: data.value?._page?.total ?? 0,
  }))

  const sortItems = (sortBy: string) => sortResult(sortBy)

  const filterItems = (field: string, options: string[]) => {
    filterResult(field, options)
  }

  const resetFilter = (field?: string) => fronticResetFilter(field)

  return { listing, state, searchTerm, sortItems, filterItems, resetFilter }
}
