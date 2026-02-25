export function usePageRouter() {
  const { page: fronticPage, data, type, route, alternates, status } = useFronticPage()

  const page = computed(() => {
    if (!fronticPage.value) return null
    return {
      type: type.value,
      data: data.value,
      route: route.value,
    }
  })

  const suggestRedirectDismissed = ref(false)
  const suggestRedirect = computed({
    get: () => !suggestRedirectDismissed.value && !!route.value?.context?.suggested?.path,
    set: (val: boolean) => {
      if (!val) suggestRedirectDismissed.value = true
    },
  })

  return { page, status, suggestRedirect, alternates }
}
