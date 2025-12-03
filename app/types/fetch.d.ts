// Types to handle the data from the proxy API
interface ProxyResponse<T = any> {
  success?: boolean
  error?: boolean
  message?: string
  data?: T
  status?: number
}
type ShoppingCartItem = {
  id?: string
  quantity: number
  key: string
  label?: string
  data?: VariantCard
  price?: {
    total: Price
    unit: Price
  }
}
type ShoppingCartPrice = {
  total: Price
  net?: Price
}
type ShoppingCart = {
  items: ShoppingCartItem[]
  price?: ShoppingCartPrice
}

// Types to handle listings via the Fetch API

/**
 * Represents the current query state for listing results.
 * Tracks active filters, sort, page and search parameters.
 */
type ListingState<T> = {
  /** Current page number for pagination */
  page?: number
  /** Current sort option applied to the listing */
  sort?: T['sort'][number]
  /** Current search term */
  search?: string
  /** Applied filters grouped by filter type */
  filter?: {
    [key: string]: FilterGroup
  }
}

/**
 * Defines how listing results should be sorted.
 * Specifies both the field to sort by and the direction.
 */
type ListingSort = {
  /** Field name to sort by */
  field: string
  /** Sort direction: ascending or descending */
  direction: 'asc' | 'desc'
}

/**
 * Defines a filter condition to apply to listing results.
 * Currently supports 'equals' comparison type.
 */
type ListingFilter = {
  /** Type of comparison to perform */
  type: 'equals'
  /** Field name to filter on */
  field: string
  /** Value(s) to match against the field */
  value: string | string[]
}

/**
 * Query object used to control and fetch listing results.
 * Contains parameters for pagination, filtering, sorting and searching.
 */
type ListingQuery = {
  /** Current page number for pagination */
  page?: number
  /** Array of filter conditions to apply to the listing */
  filter?: ListingFilter[]
  /** Array of sort conditions to order the listing results */
  sort?: ListingSort[]
  /** Search term to filter results by text search */
  search?: string
  /** Maximum number of items per page */
  limit?: number
}

type QueryFilter = ListingQueryFilters['CategoryProductList']
type QuerySort = ListingQuerySorts['CategoryProductList']
type SortField = keyof components['schemas']['CategoryProductListQueryOptions']['sort'] & string
type SortDirection = Sort<CategoryProductList>['order']
type SortBy = `${SortField}:${SortDirection}` | 'default'
type FilterField = keyof components['schemas']['CategoryProductListQueryOptions']['filter'] & string
type FilterMode = 'and' | 'or'
type ListingResponse = components['schemas']['CategoryProductList']
type FilterValue = QueryFilter[keyof QueryFilter]

// No need to re-CategoryProductList as it's already globally available
