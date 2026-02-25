export function formatPrice(price: Price): string {
  const amount = price.amount ?? 0
  const precision = price.precision ?? 2
  const currency = price.currency ?? 'EUR'
  const value = amount / Math.pow(10, precision)
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(value)
}
