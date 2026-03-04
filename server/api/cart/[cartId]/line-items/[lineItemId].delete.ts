export default defineEventHandler(async (event) => {
  const { cartId, lineItemId } = getRouterParams(event)

  try {
    if (!lineItemId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Missing required field: lineItemId',
      })
    }

    const cart = await getCartById(cartId!)
    return await removeLineItemFromCart(cart.id, cart.version, lineItemId!)
  } catch (error: any) {
    if (error.statusCode) throw error
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: error.message || 'Failed to remove line item from cart',
    })
  }
})
