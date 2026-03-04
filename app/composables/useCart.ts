import type { LineItem, Cart, CentPrecisionMoney, TaxedPrice } from '@commercetools/platform-sdk'

export interface UseCartReturn {
  lineItems: Ref<LineItem[]>
  totalPrice: Ref<CentPrecisionMoney | undefined>
  taxedPrice: Ref<TaxedPrice | undefined>
  addLineItem: (sku: string, quantity?: number) => Promise<void>
  removeLineItem: (lineItemId: string, quantity?: number) => Promise<void>
  updateLineItemQuantity: (lineItemId: string, quantity: number) => Promise<void>
  refreshCart: () => Promise<void>
}

export function useCart(): UseCartReturn {
  const { anonymousCartId, cartId } = useAuth()

  const lineItems = useState<LineItem[]>('cart:lineItems', () => [])
  const totalPrice = useState<CentPrecisionMoney | undefined>('cart:totalPrice', () => undefined)
  const taxedPrice = useState<TaxedPrice | undefined>('cart:taxedPrice', () => undefined)

  const updateCartState = (cart: Cart) => {
    lineItems.value = cart.lineItems || []
    totalPrice.value = cart.totalPrice
    cartId.value = cart.id
    taxedPrice.value = cart.taxedPrice
  }

  const resetCartState = () => {
    lineItems.value = []
    totalPrice.value = undefined
    taxedPrice.value = undefined
    cartId.value = null
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

  const removeLineItem = async (lineItemId: string, _quantity?: number) => {
    if (!cartId.value) {
      return
    }

    try {
      const cart = await $fetch<Cart>(`/api/cart/${cartId.value}/line-items/${lineItemId}`, {
        method: 'DELETE',
      })

      updateCartState(cart)
    } catch (error) {
      console.error('Failed to remove line item:', error)
      throw error
    }
  }

  const updateLineItemQuantity = async (lineItemId: string, quantity: number) => {
    if (!cartId.value) {
      return
    }

    if (quantity <= 0) {
      await removeLineItem(lineItemId)
      return
    }

    try {
      const currentLineItem = lineItems.value.find((item) => item.id === lineItemId)
      if (!currentLineItem) {
        throw new Error(`Line item with ID ${lineItemId} not found`)
      }

      const currentQuantity = currentLineItem.quantity

      if (quantity === currentQuantity) {
        return
      }

      if (quantity > currentQuantity) {
        const difference = quantity - currentQuantity
        await addLineItem(currentLineItem.variant.sku || '', difference)
      } else {
        const difference = currentQuantity - quantity
        await removeLineItem(lineItemId, difference)
      }
    } catch (error) {
      console.error('Failed to update line item quantity:', error)
      throw error
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
