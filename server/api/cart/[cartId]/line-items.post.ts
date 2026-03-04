import { getCartById, addLineItemToCart } from '../../../utils/cart'

export default defineEventHandler(async (event) => {
  const { cartId } = getRouterParams(event)

  try {
    const body = (await readBody(event)) || {}
    const { sku, quantity = 1 } = body

    if (!sku) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Missing required field: sku',
      })
    }

    const cart = await getCartById(cartId!)

    return await addLineItemToCart(cart.id, cart.version, sku, quantity)
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
      message: error.message || 'Failed to add line item to cart',
    })
  }
})
