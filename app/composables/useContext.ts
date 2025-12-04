import client from '~~/.frontstack/generated-client'
import type { ShallowRef } from 'vue'
import { useMutation, useQuery, useQueryCache } from '@pinia/colada'
import {
  apiContextByKeyQuery,
  API_CONTEXT_QUERY_KEYS,
  apiContextListQuery,
} from '~/queries/apiContext'

interface IUseContext {
  token: ShallowRef<ContextToken | undefined>
  context: ShallowRef<Context | undefined>
  contextList: ShallowRef<ContextOption[] | undefined>
  newContext: (context: { region: string; locale: string }) => Promise<void>
  updateContext: (context: { region: string; locale: string }) => Promise<Context>
  getLocaleLabel: (locale: string) => string
  getRegionLabel: (region: string) => string
}

export const useContext = (): IUseContext => {
  const token = useCookie<ContextToken>(COOKIES.fstContext.name, {
    maxAge: COOKIES.fstContext.maxAge,
  })
  const queryCache = useQueryCache()
  const { $i18n } = useNuxtApp()
  const { setLocale, t } = $i18n

  async function newContext(context?: { region: string; locale: string }) {
    token.value = crypto.randomUUID()
    if (context) {
      await updateContext({
        region: context.region,
        locale: context.locale,
      })
    }
  }

  const { data: context } = useQuery(apiContextByKeyQuery, { key: token })
  const { data: contextList } = useQuery(apiContextListQuery)
  const { mutateAsync: updateContext } = useMutation({
    mutation: async (context: { region: string; locale: string }): Promise<Context> => {
      const result = await client.contextUpdate(
        { region: context.region, locale: context.locale },
        token.value as string
      )
      await setLocale(
        context.locale.includes('de') ? 'de' : context.locale.includes('uk') ? 'uk' : 'us'
      )
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
  function getLocaleLabel(locale: string) {
    switch (locale) {
      case 'de-de':
        return t('locales.de-de')
      case 'en-us':
        return t('locales.en-us')
      default:
        return locale
    }
  }

  function getRegionLabel(region: string) {
    switch (region) {
      case 'de':
        return t('regions.de')
      case 'ch':
        return t('regions.ch')
      case 'gb':
        return t('regions.gb')
      case 'us':
        return t('regions.us')
      default:
        return region
    }
  }

  return {
    token,
    context,
    contextList,
    newContext,
    updateContext,
    getLocaleLabel,
    getRegionLabel,
  }
}
