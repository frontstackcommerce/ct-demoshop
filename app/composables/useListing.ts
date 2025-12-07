import type { MaybeRef, ShallowRef } from 'vue'
import { useQuery, useMutation, useQueryCache, type UseQueryReturn } from '@pinia/colada'
import { useDebounceFn } from '@vueuse/core'
import type {
  Listings,
  ListingParameters,
  ListingQuerySorts,
  Responses,
} from '~~/.frontstack/generated-types'
import type { Query, Sort, EqualsFilter } from '~~/.frontstack/query-types'
import { fetchListingQuery } from '~/queries/listings'

/**
 * Mode for filter/sort inclusion
 */
export type FilterMode = 'include' | 'exclude'

/**
 * Configuration for individual filters
 */
export interface FilterConfig {
  /** Filter field keys to include or exclude. If not provided, all filters are shown. */
  keys?: string[]
  /** Mode: 'include' (whitelist) or 'exclude' (blacklist). Default: 'include' */
  mode?: FilterMode
  /** Labels for filter fields (e.g., { "properties.color": "Color" }) */
  labels?: Record<string, string>
}

/**
 * Configuration for individual sorts
 */
export interface SortConfig {
  /** Sort field keys to include or exclude. If not provided, all sorts are allowed. */
  keys?: string[]
  /** Mode: 'include' (whitelist) or 'exclude' (blacklist). Default: 'include' */
  mode?: FilterMode
  /** Labels for sort options (e.g., { 'name:asc': 'Name A-Z', 'price.amount:asc': 'Price Low-High' }) */
  labels?: Record<string, string>
}

/**
 * Processed filter option for UI
 */
export interface ProcessedFilterOption {
  option: string
  value: string
  count: number
  selected?: boolean
  disabled?: boolean
}

/**
 * Processed filter with label and options for UI
 */
export interface ProcessedFilter {
  key: string
  label: string
  options: ProcessedFilterOption[]
}

/**
 * Processed sort option for UI
 */
export interface ProcessedSort {
  key: string
  label: string
  value: string
}

/**
 * State tracking for a listing (filters, sort, search, page)
 */
export interface ListingStateType {
  /** Current page number for pagination */
  page?: number
  /** Current sort option applied to the listing */
  sort?: Sort<any>
  /** Current search term */
  search?: string
  /** Applied filters grouped by filter field */
  filter?: Record<string, any>
  /** Available filters with processed options for UI */
  availableFilters?: ProcessedFilter[]
  /** Available sort options for UI */
  availableSorts?: ProcessedSort[]
  /** Count of active filters */
  activeFilterCount?: number
  /** Total number of results */
  total?: number
}

/**
 * Configuration for the generic listing composable
 */
export interface UseListingConfig<TListing extends keyof Listings> {
  /**
   * The listing name to fetch (e.g., 'ProductSearch', 'CategoryProducts')
   */
  name: TListing

  /**
   * Parameters to pass to the listing endpoint
   */
  params?: MaybeRef<ListingParameters[TListing]>

  /**
   * Cache key for the query (defaults to name)
   */
  cacheKey?: string

  /**
   * Optional context key for the request
   */
  contextKey?: MaybeRef<string | undefined>

  /**
   * Minimum length of search term before triggering search (default: 2)
   */
  searchTermThreshold?: number

  /**
   * Filter fields that should use OR logic (all others use AND)
   */
  orFilterKeys?: string[]

  /**
   * Filter configuration using unified structure
   * @example
   * // With keys and labels
   * filters: {
   *   keys: ['properties.color', 'properties.size'],
   *   mode: 'include',
   *   labels: { 'properties.color': 'Color', 'properties.size': 'Size' }
   * }
   *
   * // Just labels (shows all filters with custom labels)
   * filters: {
   *   labels: { 'properties.color': 'Color' }
   * }
   *
   * // Just keys (shows only these filters)
   * filters: {
   *   keys: ['properties.color', 'properties.size']
   * }
   */
  filters?: FilterConfig

  /**
   * Sort configuration using unified structure
   * @example
   * // Full configuration
   * sorts: {
   *   keys: ['name', 'price'],
   *   mode: 'include',
   *   labels: {
   *     'name:asc': 'Name A-Z',
   *     'price.amount:asc': 'Price Low-High'
   *   }
   * }
   *
   * // Just labels (all sorts allowed)
   * sorts: {
   *   labels: {
   *     'name:asc': 'Name A-Z',
   *     'name:desc': 'Name Z-A'
   *   }
   * }
   */
  sorts?: SortConfig

  /**
   * @deprecated Use `filters.keys` with `filters.mode` instead
   * Only include these filter fields in the UI state (whitelist)
   */
  includeFilters?: string[]

  /**
   * @deprecated Use `filters.keys` with `filters.mode = 'exclude'` instead
   * Exclude these filter fields from the UI state (blacklist)
   */
  excludeFilters?: string[]

  /**
   * @deprecated Use `filters.labels` instead
   * Rename filter fields for the UI (e.g., { "properties.color": "Color" })
   */
  filterLabels?: Record<string, string>

  /**
   * @deprecated Use `sorts.keys` with `sorts.mode` instead
   * Only include these sort fields in available sorts
   */
  includeSorts?: Array<keyof ListingQuerySorts[TListing]>

  /**
   * @deprecated Use `sorts.keys` with `sorts.mode = 'exclude'` instead
   * Exclude these sort fields from available sorts
   */
  excludeSorts?: Array<keyof ListingQuerySorts[TListing]>

  /**
   * @deprecated Use `sorts.labels` instead
   * Define available sort options with labels
   */
  sortOptions?: ProcessedSort[]

  /**
   * Enable search functionality (default: true)
   */
  enableSearch?: boolean

  /**
   * Enable filtering functionality (default: true)
   */
  enableFilters?: boolean

  /**
   * Enable sorting functionality (default: true)
   */
  enableSort?: boolean

  /**
   * Stale time in milliseconds (default: 5 minutes)
   */
  staleTime?: number
}

/**
 * Return type for the generic listing composable
 */
export interface UseListingReturn<TListing extends keyof Listings> {
  /** The current result set containing items and metadata */
  data: ShallowRef<Responses[TListing] | undefined>

  /** Current fetch status of the listing */
  status: UseQueryReturn['status']

  /** Current state of the result including page, sort, search, and filter settings */
  state: Ref<ListingStateType>

  /** Current search term */
  searchTerm: Ref<string>

  /**
   * Loads more items in the current listing (infinite scroll)
   */
  loadMore: () => Promise<Responses[TListing] | undefined>

  /**
   * Fetches the listing with current query parameters
   */
  refresh: () => Promise<void>

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
  sortItems: (sortBy: string) => Promise<void>

  /**
   * Adds a filter option to the specified filter field
   * @param filterField - The field to filter on
   * @param filterOption - The option value to add
   */
  addFilter: (filterField: string, filterOption: any) => Promise<void>

  /**
   * Removes a filter option from the specified filter field
   * @param filterField - The field to remove the filter from
   * @param filterOption - The option value to remove
   */
  removeFilter: (filterField: string, filterOption: any) => Promise<void>

  /**
   * Applies filter options to the specified filter field
   * @param filterField - The field to filter on
   * @param filterOptions - Array of filter values to apply
   */
  filterItems: (filterField: string, filterOptions: any[]) => Promise<void>

  /**
   * Resets filters either for a specific field or all filters if no field specified
   * @param filterField - Optional field to reset. If omitted, all filters are reset
   */
  resetFilter: (filterField?: string) => Promise<void>

  /**
   * Clears the search term
   */
  resetSearch: () => Promise<void>
}

/**
 * Generic composable for managing listings with filtering, sorting, and pagination
 *
 * @example
 * ```ts
 * const productListing = useListing({
 *   name: 'ProductSearch',
 *   params: {},
 *   orFilterKeys: ['properties.color', 'options.size'],
 *   searchTermThreshold: 2,
 *   filterLabels: { 'properties.color': 'Color' }
 * })
 *
 * // Use the listing
 * await productListing.filterItems('properties.color', ['Red', 'Blue'])
 * await productListing.sortItems('name:asc')
 * await productListing.loadMore()
 * ```
 */
export function useListing<TListing extends keyof Listings>(
  config: UseListingConfig<TListing>
): UseListingReturn<TListing> {
  const queryCache = useQueryCache()

  // Extract config with defaults
  const {
    name: listingName,
    params: parameters = {} as ListingParameters[TListing],
    cacheKey = listingName,
    contextKey: contextToken,
    searchTermThreshold = 2,
    orFilterKeys = [],
    filters,
    sorts,
    // Deprecated options - keep for backward compatibility
    includeFilters,
    excludeFilters,
    includeSorts,
    excludeSorts,
    filterLabels = {},
    sortOptions = [],
    enableSearch = true,
    enableFilters = true,
    enableSort = true,
    staleTime = 1000 * 60 * 5, // 5 minutes
  } = config

  // Normalize filter config (support both new and old API)
  const filterConfig: FilterConfig = filters || {
    keys: includeFilters || [],
    mode: excludeFilters ? 'exclude' : 'include',
    labels: filterLabels,
  }
  // If using deprecated excludeFilters, override keys
  if (!filters && excludeFilters) {
    filterConfig.keys = excludeFilters
    filterConfig.mode = 'exclude'
  }

  // Normalize sort config (support both new and old API)
  // Convert old sortOptions array to new labels object
  const legacySortLabels: Record<string, string> = {}
  if (sortOptions.length > 0) {
    sortOptions.forEach((option) => {
      legacySortLabels[option.value] = option.label
    })
  }

  const sortConfig: SortConfig = sorts || {
    keys: (includeSorts as string[]) || [],
    mode: excludeSorts ? 'exclude' : 'include',
    labels: legacySortLabels,
  }
  // If using deprecated excludeSorts, override keys
  if (!sorts && excludeSorts) {
    sortConfig.keys = excludeSorts as string[]
    sortConfig.mode = 'exclude'
  }

  // Internal state
  const searchTerm = ref('')
  const _orFilterList = ref<EqualsFilter<any>[]>([])
  const _andFilterList = ref<EqualsFilter<any>[]>([])
  const _sortQuery = ref<Sort<any> | undefined>(undefined)

  const listingState = ref<ListingStateType>({
    sort: undefined,
    search: undefined,
    filter: undefined,
  })

  // Build API query from state
  const apiQuery = computed<Query<any, any>>(() => ({
    sort: enableSort ? _sortQuery.value : undefined,
    search:
      enableSearch && searchTerm.value && searchTerm.value.trim().length > searchTermThreshold
        ? searchTerm.value
        : undefined,
    filter: enableFilters
      ? [
          ...makeLogicalFilter('or', _orFilterList.value),
          ...makeLogicalFilter('and', _andFilterList.value),
        ]
      : undefined,
  }))

  // Setup query using the new pattern
  const { data, status, refresh } = useQuery(
    fetchListingQuery({
      listingName,
      parameters,
      query: apiQuery,
      contextKey: contextToken,
      staleTime,
    })
  )

  // Load more mutation for infinite scroll
  const { mutateAsync: loadMore } = useMutation({
    mutation: async () => {
      const nextPage = (data.value as any)?.page?.next
      if (!nextPage) return undefined

      // Fetch next page using the query factory
      const nextPageQuery = fetchListingQuery({
        listingName,
        parameters,
        query: apiQuery,
        contextKey: contextToken,
        page: ref(nextPage),
        staleTime,
      })

      return await nextPageQuery.query()
    },
    onSuccess: (newData: any) => {
      if (!newData?.items?.length) return

      const cacheKeyValue = [cacheKey, JSON.stringify(unref(apiQuery))]
      const oldData = queryCache.getQueryData(cacheKeyValue) as any

      queryCache.setQueryData(cacheKeyValue, {
        ...newData,
        items: [...(oldData?.items || []), ...(newData.items || [])],
      })
    },
  })

  // Watch search term and trigger debounced search
  if (enableSearch) {
    watch(searchTerm, (newTerm) => {
      if (newTerm.trim().length > searchTermThreshold || listingState.value.search) {
        triggerSearchFromInput()
      }
    })
  }

  // Watch data changes and update state
  watch(
    data,
    (newData) => {
      if (newData) {
        updateState(newData)
      }
    },
    { immediate: true }
  )

  // Update listing state from response
  function updateState(response: Responses[TListing]) {
    let processedFilters = makeFilterState((response as any).filter)

    // Apply include/exclude filters using unified config
    const filterMode = filterConfig.mode || 'include'
    const filterKeys = filterConfig.keys || []

    if (filterKeys.length > 0) {
      processedFilters = Object.keys(processedFilters).reduce(
        (acc, key) => {
          const isInKeys = filterKeys.includes(key)
          const shouldInclude = filterMode === 'include' ? isInKeys : !isInKeys

          if (shouldInclude) {
            acc[key] = processedFilters[key]
          }
          return acc
        },
        {} as Record<string, any>
      )
    }

    // Apply filter labels from unified config
    const labels = filterConfig.labels || {}
    if (Object.keys(labels).length > 0) {
      const renamedFilters: Record<string, any> = {}
      Object.entries(processedFilters).forEach(([key, value]) => {
        const newKey = labels[key] || key
        renamedFilters[newKey] = value
      })
      processedFilters = renamedFilters
    }

    // Process available filters from response
    const rawFilters = (response as any).filter || {}
    const availableFilters: ProcessedFilter[] = []

    // Get all filter keys from response
    const responseFilterKeys = Object.keys(rawFilters)

    for (const key of responseFilterKeys) {
      // Apply include/exclude logic using unified config
      const isInKeys = filterKeys.includes(key)
      const shouldInclude = filterKeys.length === 0 || (filterMode === 'include' ? isInKeys : !isInKeys)

      if (!shouldInclude) continue

      const filterOptions = rawFilters[key] || []
      if (filterOptions.length === 0) continue

      // Apply label
      const label = labels[key] || key

      availableFilters.push({
        key,
        label,
        options: filterOptions,
      })
    }

    // Calculate active filter count
    const activeFilterCount = Object.keys(processedFilters).length

    // Process available sorts from labels config
    const sortLabels = sortConfig.labels || {}
    const availableSorts: ProcessedSort[] = Object.entries(sortLabels).map(([value, label]) => ({
      key: value,
      label,
      value,
    }))

    listingState.value = {
      page: (response as any).page?.current,
      search: apiQuery.value.search ?? undefined,
      filter: processedFilters,
      availableFilters,
      availableSorts,
      activeFilterCount,
      total: (response as any).total ?? 0,
    }
  }

  // Public methods
  async function refreshListing() {
    await refresh()
    if (data.value) {
      updateState(data.value)
    }
  }

  const triggerSearchFromInput = useDebounceFn(refreshListing, 200)

  async function paginate(direction: 'next' | 'prev'): Promise<boolean> {
    const pageNumber =
      direction === 'next' ? (data.value as any)?.page?.next : (data.value as any)?.page?.prev

    if (!pageNumber) return false

    listingState.value.page = pageNumber

    // Create a new query with the page number
    const pageQuery = fetchListingQuery({
      listingName,
      parameters,
      query: apiQuery,
      contextKey: contextToken,
      page: ref(pageNumber),
      staleTime,
    })

    const response = await pageQuery.query()
    if (response) {
      updateState(response)
    }
    return !!response
  }

  async function sortItems(sortBy: string) {
    if (!enableSort) return

    if (sortBy === 'default') {
      _sortQuery.value = undefined
    } else {
      const [field, order] = sortBy.split(':') as [
        keyof ListingQuerySorts[TListing],
        'asc' | 'desc',
      ]

      // Check if sort is allowed using unified config
      const sortMode = sortConfig.mode || 'include'
      const sortKeys = sortConfig.keys || []

      if (sortKeys.length > 0) {
        const isInKeys = sortKeys.includes(field as string)
        const isAllowed = sortMode === 'include' ? isInKeys : !isInKeys

        if (!isAllowed) return
      }

      _sortQuery.value = { field, order }
    }

    await refreshListing()
  }

  async function filterItems(filterField: string, filterOptions: any[]) {
    if (!enableFilters) return

    // Determine which filter list to use based on orFilterKeys config
    const shouldUseOr = orFilterKeys.includes(filterField)
    const targetList = shouldUseOr ? _orFilterList : _andFilterList

    targetList.value = manageFilter(targetList.value, filterField as any, filterOptions)
    await refreshListing()
  }

  async function addFilterOption(filterField: string, filterOption: any) {
    if (!enableFilters) return

    const shouldUseOr = orFilterKeys.includes(filterField)
    const targetList = shouldUseOr ? _orFilterList : _andFilterList

    const existingFilter = targetList.value.find((filter) => filter.field === filterField)
    const currentValues = existingFilter
      ? Array.isArray(existingFilter.value)
        ? existingFilter.value
        : [existingFilter.value]
      : []

    targetList.value = manageFilter(targetList.value, filterField as any, [
      ...currentValues,
      filterOption,
    ])
    await refreshListing()
  }

  async function removeFilterOption(filterField: string, filterOption: any) {
    if (!enableFilters) return

    const shouldUseOr = orFilterKeys.includes(filterField)
    const targetList = shouldUseOr ? _orFilterList : _andFilterList

    targetList.value = removeFilter(targetList.value, filterField as any, filterOption)
    await refreshListing()
  }

  async function resetFilter(filterField?: string) {
    if (!enableFilters) return

    if (!filterField) {
      _orFilterList.value = []
      _andFilterList.value = []
    } else {
      const shouldUseOr = orFilterKeys.includes(filterField)
      const targetList = shouldUseOr ? _orFilterList : _andFilterList
      targetList.value = removeFilter(targetList.value, filterField as any)
    }
    await refreshListing()
  }

  async function resetSearch() {
    searchTerm.value = ''
    await refreshListing()
  }

  return {
    // State
    data,
    status,
    state: listingState,
    searchTerm,
    // Actions
    loadMore: () => loadMore(),
    refresh: refreshListing,
    paginate,
    sortItems,
    filterItems,
    addFilter: addFilterOption,
    removeFilter: removeFilterOption,
    resetFilter,
    resetSearch,
  }
}
