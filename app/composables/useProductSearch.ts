/**
 * ProductSearch-specific return type extending the base listing return
 */
export type IUseProductSearch = UseListingReturn<'ProductSearch'>

/**
 * Composable for managing product search with filtering, sorting, and pagination
 * Implemented using the generic useListing composable
 */
export function useProductSearch(categoryKey?: MaybeRef<string>): IUseProductSearch {
  const { token } = useContext()
  const { t } = useI18n()

  return useListing({
    name: 'ProductSearch',
    params: {
      categoryKey: unref(categoryKey),
    },
    contextKey: token,
    cacheKey: `product-search-${unref(categoryKey) ?? 'product-search'}`,
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
