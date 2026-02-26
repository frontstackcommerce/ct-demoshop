export function useCart() {
  const cart = useState<CartData | null>('cart-data', () => null)
  const loading = useState('cart-loading', () => false)

  const lineItems = computed(() => cart.value?.lineItems ?? [])

  const totalPrice = computed(() => {
    if (cart.value?.totalPrice) return cart.value.totalPrice
    return { centAmount: 0, currencyCode: 'EUR', fractionDigits: 2 }
  })

  const context = ref({ locale: 'en' })

  const refreshCart = async () => {
    try {
      const data = await $fetch<CartData>('/api/cart')
      cart.value = data.id ? data : null
    } catch {
      cart.value = null
    }
  }

  const addLineItem = async (sku: string, quantity: number = 1) => {
    loading.value = true
    try {
      cart.value = await $fetch<CartData>('/api/cart/items', {
        method: 'POST',
        body: { sku, quantity },
      })
    } finally {
      loading.value = false
    }
  }

  const updateLineItemQuantity = async (lineItemId: string, quantity: number) => {
    loading.value = true
    try {
      cart.value = await $fetch<CartData>(`/api/cart/items/${lineItemId}`, {
        method: 'PUT',
        body: { quantity },
      })
    } finally {
      loading.value = false
    }
  }

  const removeLineItem = async (lineItemId: string) => {
    loading.value = true
    try {
      cart.value = await $fetch<CartData>(`/api/cart/items/${lineItemId}`, {
        method: 'DELETE',
      })
    } finally {
      loading.value = false
    }
  }

  // Hydrate cart on client
  if (import.meta.client) {
    onMounted(() => {
      if (!cart.value) refreshCart()
    })
  }

  return {
    cart,
    context,
    lineItems,
    totalPrice,
    loading,
    addLineItem,
    updateLineItemQuantity,
    removeLineItem,
    refreshCart,
  }
}
