export default defineEventHandler(async (event) => {
  const body = await readBody<{ sku: string; quantity?: number }>(event)
  const sku = validateString(body?.sku, 'sku', 100)
  const quantity = validateQuantity(body?.quantity ?? 1)

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

    let cart

    if (results.length) {
      cart = await updateCartWithRetry(results[0]!.id, results[0]!.version, [
        { action: 'addLineItem', sku, quantity },
      ])
    } else {
      const { body: newCart } = await api
        .carts()
        .post({
          body: {
            currency: 'EUR',
            country: 'DE',
            anonymousId,
            lineItems: [{ sku, quantity }],
          },
        })
        .execute()
      cart = newCart
    }

    return mapCart(cart)
  } catch (error) {
    safeError(error, 'Failed to add item to cart')
  }
})
