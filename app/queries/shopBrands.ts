import client from '~~/.frontstack/generated-client'

export const SHOP_BRANDS_QUERY_KEYS = {
  root: ['shop-brands'] as const,
  listAll: () => [...SHOP_BRANDS_QUERY_KEYS.root, 'list-all'] as const,
  byKey: (key: MaybeRef<string>) => [...SHOP_BRANDS_QUERY_KEYS.root, unref(key)] as const,
}

export const shopBrandsListAllQuery = ({ contextKey }: { contextKey?: MaybeRef<string> }) => {
  return {
    key: SHOP_BRANDS_QUERY_KEYS.listAll(),
    query: async () => {
      return await client.listing('BrandListing', {}, { contextKey: unref(contextKey) })
    },
    staleTime: 1000 * 60 * 60,
  }
}
