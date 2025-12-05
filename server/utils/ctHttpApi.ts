import { ClientBuilder } from '@commercetools/ts-client';
import type { AuthMiddlewareOptions, HttpMiddlewareOptions } from '@commercetools/ts-client';

// Create a function to get the commercetools client
// This ensures useRuntimeConfig() is called within Nuxt context
export function getCommercetoolsClient() {
  const { commercetools } = useRuntimeConfig();

  const { projectKey, clientId, clientSecret, apiHost, authHost } = commercetools;

  if (!projectKey || !clientId || !clientSecret) {
    throw new Error('Missing required commercetools configuration: projectKey, clientId, and clientSecret are required');
  }

  // Configure authentication middleware
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: authHost || 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey,
    credentials: {
      clientId,
      clientSecret,
    },
    scopes: commercetools.scopes ? commercetools.scopes.split(' ') : [],
    httpClient: fetch
  };

  // Configure HTTP middleware
  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: apiHost || 'https://api.europe-west1.gcp.commercetools.com',
    httpClient: fetch
  };

  // Build the commercetools client
  const ctApi = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return ctApi;
}
