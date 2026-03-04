interface IUseContext {
  token: Readonly<Ref<string | null>>
  context: Readonly<Ref<Context | null>>
  contexts: Readonly<Ref<ContextOption[]>>
  shops: ComputedRef<Shops>
  update: (context: { region: string; locale: string }) => Promise<void>
  isLoading: Readonly<Ref<boolean>>
  getLocaleLabel: (locale: string) => string
  getRegionLabel: (region: string) => string
}

export const useContext = (): IUseContext => {
  const { t } = useI18n()

  const { token, current: context, contexts, update, isLoading } = useFronticContext()

  function getLocaleLabel(locale: string) {
    switch (locale) {
      case 'de-DE':
        return shops.value.DE.localeLabel
      default:
        return shops.value.EU.localeLabel
    }
  }

  function getRegionLabel(region: string) {
    switch (region) {
      case 'eu':
        return shops.value.EU.regionLabel
      default:
        return region
    }
  }

  const shops = computed<Shops>(() => {
    return {
      DE: {
        path: '/de',
        region: 'eu',
        regionLabel: t('regions.eu'),
        locale: 'de-DE',
        localeLabel: t('locales.de'),
        snippet: 'de',
      },
      EU: {
        path: '/',
        region: 'eu',
        regionLabel: t('regions.eu'),
        locale: 'en-GB',
        localeLabel: t('locales.en'),
        snippet: 'en',
      },
    }
  })

  return {
    token,
    context,
    contexts,
    shops,
    update,
    isLoading,
    getLocaleLabel,
    getRegionLabel,
  }
}
