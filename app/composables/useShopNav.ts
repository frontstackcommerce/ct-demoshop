export function useShopNav() {
  const section = useState<'menu' | 'search' | 'cart' | 'account'>('shop-nav-section', () => 'menu')
  const open = useState('shop-nav-open', () => false)
  const hideNavMenu = useState('shop-nav-hide-menu', () => false)
  const showNavMenuInside = useState('shop-nav-show-inside', () => false)

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
