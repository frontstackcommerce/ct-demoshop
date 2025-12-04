import client from '~~/.frontstack/generated-client'

export const PAGE_QUERY_KEYS = {
  root: ['page'] as const,
  byUrl: (url: MaybeRef<string>) => [...PAGE_QUERY_KEYS.root, unref(url)] as const,
}

export const pageByUrlQuery = ({
  url,
  contextKey,
}: {
  url: MaybeRef<string>
  contextKey?: MaybeRef<string>
}) => {
  return {
    key: PAGE_QUERY_KEYS.byUrl(url),
    query: async () => {
      return await client.page('localhost:3000' + unref(url), {
        contextKey: unref(contextKey),
      })
    },
  }
}
