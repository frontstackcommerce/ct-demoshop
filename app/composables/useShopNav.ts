import type { DeepReadonly, Ref } from 'vue'

type NavSection = 'home' | 'search' | 'cart' | 'filter' | 'menu' | 'account'

interface IUseShopNav {
  section: DeepReadonly<Ref<NavSection | undefined>>
  open: DeepReadonly<Ref<boolean>>
  showNavMenuInside: Ref<boolean>
  hideNavMenu: Ref<boolean>
  setSection: (section: NavSection) => void
  resetNav: () => void
  closeNav: () => void
}

export const useShopNav = (): IUseShopNav => {
  const _section = useState<NavSection | undefined>('nav-section', () => undefined)
  const _open = useState<boolean>('nav-open', () => false)
  const _showNavMenuInside = useState<boolean>('nav-animation-end', () => false)
  const _hideNavMenu = useState<boolean>('nav-hide-control', () => false)

  function setSection(section: NavSection) {
    _section.value = section
    _open.value = true
  }

  function resetNav() {
    _open.value = false
    _showNavMenuInside.value = false
    _section.value = undefined
  }
  function _closeNav() {
    _open.value = false
  }

  return {
    section: _section,
    open: _open,
    setSection,
    resetNav,
    closeNav: _closeNav,
    showNavMenuInside: _showNavMenuInside,
    hideNavMenu: _hideNavMenu,
  }
}
