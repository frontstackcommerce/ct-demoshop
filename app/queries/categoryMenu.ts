import client from '~~/.frontstack/generated-client'

export const CATEGORY_MENU_QUERY_KEYS = {
  root: ['category-menu'] as const,
  byKey: (key: MaybeRef<string>) => [...CATEGORY_MENU_QUERY_KEYS.root, unref(key)] as const,
}

export const categoryMenuByKeyQuery = ({ key }: { key: MaybeRef<string> }) => {
  const { token } = useContext()
  return {
    key: CATEGORY_MENU_QUERY_KEYS.byKey(key),
    query: async () => {
      return await client.block('CategoryMenu', unref(key), { contextKey: token.value as string })
    },
    staleTime: 1000 * 60 * 60,
  }
}
