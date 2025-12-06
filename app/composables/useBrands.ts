import type { ShallowRef } from 'vue'

import type { UseQueryReturn } from '@pinia/colada'
import { shopBrandsListAllQuery } from '~/queries/shopBrands'

interface IUseBrands {
  brands: ShallowRef<BrandListing | undefined>
  status: UseQueryReturn['status']
}

/**
 * Composable for managing brand listings with filtering, sorting, and pagination
 */
export const useBrands = (): IUseBrands => {
  const { token } = useContext()
  const { data: brands, status } = useQuery(shopBrandsListAllQuery, { contextKey: token.value })

  return {
    brands,
    status,
  }
}
