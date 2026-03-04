interface IUseContext {
  token: Ref<string | undefined>
  context: Ref<any>
  contextList: Ref<any[] | undefined>
  shops: ComputedRef<Shops>
  newContext: (context: { region: string; locale: string }) => Promise<void>
  updateContext: (context: { region: string; locale: string }) => Promise<any>
  getLocaleLabel: (locale: string) => string
  getRegionLabel: (region: string) => string
}

export const useContext = (): IUseContext => {
  const { $i18n } = useNuxtApp()
  const { setLocale, t } = $i18n

  const { contexts, current, update } = useFronticContext()

  const token = computed(() => current.value?.token)

  const context = computed(() => current.value)
  const contextList = computed(() => contexts.value)

  async function newContext(ctx?: { region: string; locale: string }) {
    if (ctx) {
      await updateContext(ctx)
    }
  }

  async function updateContext(ctx: { region: string; locale: string }) {
    const result = await update({ region: ctx.region, locale: ctx.locale })

    const newSnippet =
      ctx.region === 'eu' && ctx.locale === 'de-DE'
        ? 'de'
        : ctx.region === 'uk'
          ? 'en'
          : ctx.region === 'us'
            ? 'en'
            : 'en'
    await setLocale(newSnippet)
    return result
  }

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
