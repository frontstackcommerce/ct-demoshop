import type { DeepReadonly, ShallowRef } from 'vue'
import { categoryMenuByKeyQuery } from '@/queries/categoryMenu'

const MAIN_NAV = {
  HOMEDECOR: 'eac3db8c-71e5-4ac2-905a-7b23abadceb8',
  FURNITURE: 'e964e0a3-1ac9-4f9a-9679-20180b3f6cef',
  KITCHEN: '8ea36869-576b-44c0-bfda-8ca81ba1efd7',
  NEW_ARRIVALS: 'a3a959b3-6f13-450a-80e8-7fc9ce5fb26c',
}

interface IUseMenu {
  menuState: ShallowRef<MenuState>
  isOpen: ComputedRef<boolean>
  aboutMenu: DeepReadonly<Ref<MenuItem[]>>
  supportMenu: DeepReadonly<Ref<MenuItem[]>>
  utilMenu: DeepReadonly<Ref<MenuItem[]>>
  footerCategories: DeepReadonly<Ref<MenuItem[]>>
  shopCategories: DeepReadonly<Ref<CategoryMenu[]>>
  openCart: () => void
  closeMenu: () => void
}

export const useMenu = (): IUseMenu => {
  const { t, locale } = useI18n()

  const { data: furnitureMenu } = useQuery(categoryMenuByKeyQuery, {
    key: MAIN_NAV.FURNITURE,
  })

  const { data: kitchenMenu } = useQuery(categoryMenuByKeyQuery, {
    key: MAIN_NAV.KITCHEN,
  })

  const { data: newArrivalsMenu } = useQuery(categoryMenuByKeyQuery, {
    key: MAIN_NAV.NEW_ARRIVALS,
  })

  const { data: homeDecorMenu } = useQuery(categoryMenuByKeyQuery, {
    key: MAIN_NAV.HOMEDECOR,
  })

  const shopCategories = computed(() => [
    furnitureMenu.value,
    kitchenMenu.value,
    homeDecorMenu.value,
    newArrivalsMenu.value,
  ])

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

  const utilMenu = computed(() => {
    return [
      {
        label: t('header.utils.stores'),
        href: '/stores',
      },
      {
        label: t('header.utils.login'),
        href: '/login',
      },
    ]
  })

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
    utilMenu,
    footerCategories,
    shopCategories,
    openCart,
    isOpen,
  }
}
