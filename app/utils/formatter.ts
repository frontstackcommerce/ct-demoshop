export function capitalize(val: string): string {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1)
}

export const formatPrice = (price: Price) => {
  const precision = typeof price.precision === 'number' ? price.precision : 2
  const divisor = Math.pow(10, precision)
  const amount = price.amount ? price.amount / divisor : 0
  if (price.amount) {
    if (price.currency) {
      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: price.currency,
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      }).format(amount)
    } else {
      return amount.toLocaleString(undefined, {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      })
    }
  }
  return 0
}
