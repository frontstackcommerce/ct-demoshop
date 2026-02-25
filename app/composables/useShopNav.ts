// TODO: Replace with actual navigation state management
export function useShopNav() {
  const section = ref<'menu' | 'search' | 'cart' | 'account'>('menu')
  const open = ref(false)
  const hideNavMenu = ref(false)
  const showNavMenuInside = ref(false)

  const resetNav = () => {
    open.value = false
    section.value = 'menu'
  }

  const setSection = (newSection: 'menu' | 'search' | 'cart' | 'account') => {
    section.value = newSection
    open.value = true
  }

  return {
    section,
    open,
    hideNavMenu,
    showNavMenuInside,
    resetNav,
    setSection,
  }
}
