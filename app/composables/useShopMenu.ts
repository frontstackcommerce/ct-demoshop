import type { DeepReadonly, ShallowRef } from 'vue'
import { shopMenuQuery } from '@/queries/shopMenu'

interface IUseMenu {
  menuState: ShallowRef<MenuState>
  isOpen: ComputedRef<boolean>
  aboutMenu: DeepReadonly<Ref<MenuItem[]>>
  supportMenu: DeepReadonly<Ref<MenuItem[]>>
  footerCategories: DeepReadonly<Ref<MenuItem[]>>
  fullMenu: DeepReadonly<Ref<MenuTree>>
  openCart: () => void
  closeMenu: () => void
}

export const useShopMenu = (): IUseMenu => {
  const { $i18n } = useNuxtApp()
  const { locale, t } = $i18n
  const { token } = useContext()

  const { data: fullMenu } = useQuery(shopMenuQuery, {
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

  const aboutMenu = computed(() => {
    return [
      {
        label: t('footer.menu.about.about'),
        href: locale.value === 'de' ? '/ueber-uns' : '/about',
      },
      {
        label: t('footer.menu.about.help'),
        href: locale.value === 'de' ? '/hilfe' : '/help',
      },
      {
        label: t('footer.menu.about.contact'),
        href: locale.value === 'de' ? '/kontakt' : '/contact',
      },
      {
        label: t('footer.menu.about.store-locator'),
        href: 'stores',
      },
      {
        label: t('footer.menu.about.order-status'),
        href: '/order-status',
      },
    ]
  })

  const supportMenu = computed(() => {
    return [
      {
        label: t('footer.menu.support.support'),
        href: locale.value === 'de' ? '/support' : '/support',
      },
      {
        label: t('footer.menu.support.contact'),
        href: locale.value === 'de' ? '/kontakt' : '/contact',
      },
      {
        label: t('footer.menu.support.order'),
        href: locale.value === 'de' ? '/bestellstatus' : '/order-status',
      },
      {
        label: t('footer.menu.support.shipping'),
        href: locale.value === 'de' ? '/versand' : '/shipping',
      },
      {
        label: t('footer.menu.support.return-policy'),
        href: locale.value === 'de' ? '/rueckgaben' : '/return-policy',
      },
      {
        label: t('footer.menu.support.warranty'),
        href: locale.value === 'de' ? '/garantie' : '/warranty',
      },
      {
        label: t('footer.menu.support.size-guide'),
        href: locale.value === 'de' ? '/groessenleitfaden' : '/size-guide',
      },
    ]
  })

  const footerCategories = computed(() => {
    return [
      {
        label: t('categories.women'),
        href: '/goggles-0194bcdcdefc7c989023b4dec31c14e3',
        children: [
          {
            label: t('categories.shoes'),
            href: '/goggles-0194bcdcdefc7c989023b4dec31c14e3',
          },
          {
            label: t('categories.clothing'),
            href: '/goggles-0194bcdcdefc7c989023b4dec31c14e3',
          },
        ],
      },
      {
        label: t('categories.men'),
        href: '/goggles-0194bcdcdefc7c989023b4dec31c14e3',
        children: [
          {
            label: t('categories.shoes'),
            href: '/goggles-0194bcdcdefc7c989023b4dec31c14e3',
          },
          {
            label: t('categories.clothing'),
            href: '/goggles-0194bcdcdefc7c989023b4dec31c14e3',
          },
        ],
      },
      {
        label: t('categories.kids'),
        href: '/goggles-0194bcdcdefc7c989023b4dec31c14e3',
        children: [
          {
            label: t('categories.shoes'),
            href: '/goggles-0194bcdcdefc7c989023b4dec31c14e3',
          },
        ],
      },
      {
        label: t('categories.sale'),
        href: '/goggles-0194bcdcdefc7c989023b4dec31c14e3',
        children: [
          {
            label: t('categories.shoes'),
            href: '/goggles-0194bcdcdefc7c989023b4dec31c14e3',
          },
          {
            label: t('categories.clothing'),
            href: '/goggles-0194bcdcdefc7c989023b4dec31c14e3',
          },
        ],
      },
    ]
  })

  return {
    aboutMenu,
    closeMenu,
    supportMenu,
    menuState,
    footerCategories,
    fullMenu,
    openCart,
    isOpen,
  }
}
