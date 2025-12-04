import { pageByUrlQuery } from '@/queries/pageRouter'
import type { UseQueryReturn } from '@pinia/colada'
import type { ShallowRef } from 'vue'

interface IUsePageRouter {
  /** The current result set containing products and metadata */
  page: ShallowRef<Page | undefined>
  /** Current fetch status of the product list */
  status: UseQueryReturn['status']
  /** Whether to redirect to the suggested route */
  suggestRedirect: ShallowRef<boolean>
}

export const usePageRouter = (): IUsePageRouter => {
  const route = useRoute()
  const { token } = useContext()
  const url = computed(() => {
    if (route.fullPath === '/') {
      return ''
    }
    if (route.fullPath) {
      return route.fullPath
    }
    return ''
  })
  // Context token is now handled server-side in the proxy route
  const { data: page, status } = useQuery(pageByUrlQuery, { url, contextKey: token.value })

  const suggestRedirect = useState<boolean>('suggestRedirect', () => false)
  // Watch for suggested routes
  watch(
    () => page.value?.route.context?.suggested,
    (suggested) => {
      const is301 = page.value?.route.code === 301
      suggestRedirect.value = !!suggested && !is301
    },
    { immediate: true }
  )
  return {
    page,
    status,
    suggestRedirect,
  }
}
