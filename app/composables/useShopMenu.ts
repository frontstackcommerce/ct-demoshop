// TODO: Replace with Frontic data fetching
export function useShopMenu() {
  const fullTree = ref<MenuTree | null>(null)
  const aboutTree = ref<MenuItem[]>([])
  const supportTree = ref<MenuItem[]>([])
  const menuState = ref('')
  const isOpen = ref(false)

  const closeMenu = () => {
    isOpen.value = false
    menuState.value = ''
  }

  return {
    fullTree,
    aboutTree,
    supportTree,
    menuState,
    isOpen,
    closeMenu,
  }
}
