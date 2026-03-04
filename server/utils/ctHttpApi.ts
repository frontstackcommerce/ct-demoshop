import { ClientBuilder } from '@commercetools/ts-client'
import type { AuthMiddlewareOptions, HttpMiddlewareOptions } from '@commercetools/ts-client'

export function getCommercetoolsClient() {
  const { commercetools } = useRuntimeConfig()
  const { projectKey, clientId, clientSecret, apiHost, authHost } = commercetools

  if (!projectKey || !clientId || !clientSecret) {
    throw new Error(
      'Missing required commercetools configuration: projectKey, clientId, and clientSecret are required',
    )
  }

  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: authHost || 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey,
    credentials: { clientId, clientSecret },
    scopes: commercetools.scopes ? commercetools.scopes.split(' ') : [],
    httpClient: fetch,
  }

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: apiHost || 'https://api.europe-west1.gcp.commercetools.com',
    httpClient: fetch,
  }

  const ctApi = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build()

  return ctApi
}
