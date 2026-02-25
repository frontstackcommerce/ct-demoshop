const STORAGE_KEY = 'cart'

interface CartLineItem extends LineItem {
  _addedAt: number
}

function loadCart(): CartLineItem[] {
  if (import.meta.server) return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveCart(items: CartLineItem[]) {
  if (import.meta.server) return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

let _id = 0
function nextId() {
  return `cart-item-${++_id}-${Date.now()}`
}

export function useCart() {
  const lineItems = useState<CartLineItem[]>('cart-items', () => [])

  const totalPrice = computed(() => {
    const total = lineItems.value.reduce((sum, item) => {
      return sum + (item.price?.value?.centAmount ?? 0) * item.quantity
    }, 0)
    const first = lineItems.value[0]
    return {
      centAmount: total,
      currencyCode: first?.price?.value?.currencyCode ?? 'EUR',
      fractionDigits: first?.price?.value?.fractionDigits ?? 2,
    }
  })

  const context = ref({ locale: 'en' })

  const addLineItem = async (variantKey: string, quantity: number = 1) => {
    const existing = lineItems.value.find((item) => item.key === variantKey)
    if (existing) {
      existing.quantity += quantity
    } else {
      lineItems.value.push({
        id: nextId(),
        key: variantKey,
        quantity,
        name: { en: variantKey },
        price: {
          value: {
            centAmount: 2999,
            currencyCode: 'EUR',
            fractionDigits: 2,
          },
        },
        variant: { images: [] },
        _addedAt: Date.now(),
      })
    }
    saveCart(lineItems.value)
  }

  const updateLineItemQuantity = async (cartItemId: string, quantity: number) => {
    const item = lineItems.value.find((i) => i.id === cartItemId)
    if (item) {
      item.quantity = quantity
      saveCart(lineItems.value)
    }
  }

  const removeLineItem = async (cartItemId: string) => {
    lineItems.value = lineItems.value.filter((i) => i.id !== cartItemId)
    saveCart(lineItems.value)
  }

  const refreshCart = async () => {
    lineItems.value = loadCart()
  }

  // Hydrate from localStorage on client
  if (import.meta.client) {
    onMounted(() => {
      lineItems.value = loadCart()
    })
  }

  return {
    context,
    lineItems,
    totalPrice,
    addLineItem,
    updateLineItemQuantity,
    removeLineItem,
    refreshCart,
  }
}
