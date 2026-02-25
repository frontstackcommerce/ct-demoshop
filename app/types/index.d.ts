// UI types for search controls
interface UiFilter {
  key: string
  label: string
  options: FilterGroup
}

interface UiSort {
  key: string
  value: string
  label: string
}

// Cart-specific type (not provided by Frontic)

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
