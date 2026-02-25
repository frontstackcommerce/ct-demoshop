// Shared types

interface Media {
  src: string
  altText?: string
  key?: string
  mimeType?: string
  thumbnailSrc?: string
  type?: string
}

interface PageRoute {
  path: string
}

interface Price {
  amount: number
  currency: string
  precision: number
  scales?: PriceScale[]
}

interface PriceScale {
  minQuantity: number
  amount: number
}

interface Option {
  key: string
  label: string
  value: string
}

// Product types

interface ProductVariant {
  key: string
  name?: string
  price: Price
  images: Media[]
  options?: Option[]
  properties?: Option[]
}

interface ProductReview {
  key: string
  name?: string
  rating: number
  date?: string
  summary: string
  text: string
}

interface ProductReviews {
  items: ProductReview[]
  total: number
  aggregation?: {
    rating?: {
      total: {
        avg: number
      }
    }
  }
}

interface ProductCard {
  name: string
  brand: string
  price: Price
  link?: PageRoute
  variants: ProductVariant[]
}

interface ProductFull {
  name: string
  description?: string
  brand: string
  variants: ProductVariant[]
  reviews?: ProductReviews
  link?: PageRoute
}

// Category types

interface CategoryNested {
  key: string
  name: string
  link?: PageRoute
  children?: CategoryNestedChilds
}

interface CategoryNestedChilds {
  items: CategoryNested[]
}

interface CategoryFull {
  key: string
  name: string
  breadcrumbs?: string[]
  products: {
    items: ProductCard[]
  }
}

// Menu types

interface MenuItem {
  key: string
  name: string
  label?: string
  href?: string
  path?: string
  link?: PageRoute
  image?: Media
  children?: CategoryNestedChilds
}

interface MenuTree {
  items: MenuItem[]
}

// Commerce types

interface LineItem {
  id: string
  key: string
  quantity: number
  name: Record<string, string>
  price?: {
    value?: {
      centAmount: number
      currencyCode: string
      fractionDigits: number
    }
  }
  variant?: {
    images?: Array<{
      url: string
      label?: string
    }>
  }
}

// Search/Filter types

interface FilterOption {
  value: string
  option: string
  count: number
  selected: boolean
  disabled: boolean
}

type FilterGroup = FilterOption[]

interface UiFilter {
  key: string
  label: string
  options: FilterOption[]
}

interface UiSort {
  key: string
  value: string
  label: string
}

// Context types

interface ContextLocale {
  key: string
  url: string
}

interface ContextOption {
  region: string
  locales: ContextLocale[]
}

interface Context {
  locale: string
  region: string
  suggested?: {
    path: string
    locale: string
  }
}

// Brand types

interface BrandCard {
  key: string
  name: string
  link?: PageRoute
  image?: Media
}
