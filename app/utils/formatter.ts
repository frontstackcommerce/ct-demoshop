export function formatPrice(price: Price): string {
  const value = price.amount / Math.pow(10, price.precision)
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: price.precision,
    maximumFractionDigits: price.precision,
  }).format(value)
}
