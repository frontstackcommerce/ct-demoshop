export default defineEventHandler(async (event) => {
  const session = getCustomerSession(event)

  if (!session) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  try {
    const response = await getApiRoot()
      .customers()
      .withId({ ID: session.customerId })
      .get()
      .execute()

    return mapCustomer(response.body)
  } catch (error: any) {
    if (error.statusCode === 404) {
      setCustomerSession(event, null)
      throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
    }
    safeError(error, 'Failed to fetch profile')
  }
})
