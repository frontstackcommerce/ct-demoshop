export function useContext() {
  const { contexts, current, token, update } = useFronticContext()

  const context = computed(() => current.value)
  const contextList = computed(() => contexts.value ?? [])

  const updateContext = async (options: { region: string; locale: string }) => {
    await update(options)
  }

  const getLocaleLabel = (locale: string): string => locale.toUpperCase()
  const getRegionLabel = (region: string): string => region.toUpperCase()

  return { context, token, contextList, updateContext, getLocaleLabel, getRegionLabel }
}
