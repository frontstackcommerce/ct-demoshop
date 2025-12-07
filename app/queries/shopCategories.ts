import client from '~~/.frontstack/generated-client'

export const SHOP_CATEGORIES_QUERY_KEYS = {
  root: ['shop-categories'] as const,
  metadataByKey: (key: MaybeRef<string>, breadcrumbs: MaybeRef<string[]>) =>
    [...SHOP_CATEGORIES_QUERY_KEYS.root, unref(key), unref(breadcrumbs)] as const,
}

export const categoryMetadataByKeyQuery = ({
  key,
  breadcrumbs,
  contextKey,
}: {
  key: MaybeRef<string>
  breadcrumbs: MaybeRef<string[]>
  contextKey?: MaybeRef<string>
}) => {
  return {
    key: SHOP_CATEGORIES_QUERY_KEYS.metadataByKey(key, breadcrumbs),
    query: async () => {
      return await client.listing(
        'CategoryMeta',
        { categoryKeys: unref(breadcrumbs) },
        { contextKey: unref(contextKey) }
      )
    },
    staleTime: 1000 * 60 * 60,
  }
}
