// Shared types used by both app and server

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

interface MoneyData {
  centAmount: number
  currencyCode: string
  fractionDigits: number
}

interface AddressData {
  firstName: string
  lastName: string
  streetName: string
  streetNumber: string
  postalCode: string
  city: string
  country: string
  phone: string
}

interface CartData {
  id: string
  version: number
  lineItems: LineItem[]
  totalPrice: MoneyData
  customerEmail?: string
  shippingAddress?: AddressData
  billingAddress?: AddressData
  shippingMethod?: ShippingMethodOption
  taxedPrice?: {
    totalGross: MoneyData
    totalNet: MoneyData
    totalTax?: MoneyData
  }
}

interface AddressForm {
  firstName: string
  lastName: string
  streetName: string
  streetNumber: string
  postalCode: string
  city: string
  country: string
  phone: string
}

interface ShippingMethodOption {
  id: string
  name: string
  price: MoneyData
}

interface OrderConfirmation {
  id: string
  orderNumber?: string
  totalPrice: MoneyData
  customerEmail?: string
  createdAt: string
}

interface CustomerData {
  id: string
  email: string
  firstName?: string
  lastName?: string
  addresses?: AddressData[]
  defaultShippingAddressId?: string
  defaultBillingAddressId?: string
}
