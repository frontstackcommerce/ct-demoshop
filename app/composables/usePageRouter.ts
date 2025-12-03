import { pageByUrlQuery } from '@/queries/pageRouter'
import type { UseQueryReturn } from '@pinia/colada'
import type { ShallowRef } from 'vue'

interface IUsePageRouter {
  /** The current result set containing products and metadata */
  page: ShallowRef<Page | undefined>
  /** Current fetch status of the product list */
  status: UseQueryReturn['status']
}

export const usePageRouter = (url: MaybeRef<string>): IUsePageRouter => {
  // Context token is now handled server-side in the proxy route
  const { data: page, status } = useQuery(pageByUrlQuery, { url })

  return {
    page,
    status,
  }
}
