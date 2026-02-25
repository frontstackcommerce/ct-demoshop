export function useCategory(categoryKey: string, _breadcrumbs?: ComputedRef<string[]>) {
  const { listing, status } = useFronticListing('CategoryMeta', { categoryKeys: [categoryKey] })

  const metadata = computed(() => {
    if (!listing.value?.items?.[0]) return null
    return { item: listing.value.items[0] }
  })

  return { metadata, status }
}
