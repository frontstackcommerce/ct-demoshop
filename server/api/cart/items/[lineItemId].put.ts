export default defineEventHandler(async (event) => {
  const lineItemId = getRouterParam(event, 'lineItemId')
  if (!lineItemId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing lineItemId' })
  }

  const body = await readBody<{ quantity: number }>(event)
  const quantity = validateQuantity(body?.quantity)

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
    const updated = await updateCartWithRetry(cart.id, cart.version, [
      { action: 'changeLineItemQuantity', lineItemId, quantity },
    ])

    return mapCart(updated)
  } catch (error) {
    safeError(error, 'Failed to update item quantity')
  }
})
