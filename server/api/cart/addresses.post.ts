export default defineEventHandler(async (event) => {
  const { shippingAddress, billingAddress } = await readBody<{
    shippingAddress: AddressData
    billingAddress: AddressData
  }>(event)

  if (!shippingAddress) {
    throw createError({ statusCode: 400, statusMessage: 'Missing shippingAddress' })
  }

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
    const actions: Array<Record<string, unknown>> = [
      {
        action: 'setShippingAddress',
        address: {
          firstName: shippingAddress.firstName,
          lastName: shippingAddress.lastName,
          streetName: shippingAddress.streetName,
          streetNumber: shippingAddress.streetNumber,
          postalCode: shippingAddress.postalCode,
          city: shippingAddress.city,
          country: shippingAddress.country,
          phone: shippingAddress.phone,
        },
      },
      {
        action: 'setBillingAddress',
        address: {
          firstName: (billingAddress ?? shippingAddress).firstName,
          lastName: (billingAddress ?? shippingAddress).lastName,
          streetName: (billingAddress ?? shippingAddress).streetName,
          streetNumber: (billingAddress ?? shippingAddress).streetNumber,
          postalCode: (billingAddress ?? shippingAddress).postalCode,
          city: (billingAddress ?? shippingAddress).city,
          country: (billingAddress ?? shippingAddress).country,
          phone: (billingAddress ?? shippingAddress).phone,
        },
      },
    ]

    const updated = await updateCartWithRetry(cart.id, cart.version, actions)
    return mapCart(updated)
  } catch (error: any) {
    if (error.statusCode) throw error
    throw createError({ statusCode: 500, statusMessage: error.message })
  }
})
