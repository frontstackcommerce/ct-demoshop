export function capitalize(val: string): string {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1)
}

export const formatPrice = (price: Price) => {
  return price.amount
    ? price.currency
      ? new Intl.NumberFormat(undefined, { style: 'currency', currency: price.currency }).format(
          price.amount / 100
        )
      : (price.amount / 100).toLocaleString()
    : 0
}
