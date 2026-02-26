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
    const { body } = await api
      .shippingMethods()
      .matchingCart()
      .get({
        queryArgs: { cartId: cart.id },
      })
      .execute()

    return body.results.map(
      (method): ShippingMethodOption => ({
        id: method.id,
        name: method.localizedName?.en ?? method.name ?? method.key ?? method.id,
        price: method.zoneRates?.[0]?.shippingRates?.[0]?.price
          ? {
              centAmount: method.zoneRates[0].shippingRates[0].price.centAmount,
              currencyCode: method.zoneRates[0].shippingRates[0].price.currencyCode,
              fractionDigits: method.zoneRates[0].shippingRates[0].price.fractionDigits,
            }
          : { centAmount: 0, currencyCode: 'EUR', fractionDigits: 2 },
      }),
    )
  } catch (error) {
    safeError(error, 'Failed to fetch shipping methods')
  }
})
