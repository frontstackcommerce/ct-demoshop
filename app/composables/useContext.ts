// TODO: Replace with Frontic context composable
export function useContext() {
  const context = ref<Context>({
    locale: 'en',
    region: 'eu',
  })

  const token = ref('')

  const contextList = ref<ContextOption[]>([])

  const updateContext = async (_options: { region: string; locale: string }) => {
    // stub
  }

  const getLocaleLabel = (locale: string): string => {
    return locale.toUpperCase()
  }

  const getRegionLabel = (region: string): string => {
    return region.toUpperCase()
  }

  return {
    context,
    token,
    contextList,
    updateContext,
    getLocaleLabel,
    getRegionLabel,
  }
}
