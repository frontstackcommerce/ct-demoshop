export default defineEventHandler(async (event) => {
  const body = await readBody<{ shippingMethodId: string }>(event)
  const shippingMethodId = validateString(body?.shippingMethodId, 'shippingMethodId', 100)

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
      {
        action: 'setShippingMethod',
        shippingMethod: { typeId: 'shipping-method', id: shippingMethodId },
      },
    ])

    return mapCart(updated)
  } catch (error) {
    safeError(error, 'Failed to set shipping method')
  }
})
