export function useShopMenu() {
  const { listing } = useFronticListing('MenuTree', {})

  const fullTree = computed(() => listing.value ?? null)

  const aboutTree = computed(() => listing.value?.items?.find((i: any) => i.key === 'about')?.children?.items ?? [])
  const supportTree = computed(() => listing.value?.items?.find((i: any) => i.key === 'support')?.children?.items ?? [])

  // UI state (not data-related)
  const menuState = ref('')
  const isOpen = ref(false)
  const closeMenu = () => {
    isOpen.value = false
    menuState.value = ''
  }

  return { fullTree, aboutTree, supportTree, menuState, isOpen, closeMenu }
}
