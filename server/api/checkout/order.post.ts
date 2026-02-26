export default defineEventHandler(async (event) => {
  const anonymousId = getAnonymousId(event)
  const api = getApiRoot()

  try {
    const {
      body: { results },
    } = await api
      .carts()
      .get({
        queryArgs: {
          where: [`anonymousId="${anonymousId}"`, `cartState="Active"`],
          limit: 1,
        },
      })
      .execute()

    if (!results.length) {
      throw createError({ statusCode: 404, statusMessage: 'No active cart found' })
    }

    const cart = results[0]!

    // Create order from cart
    const { body: order } = await api
      .orders()
      .post({
        body: {
          cart: {
            typeId: 'cart',
            id: cart.id,
          },
          version: cart.version,
        },
      })
      .execute()

    return {
      id: order.id,
      orderNumber: order.orderNumber,
      totalPrice: {
        centAmount: order.totalPrice.centAmount,
        currencyCode: order.totalPrice.currencyCode,
        fractionDigits: order.totalPrice.fractionDigits,
      },
      customerEmail: order.customerEmail,
      createdAt: order.createdAt,
    } as OrderConfirmation
  } catch (error: any) {
    if (error.statusCode) throw error
    throw createError({ statusCode: 500, statusMessage: error.message })
  }
})
