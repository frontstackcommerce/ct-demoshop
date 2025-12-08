import type { ShallowRef } from 'vue'
import { shopMenuQuery } from '@/queries/shopMenu'

interface IUseShopMenu {
  menuState: ShallowRef<MenuState>
  isOpen: ComputedRef<boolean>
  aboutTree: ComputedRef<MenuItem[] | undefined>
  supportTree: ComputedRef<MenuItem[] | undefined>
  fullTree: ShallowRef<MenuTree | undefined>
  showCart: () => void
  closeMenu: () => void
}

export const useShopMenu = (): IUseShopMenu => {
  const { $i18n } = useNuxtApp()
  const { t } = $i18n
  const { token } = useContext()

  // const { data: fullTree } = useQuery(shopMenuQuery, () => ({
  //   contextKey: token.value,
  // }))
  const fullTree = ref<MenuTree | undefined>(undefined)

  const menuState = useState<MenuState>('menuState', () => undefined)
  const isOpen = computed(() => !!menuState.value)

  function showCart() {
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
          path: '/content/about',
        },
      },
      {
        key: 'help',
        name: t('footer.menu.about.help'),
        link: {
          path: '/content/help',
        },
      },
      {
        key: 'contact',
        name: t('footer.menu.about.contact'),
        link: {
          path: '/content/contact',
        },
      },
      {
        key: 'store-locator',
        name: t('footer.menu.about.store-locator'),
        link: {
          path: '/content/stores',
        },
      },
      {
        key: 'order-status',
        name: t('footer.menu.about.order-status'),
        link: {
          path: '/content/order-status',
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
          path: '/content/support',
        },
      },
      {
        key: 'contact',
        name: t('footer.menu.support.contact'),
        link: {
          path: '/content/contact',
        },
      },
      {
        key: 'order-status',
        name: t('footer.menu.support.order'),
        link: {
          path: '/content/order-status',
        },
      },
      {
        key: 'shipping',
        name: t('footer.menu.support.shipping'),
        link: {
          path: '/content/shipping',
        },
      },
      {
        key: 'return-policy',
        name: t('footer.menu.support.return-policy'),
        link: {
          path: '/content/return-policy',
        },
      },
      {
        key: 'warranty',
        name: t('footer.menu.support.warranty'),
        link: {
          path: '/content/warranty',
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
    showCart,
    isOpen,
  }
}
