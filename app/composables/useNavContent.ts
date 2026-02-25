export function useNavContent() {
  const { locale } = useI18n()
  return useAsyncData(`navigation-${locale.value}`, () =>
    queryCollection(`navigation_${locale.value}` as any).first(),
  )
}
