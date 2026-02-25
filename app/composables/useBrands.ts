export function useBrands() {
  const { listing } = useFronticListing('BrandListing', {})

  const brands = computed(() => listing.value ?? { items: [] })

  return { brands }
}
