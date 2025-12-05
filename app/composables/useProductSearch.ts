import client from '~~/.frontstack/generated-client'
import { useQuery, useMutation } from '@pinia/colada'
import { useDebounceFn } from '@vueuse/core'
import type { ShallowRef } from 'vue'
import type { UseQueryReturn } from '@pinia/colada'
import type { ListingQueryFilters, ListingQuerySorts } from '~~/.frontstack/generated-types'
import type { Query, Sort, EqualsFilter } from '~~/.frontstack/query-types'
import type { components } from '~~/.frontstack/fetch-api'

const LISTING_KEY = 'ProductSearch'
const RESULT_CACHE_KEY = 'ProductSearch'
const TERM_THRESHOLD = 2

type QueryFilter = ListingQueryFilters['ProductSearch']
type QuerySort = ListingQuerySorts['ProductSearch']
type SortField = keyof components['schemas']['ProductSearchQueryOptions']['sort'] & string
type SortDirection = Sort<ProductSearch>['order']
type SortBy = `${SortField}:${SortDirection}`
type FilterField = keyof components['schemas']['ProductSearchQueryOptions']['filter'] & string
type FilterMode = 'and' | 'or'
type ListingResponse = components['schemas']['ProductSearch']
type FilterValue = QueryFilter[keyof QueryFilter]

/**
 * Interface for the category listing composable
 */
interface IUseProductSearch {
  /** The current result set containing products and metadata */
  listing: ShallowRef<ProductSearch | undefined>
  /** Current fetch status of the product list */
  status: UseQueryReturn['status']
  /** Current state of the result including page, sort, search, and filter settings */
  listingState: Ref<ListingState<ProductSearch>>
  /** Current search term */
  searchTerm: Ref<string>

  // Actions
  /**
   * Loads more items in the current listing
   */
  loadMore: () => Promise<ProductSearch | undefined>

  /**
   * Fetches the listing with current query parameters
   */
  refreshListing: () => Promise<void>
  /**
   * Paginates the results in the specified direction
   * @param direction - Direction to paginate ('next' or 'prev')
   * @returns Promise<boolean> - Returns true if pagination was successful
   */
  paginate: (direction: 'next' | 'prev') => Promise<boolean>
  /**
   * Sorts the results by the specified field
   * @param sortBy - Sort field and direction (e.g., 'name:desc' or 'name:asc' or 'default')
   */
  sortListing: (sortBy: SortBy) => Promise<void>
  /**
   * Adds a filter option to the specified filter field
   * @param filterField - The field to filter on
   * @param filterOption - The option value to add
   * @param filterMode - The mode to apply the filter in ('and' or 'or')
   */
  addFilterOption: (
    filterField: FilterField,
    filterOption: FilterValue,
    filterMode?: FilterMode
  ) => Promise<void>
  /**
   * Removes a filter option from the specified filter field
   * @param filterField - The field to remove the filter from
   * @param filterOption - The option value to remove
   * @param filterMode - The mode to apply the filter in ('and' or 'or')
   */
  removeFilterOption: (
    filterField: FilterField,
    filterOption: FilterValue,
    filterMode?: FilterMode
  ) => Promise<void>
  /**
   * Applies filter options to the specified filter field
   * @param filterField - The field to filter on
   * @param filterOptions - Array of filter values to apply
   * @param filterMode - The mode to apply the filter in ('and' or 'or')
   */
  filterListing: (
    filterField: FilterField,
    filterOptions: FilterValue[],
    filterMode?: FilterMode
  ) => Promise<void>
  /**
   * Resets filters either for a specific field or all filters if no field specified
   * @param filterField - Optional field to reset. If omitted, all filters are reset
   * @param filterMode - The mode to apply the filter in ('and' or 'or')
   */
  resetFilter: (filterField?: FilterField, filterMode?: FilterMode) => Promise<void>
}

/**
 * Composable for managing category product listings with filtering, sorting, and pagination
 */
export const useProductSearch = defineQuery((): IUseProductSearch => {
  const queryCache = useQueryCache()
  const { token } = useContext()

  // State
  const searchTerm = ref('')
  const _orFilterList = ref<EqualsFilter<QueryFilter>[]>([])
  const _andFilterList = ref<EqualsFilter<QueryFilter>[]>([])
  const _sortQuery = ref<Sort<QuerySort> | undefined>(undefined)

  const listingState = ref<ListingState<ProductSearch>>({
    sort: undefined,
    search: undefined,
    filter: undefined,
  })

  const apiQuery = computed<Query<QueryFilter, QuerySort>>(() => ({
    sort: _sortQuery.value,
    search:
      searchTerm.value && searchTerm.value.trim().length > TERM_THRESHOLD
        ? searchTerm.value
        : undefined,
    filter: [
      ...makeLogicalFilter('or', _orFilterList.value),
      ...makeLogicalFilter('and', _andFilterList.value),
    ],
  }))

  // Query setup
  const {
    data: listing,
    status,
    refresh,
  } = useQuery({
    key: () => [RESULT_CACHE_KEY, JSON.stringify(apiQuery.value)],
    query: () => queryListing(),
    placeholderData: (previousData) => previousData,
  })

  // Load more mutation
  const { mutateAsync: loadMore } = useMutation({
    mutation: async () => {
      const nextPage = listing.value?.page?.next
      if (!nextPage) return undefined
      return queryListing(nextPage)
    },
    onSuccess: (data) => {
      if (!data?.items?.length) return
      const oldData = queryCache.getQueryData([
        RESULT_CACHE_KEY,
        JSON.stringify(apiQuery.value),
      ]) as ProductSearch

      queryCache.setQueryData([RESULT_CACHE_KEY, JSON.stringify(apiQuery.value)], {
        ...data,
        items: [...(oldData?.items || []), ...(data.items || [])],
      })
    },
  })

  watch(searchTerm, (newTerm) => {
    if (newTerm.trim().length > TERM_THRESHOLD || listingState.value.search) {
      triggerSearchFromInput()
    }
  })

  // API Methods
  async function queryListing(page: number = 1) {
    try {
      const response = await client.listing(
        LISTING_KEY,
        {},
        {
          query: { ...apiQuery.value, page },
          contextKey: token.value || undefined,
        }
      )
      if (page === 1) {
        updateListingState(response)
      }
      return response
    } catch (error) {
      console.error('Error fetching listing:', error)
      return undefined
    }
  }

  function updateListingState(response: ListingResponse) {
    listingState.value = {
      page: response.page?.current,
      search: apiQuery.value.search ?? undefined,
      filter: makeFilterState(response.filter),
    }
  }

  // Public Methods
  async function refreshListing() {
    await refresh()
  }

  const triggerSearchFromInput = useDebounceFn(refreshListing, 200)

  async function paginate(direction: 'next' | 'prev'): Promise<boolean> {
    const pageNumber = direction === 'next' ? listing.value?.page?.next : listing.value?.page?.prev
    if (!pageNumber) return false

    listingState.value.page = pageNumber
    const response = await queryListing(pageNumber)
    return !!response
  }

  async function sortListing(sortBy: SortBy) {
    const [field, order] = sortBy.split(':') as [SortField, SortDirection]
    _sortQuery.value = { field, order }
    await refreshListing()
  }

  async function filterListing(
    filterField: FilterField,
    filterOptions: FilterValue[],
    filterMode: FilterMode = 'and'
  ) {
    const targetList = filterMode === 'or' ? _orFilterList : _andFilterList
    targetList.value = manageFilter(targetList.value, filterField, filterOptions)
    await refreshListing()
  }

  async function addFilterOption(
    filterField: FilterField,
    filterOption: FilterValue,
    filterMode: FilterMode = 'and'
  ) {
    const targetList = filterMode === 'or' ? _orFilterList : _andFilterList
    const existingFilter = targetList.value.find((filter) => filter.field === filterField)
    const currentValues = existingFilter
      ? Array.isArray(existingFilter.value)
        ? existingFilter.value
        : [existingFilter.value]
      : []

    targetList.value = manageFilter(targetList.value, filterField, [...currentValues, filterOption])
    await refreshListing()
  }

  async function removeFilterOption(
    filterField: FilterField,
    filterOption: FilterValue,
    filterMode: FilterMode = 'and'
  ) {
    const targetList = filterMode === 'or' ? _orFilterList : _andFilterList
    targetList.value = removeFilter(targetList.value, filterField, filterOption)
    await refreshListing()
  }

  async function resetFilter(filterField?: FilterField, filterMode: FilterMode = 'and') {
    if (!filterField) {
      _orFilterList.value = []
      _andFilterList.value = []
    } else {
      const targetList = filterMode === 'or' ? _orFilterList : _andFilterList
      targetList.value = removeFilter(targetList.value, filterField)
    }
    await refreshListing()
  }

  return {
    // State
    listing,
    status,
    listingState,
    searchTerm,
    // Actions
    loadMore: () => loadMore(),
    refreshListing,
    paginate,
    sortListing,
    filterListing,
    addFilterOption,
    removeFilterOption,
    resetFilter,
  }
})
