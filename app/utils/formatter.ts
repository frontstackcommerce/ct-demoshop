export function formatPrice(price: Price, locale?: string): string {
  const amount = price.amount ?? 0
  const precision = price.precision ?? 2
  const currency = price.currency ?? 'EUR'
  const value = amount / Math.pow(10, precision)
  return new Intl.NumberFormat(locale || undefined, {
    style: 'currency',
    currency,
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(value)
}

export function formatLabel(label: string): string {
  return label.toUpperCase()
}
