export function useMenuState() {
  // UI state (not data-related)
  const menuState = ref('')
  const isOpen = ref(false)
  const closeMenu = () => {
    isOpen.value = false
    menuState.value = ''
  }

  return { menuState, isOpen, closeMenu }
}
