import type { MaybeRef, ShallowRef } from 'vue'
import { useQuery, useMutation, useQueryCache, type UseQueryReturn } from '@pinia/colada'
import { useDebounceFn } from '@vueuse/core'
import type {
  Listings,
  ListingParameters,
  ListingQuerySorts,
  Responses,
} from '~~/.frontstack/generated-types'
import type { Query, Sort, EqualsFilter, LogicalFilter } from '~~/.frontstack/query-types'
import type { components } from '~~/.frontstack/fetch-api'
import { fetchListingQuery } from '~/queries/listings'

/**
 * Return type for the generic listing composable
 */
export interface UseListingReturn<TListing extends keyof Listings> {
  /** The current result set containing items and metadata */
  listing: ShallowRef<Responses[TListing] | undefined>

  /** Current fetch status of the listing */
  status: UseQueryReturn['status']

  /** Current state of the result including page, sort, search, and filter settings */
  state: Ref<ListingState>

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
   * Resets sorting to default (Frontstack backend default)
   */
  resetSort: () => Promise<void>

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

// ============================================================================
// Main Composable
// ============================================================================

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
    params = {} as ListingParameters[TListing],
    cacheKey = listingName,
    contextKey,
    searchTermThreshold = 2,
    orFilterKeys = [],
    filters,
    sorts,
    enableSearch = true,
    enableFilters = true,
    enableSort = true,
    staleTime = 1000 * 60 * 5, // 5 minutes
  } = config

  // Use filter config with defaults
  const filterConfig: ListingFieldConfig = filters || {}

  // Use sort config with defaults
  const sortConfig: ListingFieldConfig = sorts || {}

  // Internal state
  const searchTerm = ref('')
  const _orFilterList = ref<EqualsFilter<any>[]>([])
  const _andFilterList = ref<EqualsFilter<any>[]>([])
  const _sortQuery = ref<Sort<any> | undefined>(undefined)

  const listingState = ref<ListingState>({
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
      parameters: params,
      query: apiQuery,
      contextKey,
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
        parameters: params,
        query: apiQuery,
        contextKey,
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
    let UiFilters = makeFilterState((response as any).filter)

    // Apply include/exclude filters using unified config
    const filterMode = filterConfig.mode || 'include'
    const filterKeys = filterConfig.keys || []

    if (filterKeys.length > 0) {
      UiFilters = Object.keys(UiFilters).reduce(
        (acc, key) => {
          const isInKeys = filterKeys.includes(key)
          const shouldInclude = filterMode === 'include' ? isInKeys : !isInKeys

          if (shouldInclude) {
            acc[key] = UiFilters[key]
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
      Object.entries(UiFilters).forEach(([key, value]) => {
        const newKey = labels[key] || key
        renamedFilters[newKey] = value
      })
      UiFilters = renamedFilters
    }

    // Process available filters from response
    const rawFilters = (response as any).filter || {}
    const availableFilters: UiFilter[] = []

    // Get all filter keys from response
    const responseFilterKeys = Object.keys(rawFilters)

    for (const key of responseFilterKeys) {
      // Apply include/exclude logic using unified config
      const isInKeys = filterKeys.includes(key)
      const shouldInclude =
        filterKeys.length === 0 || (filterMode === 'include' ? isInKeys : !isInKeys)

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
    const activeFilterCount = Object.keys(UiFilters).length

    // Process available sorts from labels config
    const sortLabels = sortConfig.labels || {}
    const sortMode = sortConfig.mode || 'include'
    const sortKeys = sortConfig.keys || []

    const availableSorts: UiSort[] = Object.entries(sortLabels)
      .filter(([value]) => {
        // Apply include/exclude logic
        if (sortKeys.length === 0) return true

        const isInKeys = sortKeys.includes(value)
        return sortMode === 'include' ? isInKeys : !isInKeys
      })
      .map(
        ([value, label]): UiSort => ({
          key: value,
          label: label as string,
          value,
        })
      )

    listingState.value = {
      page: (response as any).page?.current,
      sort: _sortQuery.value,
      search: apiQuery.value.search ?? undefined,
      filter: UiFilters,
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
      parameters: params,
      query: apiQuery,
      contextKey,
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

  async function resetSort() {
    if (!enableSort) return
    _sortQuery.value = undefined
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
    listing: data,
    status,
    state: listingState,
    searchTerm,
    // Actions
    loadMore: () => loadMore(),
    refresh: refreshListing,
    paginate,
    sortItems,
    resetSort,
    filterItems,
    addFilter: addFilterOption,
    removeFilter: removeFilterOption,
    resetFilter,
    resetSearch,
  }
}
// ============================================================================
// Public Types & Interfaces
// ============================================================================

/**
 * Inclusion mode for configuring which fields to show
 * - 'include': Whitelist mode - only show specified keys
 * - 'exclude': Blacklist mode - show all except specified keys
 */
export type InclusionMode = 'include' | 'exclude'

/**
 * Generic configuration for listing fields (filters or sorts)
 * Allows flexible control over which fields to show and how to label them
 */
export interface ListingFieldConfig {
  /** Field keys to include or exclude. If not provided, all fields are shown. */
  keys?: string[]
  /** Mode: 'include' (whitelist) or 'exclude' (blacklist). Default: 'include' */
  mode?: InclusionMode
  /** Custom labels for fields (e.g., { "properties.color": "Color" }) */
  labels?: Record<string, string>
}

/**
 * Filter option from API response (matches Frontstack response structure)
 * @internal - Used internally, components should use UiFilter
 */
export interface FilterOption {
  option: string
  value: string
  count: number
  selected?: boolean
  disabled?: boolean
}

/**
 * Processed filter ready for UI consumption
 */
export interface UiFilter {
  key: string
  label: string
  options: FilterOption[]
}

/**
 * Processed sort option ready for UI consumption
 */
export interface UiSort {
  key: string
  label: string
  value: string
}

/**
 * Listing state exposed to consumers
 * Contains both the current query state and processed data ready for UI consumption
 */
export interface ListingState {
  /** Current page number */
  page?: number
  /** Currently applied sort (uses Frontstack Sort type) */
  sort?: Sort<any>
  /** Current search term (if search is enabled) */
  search?: string
  /** Currently active filters by field */
  filter?: Record<string, any>
  /** Processed filters ready for UI (includes labels, counts, options) */
  availableFilters?: UiFilter[]
  /** Processed sort options ready for UI (includes labels) */
  availableSorts?: UiSort[]
  /** Number of currently active filters */
  activeFilterCount?: number
  /** Total number of items matching the current query */
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
  filters?: ListingFieldConfig

  /**
   * Sort configuration using unified structure
   *
   * Special handling for 'default' sort:
   * - The 'default' sort represents Frontstack backend's default sorting (no sort applied to query)
   * - It's automatically included if a label is provided in sorts.labels
   * - Can be controlled via include/exclude mode like other sorts
   * - Use resetSort() to return to default sorting
   *
   * @example
   * // Full configuration with default sort
   * sorts: {
   *   labels: {
   *     'default': 'Relevance',
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
  sorts?: ListingFieldConfig

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

// ============================================================================
// Internal Helper Functions
// ============================================================================

/**
 * Creates an equals filter for the API query
 * @internal
 */
function makeEqualsFilter<T>(
  field: keyof T & string,
  value: T[keyof T] | T[keyof T][]
): EqualsFilter<T> {
  return {
    type: 'equals',
    field,
    value,
  } as EqualsFilter<T>
}

/**
 * Creates a logical filter (AND/OR) for the API query
 * @internal
 */
function makeLogicalFilter<T>(type: 'and' | 'or', filters: EqualsFilter<T>[]): LogicalFilter<T>[] {
  return filters.length > 0
    ? [
        {
          type,
          filter: filters,
        },
      ]
    : []
}

/**
 * Extracts active filters from the API response
 * @internal
 */
function makeFilterState<T extends { filter?: components['schemas']['_filter'] }>(
  filters: T['filter']
): Record<string, any> {
  const result: Record<string, any> = {}

  if (!filters) return result

  for (const key in filters) {
    if (Object.hasOwn(filters, key)) {
      const selectedItems = filters[key]?.filter((item) => item.selected) || []
      if (selectedItems.length > 0) {
        result[key] = selectedItems
      }
    }
  }
  return result
}

/**
 * Manages filter operations (add/remove/update) on a filter list
 * @internal
 */
function manageFilter<T>(
  filterList: EqualsFilter<T>[],
  field: keyof T & string,
  value: T[keyof T] | T[keyof T][]
): EqualsFilter<T>[] {
  const existingIndex = filterList.findIndex((filter) => filter.field === field)
  const newFilter = makeEqualsFilter<T>(field, value)

  if (existingIndex !== -1) {
    const newList = [...filterList]
    newList[existingIndex] = newFilter
    return newList
  }

  return [...filterList, newFilter]
}

/**
 * Removes a filter from a filter list
 * @internal
 */
function removeFilter<T>(
  filterList: EqualsFilter<T>[],
  field: keyof T & string,
  option?: T[keyof T]
): EqualsFilter<T>[] {
  if (!option) {
    return filterList.filter((filter) => filter.field !== field)
  }

  const existingFilter = filterList.find((filter) => filter.field === field)
  if (!existingFilter) return filterList

  const currentValues = Array.isArray(existingFilter.value)
    ? existingFilter.value
    : [existingFilter.value]
  const newValues = currentValues.filter((value) => value !== option)

  if (newValues.length === 0) {
    return filterList.filter((filter) => filter.field !== field)
  }

  return manageFilter(filterList, field, newValues)
}
