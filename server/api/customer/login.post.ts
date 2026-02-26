export default defineEventHandler(async (event) => {
  const body = await readBody<{ email: string; password: string }>(event)
  const email = validateEmail(body?.email)
  const password = validateString(body?.password, 'password')

  // Rate limit by IP
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  checkRateLimit(`login:${ip}`)

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
    safeError(error, 'Login failed')
  }
})
