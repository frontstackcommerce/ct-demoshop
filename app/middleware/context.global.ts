export default defineNuxtRouteMiddleware(async () => {
  const { newContext, token, context, updateContext, shops } = useContext()
  const requestUrl = useRequestURL()
  const path = requestUrl.pathname

  let checkContext: Shop | null = null
  if (path.startsWith(shops.value.DE.path)) {
    checkContext = shops.value.DE
  } else if (path.startsWith(shops.value.UK.path)) {
    checkContext = shops.value.UK
  } else if (path.startsWith(shops.value.US.path)) {
    checkContext = shops.value.US
  } else {
    checkContext = shops.value.EU
  }

  // If no token exists, create one with the current domain
  if (!token.value) {
    await newContext(checkContext)
    return
  }

  if (
    checkContext &&
    (checkContext.region !== context?.value?.region ||
      checkContext.locale !== context?.value?.locale)
  ) {
    await updateContext(checkContext)
    return
  }
})
