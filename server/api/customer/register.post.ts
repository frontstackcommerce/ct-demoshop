export default defineEventHandler(async (event) => {
  const body = await readBody<{
    email: string
    password: string
    firstName: string
    lastName: string
  }>(event)

  const email = validateEmail(body?.email)
  const password = validateString(body?.password, 'password')
  const firstName = validateString(body?.firstName, 'firstName', 100)
  const lastName = validateString(body?.lastName, 'lastName', 100)

  // Rate limit by IP
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  checkRateLimit(`register:${ip}`)

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
      throw createError({
        statusCode: 409,
        statusMessage: 'An account with this email already exists',
      })
    }
    safeError(error, 'Registration failed')
  }
})
