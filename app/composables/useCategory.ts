import type { ShallowRef } from 'vue'

import type { UseQueryReturn } from '@pinia/colada'
import { categoryMetadataByKeyQuery } from '~/queries/shopCategories'

interface IUseCategory {
  metadata: ShallowRef<CategoryMeta | undefined>
  status: UseQueryReturn['status']
}

/**
 * Composable for managing brand listings with filtering, sorting, and pagination
 */
export const useCategory = (
  key: MaybeRef<string>,
  breadcrumbs: MaybeRef<string[]>
): IUseCategory => {
  const { token } = useContext()
  const { data: metadata, status } = useQuery(categoryMetadataByKeyQuery, () => ({
    key,
    breadcrumbs,
    contextKey: token.value,
  }))

  return {
    metadata,
    status,
  }
}
