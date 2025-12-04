import client from '~~/.frontstack/generated-client'

export const CATEGORY_MENU_QUERY_KEYS = {
  root: ['category-menu'] as const,
  catogories: () => [...CATEGORY_MENU_QUERY_KEYS.root, 'categories'] as const,
  byKey: (key: MaybeRef<string>) => [...CATEGORY_MENU_QUERY_KEYS.root, unref(key)] as const,
}

export const categoryMenuByKeyQuery = ({
  key,
  contextKey,
}: {
  key: MaybeRef<string>
  contextKey?: MaybeRef<string>
}) => {
  return {
    key: CATEGORY_MENU_QUERY_KEYS.byKey(key),
    query: async () => {
      return await client.block('CategoryMenu', unref(key), { contextKey: unref(contextKey) })
    },
    staleTime: 1000 * 60 * 60,
  }
}
