import client from '~~/.frontstack/generated-client'

export const API_CONTEXT_QUERY_KEYS = {
  root: ['api-context'] as const,
  byKey: (key: MaybeRef<string>) => [...API_CONTEXT_QUERY_KEYS.root, unref(key)] as const,
  list: () => [...API_CONTEXT_QUERY_KEYS.root, 'list'] as const,
}

export const apiContextByKeyQuery = ({ key }: { key: MaybeRef<string> }) => {
  return {
    key: API_CONTEXT_QUERY_KEYS.byKey(key),
    query: async () => {
      return await client.context(unref(key))
    },
    enabled: !!unref(key),
  }
}

export const apiContextListQuery = () => {
  return {
    key: API_CONTEXT_QUERY_KEYS.list(),
    query: async () => {
      const [data] = await client.contextList()
      return data
    },
  }
}
