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

    // Create mock payment
    const { body: payment } = await api
      .payments()
      .post({
        body: {
          amountPlanned: {
            centAmount: cart.totalPrice.centAmount,
            currencyCode: cart.totalPrice.currencyCode,
          },
          paymentMethodInfo: {
            method: 'mock',
            name: { en: 'Mock Payment' },
          },
          transactions: [
            {
              type: 'Charge',
              amount: {
                centAmount: cart.totalPrice.centAmount,
                currencyCode: cart.totalPrice.currencyCode,
              },
              state: 'Success',
            },
          ],
        },
      })
      .execute()

    // Attach payment to cart
    await updateCartWithRetry(cart.id, cart.version, [
      {
        action: 'addPayment',
        payment: {
          typeId: 'payment',
          id: payment.id,
        },
      },
    ])

    return { ok: true }
  } catch (error: any) {
    if (error.statusCode) throw error
    throw createError({ statusCode: 500, statusMessage: error.message })
  }
})
