import { getCartById, removeLineItemFromCart } from '../../../../utils/cart'

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

    return await removeLineItemFromCart(cart.id, cart.version, lineItemId)
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    if (error.statusCode === 404 || error.message?.includes('not found')) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Cart not found',
        message: `Cart with ID ${cartId} not found`,
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: error.message || 'Failed to remove line item from cart',
    })
  }
})
