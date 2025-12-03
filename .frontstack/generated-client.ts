/**
 * This file was automatically generated using the
 * frontstack CLI, please do not edit it manually!
 */

import { ofetch } from 'ofetch'

import type { Endpoints, Responses, RequestOptions, Blocks, Listings, ListingParameters, ListingQueryFilters, ListingQuerySorts } from './generated-types'

import type { Query } from './query-types'

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE'

/**
 * Global configuration options for the frontstack client
 */
export interface ClientConfig {
  /**
   * @description Proxy URL
   *
   * Optionally, provide a proxy URL path that will be concatenated with the original API path.
   * For example, if proxyUrl is '/api' and the original request is to '/block',
   * the request will be sent to '/api/block'.
   * The original target URL is passed in the 'fs-target-url' header for the proxy to forward to.
   * This is useful to prevent CORS issues when making requests from a browser.
   * Can be overridden per-request via RequestOptions.
   */
  proxyUrl?: string
}

/**
 * Interface describing the frontstack client API
 */
export interface FrontstackClient {
  /**
   * Fetch a block with a key
   *
   * @param name The name of the block to fetch
   * @example 'VariantCard'
   * @param key The key identifier for the block
   * @example '<variant-id>'
   * @param config Further configuration options
   */
  block: <ApiName extends keyof Blocks>(
    name: ApiName,
    key: string,
    config?: RequestOptions
  ) => Promise<Responses[ApiName]>;

  /**
   * Fetch a listing with optional parameters and query options
   *
   * @param name The name of the listing to fetch
   * @example 'ProductList'
   * @param parameters The parameters to pass to the listing
   * @example { categoryId: '<category-id>' }
   * @param config Further configuration options
   * @example {
   *  query: {
   *    filter: [{ type: 'equals', field: 'color', value: 'Red' }],
   *    sort: [{
   *      'field': 'publishedAt',
   *      'order': 'asc'
   *    }]
   *  }
   * }
   */
  listing: <ApiName extends keyof Listings>(
    name: ApiName,
    parameters: ListingParameters[ApiName],
    config?: {
      /**
       * Query parameters to pass to the listing:
       * - `filter` accepts an array of filter objects to filter results
       * - `sort` accepts a string, a sorting option object, or an array of sorting option objects to sort results
       * - `search` to perform a text search
       * - `limit` to limit the number of results returned
       * - `page` to paginate results
       */
      query?: Query<ListingQueryFilters[ApiName], ListingQuerySorts[ApiName]>
    } & RequestOptions
  ) => Promise<Responses[ApiName]>;

  /**
   * Fetch a page by its slug
   * @param slug The URL slug of the page (without protocol)
   * @example demo-shop.com/uk/women/shoes/running
   *
   * @returns The page data
   * @example { data: { title: 'Running Shoes' }, type: 'ProductCategory', urls: [] }
   */
  page: (
    slug: string,
    config?: RequestOptions
  ) => Promise<Page>;

  /**
   * Fetch a context by its token
   * @param token The token of the context
   * @example 'ae0d4981-c363-4d5a-a49e-1f053d49f2f7'
   * @param config Further configuration options
   *
   * @returns The context and token
   */
  context: (
    token: ContextToken,
    config?: RequestOptions
  ) => Promise<Context>;

  /**
   * Fetch a list of contexts
   * @param token The token of the context to fetch
   * @example 'ae0d4981-c363-4d5a-a49e-1f053d49f2f7'
   * @param config Further configuration options
   *
   * @returns The list of contexts and the token
   */
  contextList: (
    token?: ContextToken,
    config?: RequestOptions
  ) => Promise<[ContextOption[], ContextToken]>;

  /**
   * Update a context
   * @param context The context to update
   * @example { region: 'uk', locale: 'en-GB' }
   * @param token The token of the context to update
   * @example 'ae0d4981-c363-4d5a-a49e-1f053d49f2f7'
   * @param config Further configuration options
   *
   * @returns The updated context
   */
  contextUpdate: (
    context: {
      region: string
      locale: string
    },
    token: ContextToken,
    config?: RequestOptions
  ) => Promise<Context>;
}

const endpoints: Endpoints = {
  BrandFull: '/block/brand/full/{key}',
  BrandProducts: '/listing/brand/products',
  CategoryChilds: '/listing/category/childs',
  CategoryFull: '/block/category/full/{key}',
  CategoryItem: '/block/category/item/{key}',
  CategoryProducts: '/listing/category/products',
  ProductCard: '/block/product/card/{key}',
  ProductFull: '/block/product/full/{key}',
  ProductReview: '/block/product/review/{key}',
  ProductReviews: '/listing/product/reviews',
  ProductVariant: '/block/product/variant/{key}',
}

const invoke = async (path: string, method: Method, payload: any, headers: any, proxyUrl?: string) => {
  const _headers: any = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'fs-version': 'ecf0818b-fe5f-4a3b-a298-85b5db522625',
  }

  // Merge headers
  headers = { ..._headers, ...headers }

  let options: any = {
    method,
    headers,
    body: payload
  }

  // If proxy URL is provided, concatenate it with the original path
  if (proxyUrl) {
    // Parse the original full URL to extract just the pathname
    const url = new URL(path)
    const originalPath = url.pathname

    // Store the original full URL in header for the proxy to use
    headers['fs-target-url'] = path

    // Concatenate proxy URL with the original path
    // Remove trailing slash from proxyUrl and leading slash is already in originalPath
    const normalizedProxyUrl = proxyUrl.endsWith('/') ? proxyUrl.slice(0, -1) : proxyUrl
    path = normalizedProxyUrl + originalPath
  }

  return await ofetch.raw(path, options)
}

/* Listing servers, even though only the first one is ever used */
const servers = [
  { description: 'Public frontstack Environment', url: 'https://fetch-443af131d3bc780f8435f7a42a76d5.frontstack.dev' },
]

/**
 * Create a frontstack client with optional global configuration
 *
 * @param config Global configuration options for the client
 * @example
 * const client = createClient({ proxyUrl: '/api/frontstack' })
 *
 * @returns A configured frontstack client instance
 */
const createClient = (config?: ClientConfig): FrontstackClient => {
  const globalConfig = config || {}

  return {
    /**
     * Fetch a block with a key
     */
    block: async (name, key, config) => {
      if(!(name in endpoints)) {
        throw new Error(`Block ${name} not found`)
      }
      let endpoint: string = `${servers[0].url}${endpoints[name]}`;

      // Replace '{key}' in the endpoint
      endpoint = endpoint.replace('{key}', key);

      // No additional parameters needed for blocks
      let payload = { param: {} };

      let headers: Record<string, string> = {}

      if(config?.requestUrl !== undefined) {
        headers['fs-request-url'] = config.requestUrl
      }
      if (config?.contextKey !== undefined) {
        headers["fs-context"] = config.contextKey;
      }

      // Use per-request proxyUrl if provided, otherwise use global config
      const proxyUrl = config?.proxyUrl ?? globalConfig.proxyUrl

      return (await invoke(endpoint, 'POST', payload, headers, proxyUrl))._data
    },

    /**
     * Fetch a listing with parameters and optional query options
     */
    listing: async (name, parameters, config) => {
      if(!(name in endpoints)) {
        throw new Error(`Listing ${name} not found`)
      }

      let endpoint: string = `${servers[0].url}${endpoints[name]}`;

      // Merge listing parameters with query
      let payload = config && 'query' in config ? { param: {...parameters}, ...config.query } : { param: {...parameters} }

      let headers: Record<string, string> = {}

      if(config?.requestUrl !== undefined) {
        headers['fs-request-url'] = config.requestUrl
      }
      if (config?.contextKey !== undefined) {
        headers["fs-context"] = config.contextKey;
      }

      // Use per-request proxyUrl if provided, otherwise use global config
      const proxyUrl = config?.proxyUrl ?? globalConfig.proxyUrl

      return (await invoke(endpoint, 'POST', payload, headers, proxyUrl))._data
    },

    /**
     * Fetch a page by its slug
     */
    page: async (slug, config) => {
      let endpoint: string = `${servers[0].url}/page/${slug}`;

      let headers: Record<string, string> = {}

      if(config?.requestUrl !== undefined) {
        headers['fs-request-url'] = config.requestUrl
      }
      if (config?.contextKey !== undefined) {
        headers["fs-context"] = config.contextKey;
      }

      // Use per-request proxyUrl if provided, otherwise use global config
      const proxyUrl = config?.proxyUrl ?? globalConfig.proxyUrl

      return (await invoke(endpoint, 'GET', null, headers, proxyUrl))._data
    },

    /**
     * Fetch a context by its token
     */
    context: async (token, config) => {
      let endpoint: string = `${servers[0].url}/context/token`;

      let headers: Record<string, string> = {
        'fs-context': token
      }

      // Use per-request proxyUrl if provided, otherwise use global config
      const proxyUrl = config?.proxyUrl ?? globalConfig.proxyUrl

      return (await invoke(endpoint, 'GET', null, headers, proxyUrl))._data
    },

    /**
     * Fetch a list of contexts
     */
    contextList: async (token, config) => {
      let endpoint: string = `${servers[0].url}/context`;

      const requestHeaders: Record<string, string> = {}

      if (token) {
        requestHeaders["fs-context"] = token;
      }

      // Use per-request proxyUrl if provided, otherwise use global config
      const proxyUrl = config?.proxyUrl ?? globalConfig.proxyUrl

      const {
        _data,
        headers: responseHeaders
      } = await invoke(endpoint, 'GET', null, requestHeaders, proxyUrl)

      return [_data, responseHeaders.get('fs-context')!]
    },

    /**
     * Update a context
     */
    contextUpdate: async (context, token, config) => {
      let endpoint: string = `${servers[0].url}/context`;

      let headers: Record<string, string> = {
        'fs-context': token
      }

      // Use per-request proxyUrl if provided, otherwise use global config
      const proxyUrl = config?.proxyUrl ?? globalConfig.proxyUrl

      return (await invoke(endpoint, 'PATCH', context, headers, proxyUrl))._data
    }
  }
}

/**
 * Default client instance (without global configuration)
 * For global configuration (e.g. proxy URL), use createClient() instead
 */
const client = createClient()

export default client
export { createClient, client }
