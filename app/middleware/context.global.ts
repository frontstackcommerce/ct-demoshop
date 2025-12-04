const contextByPath = {
  DE: {
    path: '/de',
    region: 'eu',
    locale: 'de-DE',
    snippet: 'de',
  },
  UK: {
    path: '/uk',
    region: 'uk',
    locale: 'en-GB',
    snippet: 'uk',
  },
  EU: {
    path: '/',
    region: 'eu',
    locale: 'en-GB',
    snippet: 'eu',
  },
  US: {
    path: '/us',
    region: 'us',
    locale: 'en-us',
    snippet: 'us',
  },
}

export default defineNuxtRouteMiddleware(async () => {
  const { newContext, token, context, updateContext } = useContext()
  const requestUrl = useRequestURL()
  const path = requestUrl.pathname

  let checkContext = null
  if (path.startsWith(contextByPath.DE.path)) {
    checkContext = contextByPath.DE
  } else if (path.startsWith(contextByPath.UK.path)) {
    checkContext = contextByPath.UK
  } else if (path.startsWith(contextByPath.US.path)) {
    checkContext = contextByPath.US
  } else {
    checkContext = contextByPath.EU
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
