export default defineEventHandler(async (event) => {
  const body = await readBody<{ shippingAddress: unknown; billingAddress: unknown }>(event)
  const shippingAddress = validateAddress(body?.shippingAddress)
  const billingAddress = body?.billingAddress
    ? validateAddress(body.billingAddress)
    : shippingAddress

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
      { action: 'setShippingAddress', address: shippingAddress },
      { action: 'setBillingAddress', address: billingAddress },
    ])

    return mapCart(updated)
  } catch (error) {
    safeError(error, 'Failed to set addresses')
  }
})
