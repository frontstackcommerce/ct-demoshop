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
      return { id: '', version: 0, lineItems: [], totalPrice: { centAmount: 0, currencyCode: 'EUR', fractionDigits: 2 } } as CartData
    }

    return mapCart(results[0]!)
  } catch (error: any) {
    throw createError({ statusCode: error.statusCode ?? 500, statusMessage: error.message })
  }
})
