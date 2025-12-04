export function capitalize(val: string): string {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1)
}

export function formatPrice(price: number) {
  const EuroPrice = new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
  })

  return EuroPrice.format(price / 100)
}
