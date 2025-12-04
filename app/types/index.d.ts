type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
}
type MenuItem = {
  label: string
  href: string
  children?: MenuItem[]
}

type CategoryItem = {
  label: string
  href: string
  sale?: boolean
  image?: string
  children?: CategoryItem[]
  key?: string
}

type MenuState = 'cart' | 'favorites' | 'search' | undefined

type Shop = {
  path: string
  region: string
  regionLabel: string
  locale: string
  localeLabel: string
  snippet: string
}
type Shops = {
  DE: Shop
  UK: Shop
  EU: Shop
  US: Shop
}
