export function useMenuState() {
  const menuState = useState('menu-state', () => '')
  const isOpen = useState('menu-open', () => false)
  const closeMenu = () => {
    isOpen.value = false
    menuState.value = ''
  }

  return { menuState, isOpen, closeMenu }
}
