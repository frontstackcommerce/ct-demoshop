export function useFavorites() {
  const favorites = useState<string[]>('favorites', () => [])
  const status = ref<'idle' | 'pending' | 'success'>('success')

  const favoritesList = computed<{ items: any[] }>(() => ({ items: favorites.value }))

  function addFavorite(productKey: string) {
    if (!favorites.value.includes(productKey)) {
      favorites.value = [...favorites.value, productKey]
    }
  }

  function removeFavorite(productKey: string) {
    favorites.value = favorites.value.filter((key) => key !== productKey)
  }

  function toggleFavorite(productKey: string) {
    if (favorites.value.includes(productKey)) {
      removeFavorite(productKey)
    } else {
      addFavorite(productKey)
    }
  }

  function isFavorite(productKey: string) {
    return favorites.value.includes(productKey)
  }

  return {
    favorites,
    favoritesList,
    status,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  }
}
