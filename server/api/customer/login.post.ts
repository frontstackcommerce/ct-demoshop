export default defineEventHandler(async (event) => {
  const { email, password } = await readBody<{ email: string; password: string }>(event)

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password are required' })
  }

  try {
    const response = await getApiRoot()
      .login()
      .post({
        body: {
          email,
          password,
          anonymousId: getAnonymousId(event),
          anonymousCartSignInMode: 'MergeWithExistingCustomerCart',
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
    if (error.statusCode === 400 || error.statusCode === 401) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
    }
    throw error
  }
})
