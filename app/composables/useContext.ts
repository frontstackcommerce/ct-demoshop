import client from '~~/.frontstack/generated-client'
import type { ShallowRef } from 'vue'
import { useMutation, useQuery, useQueryCache } from '@pinia/colada'
import {
  apiContextByKeyQuery,
  API_CONTEXT_QUERY_KEYS,
  apiContextListQuery,
} from '~/queries/apiContext'
import { SHOP_MENU_QUERY_KEYS } from '~/queries/shopMenu'

interface IUseContext {
  token: ShallowRef<ContextToken | undefined>
  context: ShallowRef<Context | undefined>
  contextList: ShallowRef<ContextOption[] | undefined>
  shops: ShallowRef<Shops>
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

      const newSnippet =
        context.region === 'eu' && context.locale === 'de-DE'
          ? 'de'
          : context.region === 'uk'
            ? 'uk'
            : context.region === 'us'
              ? 'us'
              : 'eu'
      await setLocale(newSnippet)
      return Promise.resolve(result)
    },
    onSuccess: async (data) => {
      await queryCache.invalidateQueries({ key: SHOP_MENU_QUERY_KEYS.root })
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
      case 'de-DE':
        return shops.value.DE.localeLabel
      case 'en-GB':
        return shops.value.UK.localeLabel
      case 'en-us':
        return shops.value.US.localeLabel
      default:
        return locale
    }
  }

  function getRegionLabel(region: string) {
    switch (region) {
      case 'eu':
        return shops.value.EU.regionLabel
      case 'uk':
        return shops.value.UK.regionLabel
      case 'us':
        return shops.value.US.regionLabel
      default:
        return region
    }
  }
  const shops = computed(() => {
    return {
      DE: {
        path: '/de',
        region: 'eu',
        regionLabel: t('regions.eu'),
        locale: 'de-DE',
        localeLabel: t('locales.de'),
        snippet: 'de',
      },
      UK: {
        path: '/uk',
        region: 'uk',
        regionLabel: t('regions.uk'),
        locale: 'en-GB',
        localeLabel: t('locales.en'),
        snippet: 'uk',
      },
      EU: {
        path: '/',
        region: 'eu',
        regionLabel: t('regions.eu'),
        locale: 'en-GB',
        localeLabel: t('locales.en'),
        snippet: 'eu',
      },
      US: {
        path: '/us',
        region: 'us',
        regionLabel: t('regions.us'),
        locale: 'en-us',
        localeLabel: t('locales.en'),
        snippet: 'us',
      },
    }
  })

  return {
    token,
    context,
    contextList,
    shops,
    newContext,
    updateContext,
    getLocaleLabel,
    getRegionLabel,
  }
}
