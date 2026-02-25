// TODO: Replace with Frontic page router composable
export function usePageRouter() {
  const page = ref<{
    type: string
    data: ProductFull | CategoryFull | null
    route?: {
      context?: {
        region: string
        locale: string
        suggested?: { path: string; locale: string }
      }
    }
  } | null>(null)

  const status = ref<'success' | 'pending' | 'error'>('pending')
  const suggestRedirect = ref(false)

  return {
    page,
    status,
    suggestRedirect,
  }
}
