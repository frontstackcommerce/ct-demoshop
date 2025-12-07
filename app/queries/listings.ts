import type { MaybeRef } from 'vue'
import type { Listings, ListingParameters, ListingQueryFilters, ListingQuerySorts, Responses } from '~~/.frontstack/generated-types'
import type { Query } from '~~/.frontstack/query-types'
import client from '~~/.frontstack/generated-client'

/**
 * Query key factory for listing queries
 * Creates hierarchical, typed cache keys for listings
 */
export const LISTING_QUERY_KEYS = {
  root: ['listings'] as const,
  listing: <TListing extends keyof Listings>(listingName: TListing) =>
    [...LISTING_QUERY_KEYS.root, listingName] as const,
  detail: <TListing extends keyof Listings>(
    listingName: TListing,
    parameters: ListingParameters[TListing],
    query: Query<ListingQueryFilters[TListing], ListingQuerySorts[TListing]>
  ) => [...LISTING_QUERY_KEYS.listing(listingName), parameters, query] as const,
}

/**
 * Configuration for listing queries
 */
export interface FetchListingConfig<TListing extends keyof Listings> {
  /**
   * The listing name to fetch
   */
  listingName: TListing

  /**
   * Parameters to pass to the listing endpoint
   */
  parameters: MaybeRef<ListingParameters[TListing]>

  /**
   * Query configuration (filters, sort, search, pagination)
   */
  query: MaybeRef<Query<ListingQueryFilters[TListing], ListingQuerySorts[TListing]>>

  /**
   * Optional context token
   */
  contextKey?: MaybeRef<string | undefined>

  /**
   * Optional page number for pagination
   */
  page?: MaybeRef<number | undefined>

  /**
   * Stale time in milliseconds (default: 5 minutes)
   */
  staleTime?: number
}

/**
 * Generic query factory for fetching listings
 * Returns a query options object compatible with @pinia/colada
 *
 * @example
 * ```ts
 * const productQuery = fetchListingQuery({
 *   listingName: 'ProductSearch',
 *   parameters: {},
 *   query: { filter: [], sort: { field: 'name', order: 'asc' } },
 *   contextKey: token.value
 * })
 *
 * const { data, status } = useQuery(productQuery)
 * ```
 */
export function fetchListingQuery<TListing extends keyof Listings>(
  config: FetchListingConfig<TListing>
) {
  return {
    key: () => {
      const params = unref(config.parameters)
      const query = unref(config.query)
      const page = unref(config.page)

      // Include page in cache key for pagination
      const queryWithPage = page ? { ...query, page } : query

      return LISTING_QUERY_KEYS.detail(
        config.listingName,
        params,
        queryWithPage
      )
    },
    query: async (): Promise<Responses[TListing]> => {
      const params = unref(config.parameters)
      const query = unref(config.query)
      const contextKey = unref(config.contextKey)
      const page = unref(config.page)

      // Include page in query for pagination
      const queryWithPage = page ? { ...query, page } : query

      return await client.listing(
        config.listingName,
        params,
        {
          query: queryWithPage,
          contextKey,
        }
      )
    },
    staleTime: config.staleTime ?? 1000 * 60 * 5, // 5 minutes default
  }
}
