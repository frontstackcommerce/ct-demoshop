export default defineEventHandler(async (event) => {
  const { email, password, firstName, lastName } = await readBody<{
    email: string
    password: string
    firstName: string
    lastName: string
  }>(event)

  if (!email || !password || !firstName || !lastName) {
    throw createError({ statusCode: 400, statusMessage: 'All fields are required' })
  }

  try {
    const response = await getApiRoot()
      .customers()
      .post({
        body: {
          email,
          password,
          firstName,
          lastName,
          anonymousId: getAnonymousId(event),
        },
      })
      .execute()

    const customer = response.body.customer

    setCustomerSession(event, {
      customerId: customer.id,
      email: customer.email,
    })

    return mapCustomer(customer)
  } catch (error: any) {
    if (error.statusCode === 400 && error.message?.includes('duplicate')) {
      throw createError({ statusCode: 409, statusMessage: 'An account with this email already exists' })
    }
    throw error
  }
})
