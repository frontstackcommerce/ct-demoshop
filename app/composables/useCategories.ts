import client from '~~/.frontstack/generated-client'
import { useQuery, useMutation } from '@pinia/colada'
import type { ShallowRef } from 'vue'
import type { UseQueryReturn } from '@pinia/colada'
import type { ListingQueryFilters, ListingQuerySorts } from '~~/.frontstack/generated-types'
import type { Query, Sort } from '~~/.frontstack/query-types'
import type { components } from '~~/.frontstack/fetch-api'

const LISTING_KEY = 'CategoryChildList'
const CATEGORY_KEY = 'Category'
type QueryFilter = ListingQueryFilters['CategoryChildList']
type QuerySort = ListingQuerySorts['CategoryChildList']
type SortField = keyof components['schemas']['CategoryChildListQueryOptions']['sort'] & string
type SortDirection = Sort<CategoryChildList>['order']
type SortBy = `${SortField}:${SortDirection}` | 'default'
type ListingResponse = components['schemas']['CategoryChildList']

/**
 * Interface for the category listing composable
 */
interface IUseCategories {
  /** Category ID for the current listing */
  categoryId: ShallowRef<string>
  /** Category data for the current listing */
  category: ShallowRef<CategoryPage | undefined>
  /** The current result set containing products and metadata */
  listing: ShallowRef<CategoryChildList | undefined>
  /** Current fetch status of the product list */
  status: UseQueryReturn['status']
  /** Current state of the result including page, sort, search, and filter settings */
  listingState: Ref<ListingState<CategoryChildList>>

  // Actions
  /**
   * Loads more items in the current listing
   */
  loadMore: () => Promise<CategoryChildList | undefined>

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
}

/**
 * Composable for managing category product listings with filtering, sorting, and pagination
 */
export const useCategories = defineQuery((): IUseCategories => {
  const queryCache = useQueryCache()
  const { token } = useContext()

  // State
  const categoryId = ref('')

  const _sortQuery = ref<Sort<QuerySort> | undefined>(undefined)

  const listingState = ref<ListingState<CategoryChildList>>({
    sort: undefined,
  })

  const apiQuery = computed<Query<QueryFilter, QuerySort>>(() => ({
    sort: _sortQuery.value,
  }))

  // Query setup
  const {
    data: listing,
    status,
    refresh,
  } = useQuery({
    key: () => [LISTING_KEY, categoryId.value, JSON.stringify(apiQuery.value)],
    query: () => queryListing(),
    placeholderData: (previousData) => previousData,
    enabled: () => !!categoryId.value,
    staleTime: 1000 * 60 * 60 * 24,
  })

  // Query setup
  const { data: category, refresh: refreshCategory } = useQuery({
    key: () => [CATEGORY_KEY, categoryId.value],
    query: async () => {
      try {
        return await client.block('CategoryPage', categoryId.value, {
          contextKey: token.value || undefined,
        })
      } catch (error) {
        console.error('Error fetching listing:', error)
        return undefined
      }
    },
    placeholderData: (previousData) => previousData,
    enabled: () => !!categoryId.value,
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
        LISTING_KEY,
        categoryId.value,
        JSON.stringify(apiQuery.value),
      ]) as CategoryChildList

      queryCache.setQueryData([LISTING_KEY, categoryId.value, JSON.stringify(apiQuery.value)], {
        ...data,
        items: [...(oldData?.items || []), ...(data.items || [])],
      })
    },
  })

  // API Methods
  async function queryListing(page: number = 1) {
    try {
      const response = await client.listing(
        LISTING_KEY,
        { categoryId: categoryId.value },
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
    queryCache.cancelQueries({ key: [LISTING_KEY, categoryId.value] })
    await refresh()
    await refreshCategory()
  }

  async function paginate(direction: 'next' | 'prev'): Promise<boolean> {
    const pageNumber = direction === 'next' ? listing.value?.page?.next : listing.value?.page?.prev
    if (!pageNumber) return false

    listingState.value.page = pageNumber
    const response = await queryListing(pageNumber)
    return !!response
  }

  async function sortListing(sortBy: SortBy) {
    if (sortBy === 'default') {
      _sortQuery.value = undefined
    } else {
      const [field, order] = sortBy.split(':') as [SortField, SortDirection]
      _sortQuery.value = { field, order }
    }
    await refreshListing()
  }

  return {
    // State
    listing,
    categoryId,
    status,
    listingState,
    category,
    // Actions
    loadMore: () => loadMore(),
    refreshListing,
    paginate,
    sortListing,
  }
})
