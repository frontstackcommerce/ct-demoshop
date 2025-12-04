import client from '~~/.frontstack/generated-client'

export const PAGE_QUERY_KEYS = {
  root: ['page'] as const,
  byUrl: (url: MaybeRef<string>) => [...PAGE_QUERY_KEYS.root, unref(url)] as const,
}

export const pageByUrlQuery = ({ url }: { url: MaybeRef<string> }) => {
  const { token } = useContext()
  return {
    key: PAGE_QUERY_KEYS.byUrl(url),
    query: async () => {
      return await client.page('ct.demo-shop.com' + unref(url), {
        contextKey: token.value as string,
      })
    },
  }
}
