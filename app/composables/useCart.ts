import type {
  LineItem,
  Cart,
  CentPrecisionMoney,
  TaxedPrice,
} from '@commercetools/platform-sdk'

export function useCart() {
  const { anonymousCartId, cartId } = useAuth()

  const lineItems = useState<LineItem[]>('cart:lineItems', () => [])
  const totalPrice = useState<CentPrecisionMoney | undefined>('cart:totalPrice', () => undefined)
  const taxedPrice = useState<TaxedPrice | undefined>('cart:taxedPrice', () => undefined)
  const cartCount = useState<number>('cart:count', () => 0)

  const updateCartState = (cart: Cart) => {
    lineItems.value = cart.lineItems || []
    totalPrice.value = cart.totalPrice
    cartId.value = cart.id
    taxedPrice.value = cart.taxedPrice
    cartCount.value = cart.lineItems?.length ?? 0
  }

  const resetCartState = () => {
    lineItems.value = []
    totalPrice.value = undefined
    taxedPrice.value = undefined
    cartId.value = null
    cartCount.value = 0
  }

  const refreshCart = async () => {
    if (!cartId.value) {
      resetCartState()
      return
    }

    try {
      const cart = await $fetch<Cart>(`/api/cart/${cartId.value}`)
      updateCartState(cart)
    } catch (error: any) {
      if (error.statusCode === 404) {
        resetCartState()
      } else {
        throw error
      }
    }
  }

  const addLineItem = async (sku: string, quantity: number = 1) => {
    try {
      let cart: Cart

      if (cartId.value) {
        cart = await $fetch<Cart>(`/api/cart/${cartId.value}/line-items`, {
          method: 'POST',
          body: { sku, quantity },
        })
      } else {
        cart = await $fetch<Cart>('/api/cart', {
          method: 'POST',
          body: {
            anonymousId: anonymousCartId.value,
            sku,
            quantity,
          },
        })
      }

      updateCartState(cart)
    } catch (error) {
      console.error('Failed to add line item:', error)
      throw error
    }
  }

  const removeLineItem = async (lineItemId: string) => {
    if (!cartId.value) return

    try {
      const cart = await $fetch<Cart>(
        `/api/cart/${cartId.value}/line-items/${lineItemId}`,
        { method: 'DELETE' },
      )
      updateCartState(cart)
    } catch (error) {
      console.error('Failed to remove line item:', error)
      throw error
    }
  }

  const updateLineItemQuantity = async (lineItemId: string, quantity: number) => {
    if (!cartId.value) return

    if (quantity <= 0) {
      await removeLineItem(lineItemId)
      return
    }

    const currentLineItem = lineItems.value.find((item) => item.id === lineItemId)
    if (!currentLineItem) return

    const currentQuantity = currentLineItem.quantity
    if (quantity === currentQuantity) return

    if (quantity > currentQuantity) {
      const difference = quantity - currentQuantity
      await addLineItem(currentLineItem.variant.sku || '', difference)
    } else {
      const _difference = currentQuantity - quantity
      await removeLineItem(lineItemId)
    }
  }

  return {
    lineItems,
    totalPrice,
    taxedPrice,
    addLineItem,
    removeLineItem,
    updateLineItemQuantity,
    refreshCart,
  }
}
