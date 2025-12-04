import client from '~~/.frontstack/generated-client'

export const SHOP_MENU_QUERY_KEYS = {
  root: ['shop-menu'] as const,
}

export const shopMenuQuery = ({ contextKey }: { contextKey?: MaybeRef<string> }) => {
  return {
    key: SHOP_MENU_QUERY_KEYS.root,
    query: async () => {
      return await client.listing('MenuTree', {}, { contextKey: unref(contextKey) })
    },
  }
}
