// TODO: Replace with Frontic cart composable
export function useCart() {
  const lineItems = ref<LineItem[]>([])
  const totalPrice = ref({
    centAmount: 0,
    currencyCode: 'EUR',
    fractionDigits: 2,
  })

  const context = ref({ locale: 'en' })

  const addLineItem = async (_variantKey: string, _quantity: number) => {
    // stub
  }

  const updateLineItemQuantity = async (_cartItemId: string, _quantity: number) => {
    // stub
  }

  const removeLineItem = async (_cartItemId: string) => {
    // stub
  }

  const refreshCart = async () => {
    // stub
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
