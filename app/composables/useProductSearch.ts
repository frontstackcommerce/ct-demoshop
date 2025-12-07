import {
  useListing,
  type UseListingReturn,
  type ProcessedSort,
  type ProcessedFilter,
} from './useListing'

// Re-export types for components
export type { ProcessedSort, ProcessedFilter }

/**
 * ProductSearch-specific return type extending the base listing return
 */
export type IUseProductSearch = UseListingReturn<'ProductSearch'>

/**
 * Composable for managing product search with filtering, sorting, and pagination
 * Implemented using the generic useListing composable
 */
export function useProductSearch(): IUseProductSearch {
  const { token } = useContext()
  const { t } = useI18n()

  return useListing({
    name: 'ProductSearch',
    params: {},
    contextKey: token,
    filters: {
      keys: [
        'properties.finish-label',
        'properties.search-color',
        'properties.size',
        'properties.manufacturer',
      ],
      labels: {
        'properties.finish-label': t('listing.filters.finish-label'),
        'properties.search-color': t('listing.filters.search-color'),
        'properties.size': t('listing.filters.size'),
        'properties.manufacturer': t('listing.filters.manufacturer'),
      },
    },
    sorts: {
      labels: {
        default: t('control.sort.options.default'),
        'name:asc': t('control.sort.options.name:asc'),
        'name:desc': t('control.sort.options.name:desc'),
        'price.amount:asc': t('control.sort.options.price:asc'),
        'price.amount:desc': t('control.sort.options.price:desc'),
      },
    },
  })
}
