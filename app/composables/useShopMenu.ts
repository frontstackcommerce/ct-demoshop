import type { ShallowRef } from 'vue'
import { shopMenuQuery } from '@/queries/shopMenu'

interface IUseShopMenu {
  menuState: ShallowRef<MenuState>
  isOpen: ComputedRef<boolean>
  aboutTree: ComputedRef<MenuItem[] | undefined>
  supportTree: ComputedRef<MenuItem[] | undefined>
  fullTree: ShallowRef<MenuTree | undefined>
  openCart: () => void
  closeMenu: () => void
}

export const useShopMenu = (): IUseShopMenu => {
  const { $i18n } = useNuxtApp()
  const { locale, t } = $i18n
  const { token } = useContext()

  const { data: fullTree } = useQuery(shopMenuQuery, {
    contextKey: token.value,
  })

  const menuState = useState<MenuState>('menuState', () => undefined)
  const isOpen = computed(() => !!menuState.value)

  function openCart() {
    menuState.value = 'cart'
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function closeMenu() {
    menuState.value = undefined
  }

  const aboutTree = computed(() => {
    return [
      {
        key: 'about',
        name: t('footer.menu.about.about'),
        link: {
          path: locale.value === 'de' ? '/ueber-uns' : '/about',
        },
      },
      {
        key: 'help',
        name: t('footer.menu.about.help'),
        link: {
          path: locale.value === 'de' ? '/hilfe' : '/help',
        },
      },
      {
        key: 'contact',
        name: t('footer.menu.about.contact'),
        link: {
          path: locale.value === 'de' ? '/kontakt' : '/contact',
        },
      },
      {
        key: 'store-locator',
        name: t('footer.menu.about.store-locator'),
        link: {
          path: 'stores',
        },
      },
      {
        key: 'order-status',
        name: t('footer.menu.about.order-status'),
        link: {
          path: '/order-status',
        },
      },
    ] as MenuItem[]
  })

  const supportTree = computed(() => {
    return [
      {
        key: 'support',
        name: t('footer.menu.support.support'),
        link: {
          path: locale.value === 'de' ? '/support' : '/support',
        },
      },
      {
        key: 'contact',
        name: t('footer.menu.support.contact'),
        link: {
          path: locale.value === 'de' ? '/kontakt' : '/contact',
        },
      },
      {
        key: 'order-status',
        name: t('footer.menu.support.order'),
        link: {
          path: locale.value === 'de' ? '/bestellstatus' : '/order-status',
        },
      },
      {
        key: 'shipping',
        name: t('footer.menu.support.shipping'),
        link: {
          path: locale.value === 'de' ? '/versand' : '/shipping',
        },
      },
      {
        key: 'return-policy',
        name: t('footer.menu.support.return-policy'),
        link: {
          path: locale.value === 'de' ? '/rueckgaben' : '/return-policy',
        },
      },
      {
        key: 'warranty',
        name: t('footer.menu.support.warranty'),
        link: {
          path: locale.value === 'de' ? '/garantie' : '/warranty',
        },
      },
    ] as MenuItem[]
  })

  return {
    aboutTree,
    closeMenu,
    supportTree,
    menuState,
    fullTree,
    openCart,
    isOpen,
  }
}
