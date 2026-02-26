export default defineEventHandler(async (event) => {
  const { sku, quantity = 1 } = await readBody<{ sku: string; quantity?: number }>(event)

  if (!sku) {
    throw createError({ statusCode: 400, statusMessage: 'Missing sku' })
  }

  const anonymousId = getAnonymousId(event)
  const api = getApiRoot()

  try {
    // Try to find existing active cart
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
      // Add to existing cart
      cart = await updateCartWithRetry(results[0]!.id, results[0]!.version, [
        { action: 'addLineItem', sku, quantity },
      ])
    } else {
      // Create new cart with the line item
      const { body } = await api
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
      cart = body
    }

    return mapCart(cart)
  } catch (error: any) {
    throw createError({ statusCode: error.statusCode ?? 500, statusMessage: error.message })
  }
})
