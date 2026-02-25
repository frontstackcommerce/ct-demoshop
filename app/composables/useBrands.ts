// TODO: Replace with Frontic brands composable
export function useBrands() {
  const brands = ref<{ items: BrandCard[] }>({ items: [] })

  return {
    brands,
  }
}
