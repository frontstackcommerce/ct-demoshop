import client from '~~/.frontstack/generated-client'
import type { ShallowRef } from 'vue'
import { defineQuery, useMutation, useQuery, useQueryCache } from '@pinia/colada'
import { apiContextByKeyQuery, API_CONTEXT_QUERY_KEYS } from '~/queries/apiContext'

interface IUseContext {
  token: ShallowRef<ContextToken | undefined>
  context: ShallowRef<Context | undefined>
  newContext: (context?: Context) => Promise<void>
  updateContext: (context: Context) => Promise<Context>
}

export const useContext = defineQuery((): IUseContext => {
  const token = useCookie<ContextToken>(COOKIES.fstContext.name, {
    maxAge: COOKIES.fstContext.maxAge,
  })
  const queryCache = useQueryCache()
  const { $i18n } = useNuxtApp()
  const { setLocale } = $i18n

  async function newContext(context?: Context) {
    token.value = crypto.randomUUID()
    if (context) {
      await updateContext(context)
    }
  }

  const { data: context } = useQuery(apiContextByKeyQuery, { key: token })

  watch(
    context,
    (context) => {
      if (context) {
        // Call User identification
        console.log('Context updated', context)
      }
    },
    { immediate: true }
  )

  const { mutateAsync: updateContext } = useMutation({
    mutation: async (context: Context): Promise<Context> => {
      const result = await client.contextUpdate(context, token.value as string)
      await setLocale(context.locale.includes('de') ? 'de' : 'en')
      return Promise.resolve(result)
    },
    onSettled: (data) => {
      if (data) {
        queryCache.setQueryData(API_CONTEXT_QUERY_KEYS.byKey(token), data)
      }
    },
    onError: (error) => {
      console.error('Failed to update context', error)
    },
  })

  return {
    token,
    context,
    newContext,
    updateContext,
  }
})
