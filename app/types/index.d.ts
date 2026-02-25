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
