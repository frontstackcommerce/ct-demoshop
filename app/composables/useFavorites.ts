import { useLocalStorage } from '@vueuse/core'

export function useFavorites() {
  const keys = useLocalStorage<string[]>('favorites', [])

  const { listing, status } = useFronticListing(
    'FavoritesProducts',
    computed(() => ({ keys: keys.value })),
  )

  const favorites = computed(() => keys.value)
  const favoritesList = computed(() => listing.value ?? { items: [] })

  const addFavorite = (key: string) => {
    if (!keys.value.includes(key)) keys.value.push(key)
  }

  const removeFavorite = (key: string) => {
    keys.value = keys.value.filter((k) => k !== key)
  }

  const isFavorite = (key: string) => keys.value.includes(key)

  return { favorites, favoritesList, status, addFavorite, removeFavorite, isFavorite }
}
