import type { CartDraft, CartUpdateAction, Cart } from '@commercetools/platform-sdk'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'

const getAnonymousCart = async (cartId: string) => {
  const { commercetools } = useRuntimeConfig()
  const ctApi = getCommercetoolsClient()
  const httpApiRoot = createApiBuilderFromCtpClient(ctApi).withProjectKey({
    projectKey: commercetools.projectKey,
  })

  const response = await httpApiRoot
    .carts()
    .get({
      queryArgs: {
        limit: 1,
        withTotal: false,
        sort: 'lastModifiedAt desc',
        where: [`anonymousId="${cartId}"`, `cartState="Active"`],
      },
    })
    .execute()

  return response.body
}

const getCustomerCart = async (cartId: string) => {
  const { commercetools } = useRuntimeConfig()
  const ctApi = getCommercetoolsClient()
  const httpApiRoot = createApiBuilderFromCtpClient(ctApi).withProjectKey({
    projectKey: commercetools.projectKey,
  })

  const response = await httpApiRoot
    .carts()
    .get({
      queryArgs: {
        limit: 1,
        withTotal: false,
        sort: 'lastModifiedAt desc',
        where: [`customerId="${cartId}"`, `cartState="Active"`],
      },
    })
    .execute()

  return response.body
}

const getCartById = async (cartId: string): Promise<Cart> => {
  const { commercetools } = useRuntimeConfig()
  const ctApi = getCommercetoolsClient()
  const httpApiRoot = createApiBuilderFromCtpClient(ctApi).withProjectKey({
    projectKey: commercetools.projectKey,
  })

  const response = await httpApiRoot.carts().withId({ ID: cartId }).get().execute()

  return response.body
}

const createAnonymousCart = async (anonymousId: string, sku: string, quantity: number = 1) => {
  const cart = await getAnonymousCart(anonymousId)
  if (cart.count > 0) {
    const existingCart = cart.results[0]
    return await addLineItemToCart(existingCart!.id, existingCart!.version, sku, quantity)
  }

  const { commercetools } = useRuntimeConfig()
  const ctApi = getCommercetoolsClient()
  const httpApiRoot = createApiBuilderFromCtpClient(ctApi).withProjectKey({
    projectKey: commercetools.projectKey,
  })

  const cartDraft: CartDraft = {
    anonymousId,
    currency: 'USD',
    country: 'US',
    lineItems: [
      {
        sku,
        quantity,
      },
    ],
  }

  const response = await httpApiRoot
    .carts()
    .post({
      body: cartDraft,
    })
    .execute()

  return response.body
}

const addLineItemToCart = async (
  cartId: string,
  version: number,
  sku: string,
  quantity: number = 1,
): Promise<Cart> => {
  const { commercetools } = useRuntimeConfig()
  const ctApi = getCommercetoolsClient()
  const httpApiRoot = createApiBuilderFromCtpClient(ctApi).withProjectKey({
    projectKey: commercetools.projectKey,
  })

  const addLineItemAction: CartUpdateAction = {
    action: 'addLineItem',
    sku,
    quantity,
  }

  const response = await httpApiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: [addLineItemAction],
      },
    })
    .execute()

  return response.body
}

const removeLineItemFromCart = async (
  cartId: string,
  version: number,
  lineItemId: string,
  quantity?: number,
): Promise<Cart> => {
  const { commercetools } = useRuntimeConfig()
  const ctApi = getCommercetoolsClient()
  const httpApiRoot = createApiBuilderFromCtpClient(ctApi).withProjectKey({
    projectKey: commercetools.projectKey,
  })

  const removeLineItemAction: CartUpdateAction = {
    action: 'removeLineItem',
    lineItemId,
    ...(quantity !== undefined && { quantity }),
  }

  const response = await httpApiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: [removeLineItemAction],
      },
    })
    .execute()

  return response.body
}

const addLineItemToAnonymousCart = async (
  anonymousId: string,
  sku: string,
  quantity: number = 1,
): Promise<Cart> => {
  const cartResponse = await getAnonymousCart(anonymousId)

  if (cartResponse.count === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Cart not found',
      message: `No active cart found for anonymousId: ${anonymousId}`,
    })
  }

  const cart = cartResponse.results[0]!
  return await addLineItemToCart(cart.id, cart.version, sku, quantity)
}

const removeLineItemFromAnonymousCart = async (
  anonymousId: string,
  lineItemId: string,
  quantity?: number,
): Promise<Cart> => {
  const cartResponse = await getAnonymousCart(anonymousId)

  if (cartResponse.count === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Cart not found',
      message: `No active cart found for anonymousId: ${anonymousId}`,
    })
  }

  const cart = cartResponse.results[0]!
  return await removeLineItemFromCart(cart.id, cart.version, lineItemId, quantity)
}

const addLineItemToCustomerCart = async (
  customerId: string,
  sku: string,
  quantity: number = 1,
): Promise<Cart> => {
  const cartResponse = await getCustomerCart(customerId)

  if (cartResponse.count === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Cart not found',
      message: `No active cart found for customerId: ${customerId}`,
    })
  }

  const cart = cartResponse.results[0]!
  return await addLineItemToCart(cart.id, cart.version, sku, quantity)
}

const removeLineItemFromCustomerCart = async (
  customerId: string,
  lineItemId: string,
  quantity?: number,
): Promise<Cart> => {
  const cartResponse = await getCustomerCart(customerId)

  if (cartResponse.count === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Cart not found',
      message: `No active cart found for customerId: ${customerId}`,
    })
  }

  const cart = cartResponse.results[0]!
  return await removeLineItemFromCart(cart.id, cart.version, lineItemId, quantity)
}

export {
  getAnonymousCart,
  getCustomerCart,
  getCartById,
  createAnonymousCart,
  addLineItemToCart,
  removeLineItemFromCart,
  addLineItemToAnonymousCart,
  removeLineItemFromAnonymousCart,
  addLineItemToCustomerCart,
  removeLineItemFromCustomerCart,
}
