// TODO: Replace with Frontic favorites composable
export function useFavorites() {
  const favorites = ref<ProductCard[]>([])
  const favoritesList = ref<{ items: ProductCard[] }>({ items: [] })
  const status = ref<'success' | 'pending' | 'error'>('pending')

  return {
    favorites,
    favoritesList,
    status,
  }
}
