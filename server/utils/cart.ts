import type { CartDraft, CartUpdateAction, Cart } from "@commercetools/platform-sdk";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";

/**
 * Gets an anonymous cart by its anonymous id
 */
const getAnonymousCart = async (cartId: string) => {
  const { commercetools } = useRuntimeConfig();
  const ctApi = getCommercetoolsClient();
  const httpApiRoot = createApiBuilderFromCtpClient(ctApi).withProjectKey({ projectKey: commercetools.projectKey });

  const response = await httpApiRoot.carts()
    .get({
      queryArgs: {
        limit: 1,
        withTotal: false,
        sort: "lastModifiedAt desc",
        where: [`anonymousId="${cartId}"`, `cartState="Active"`],
      },
    }).execute();

  return response.body;
};

/**
 * Gets a customer cart by its id
 */
const getCustomerCart = async (cartId: string) => {
  const { commercetools } = useRuntimeConfig();
  const ctApi = getCommercetoolsClient();
  const httpApiRoot = createApiBuilderFromCtpClient(ctApi).withProjectKey({ projectKey: commercetools.projectKey });

  const response = await httpApiRoot.carts()
    .get({
      queryArgs: {
        limit: 1,
        withTotal: false,
        sort: "lastModifiedAt desc",
        where: [`customerId="${cartId}"`, `cartState="Active"`],
      },
    }).execute();

  return response.body;
};

/**
 * Gets a cart by its actual cart ID
 */
const getCartById = async (cartId: string): Promise<Cart> => {
  const { commercetools } = useRuntimeConfig();
  const ctApi = getCommercetoolsClient();
  const httpApiRoot = createApiBuilderFromCtpClient(ctApi).withProjectKey({ projectKey: commercetools.projectKey });

  const response = await httpApiRoot
    .carts()
    .withId({ ID: cartId })
    .get()
    .execute();

  return response.body;
};

/**
 * Creates an anonymous cart if it doesn't exist, adds an item to it and returns the cart
 */
const createAnonymousCart = async (
  anonymousId: string,
  sku: string,
  quantity: number = 1
) => {
  const cart = await getAnonymousCart(anonymousId);
  if(cart.count > 0) {
    // Add item to existing cart and return the cart
    const existingCart = cart.results[0];
    return await addLineItemToCart(existingCart.id, existingCart.version, sku, quantity);
  }

  const { commercetools } = useRuntimeConfig();
  const ctApi = getCommercetoolsClient();
  const httpApiRoot = createApiBuilderFromCtpClient(ctApi).withProjectKey({ projectKey: commercetools.projectKey });

  const cartDraft: CartDraft = {
    anonymousId,  
    currency: 'USD',
    country: 'US',
    lineItems: [{
      sku, 
      quantity,
    }]
  };

  const response = await httpApiRoot
    .carts()
    .post({
      body: cartDraft,
    })
    .execute();

  return response.body;
}

/**
 * Adds a line item to a cart by cart ID and version
 * @param cartId The actual cart ID from commercetools
 * @param version The current version of the cart for optimistic locking
 * @param sku The SKU of the product variant to add
 * @param quantity The number of items to add
 * @returns The updated cart
 */
const addLineItemToCart = async (
  cartId: string,
  version: number,
  sku: string,
  quantity: number = 1
): Promise<Cart> => {
  const { commercetools } = useRuntimeConfig();
  const ctApi = getCommercetoolsClient();
  const httpApiRoot = createApiBuilderFromCtpClient(ctApi).withProjectKey({ projectKey: commercetools.projectKey });

  const addLineItemAction: CartUpdateAction = {
    action: "addLineItem",
    sku,
    quantity,
  };

  const response = await httpApiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: [addLineItemAction],
      },
    })
    .execute();

  return response.body;
};

/**
 * Removes a line item from a cart by cart ID and version
 * @param cartId The actual cart ID from commercetools
 * @param version The current version of the cart for optimistic locking
 * @param lineItemId The ID of the line item to remove
 * @param quantity Optional quantity to remove. If omitted, removes the entire line item
 * @returns The updated cart
 */
const removeLineItemFromCart = async (
  cartId: string,
  version: number,
  lineItemId: string,
  quantity?: number
): Promise<Cart> => {
  const { commercetools } = useRuntimeConfig();
  const ctApi = getCommercetoolsClient();
  const httpApiRoot = createApiBuilderFromCtpClient(ctApi).withProjectKey({ projectKey: commercetools.projectKey });

  const removeLineItemAction: CartUpdateAction = {
    action: "removeLineItem",
    lineItemId,
    ...(quantity !== undefined && { quantity }),
  };

  const response = await httpApiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: [removeLineItemAction],
      },
    })
    .execute();

  return response.body;
};

/**
 * Adds a line item to an anonymous cart by anonymous ID
 * @param anonymousId The anonymous ID associated with the cart
 * @param sku The SKU of the product variant to add
 * @param quantity The number of items to add
 * @returns The updated cart
 */
const addLineItemToAnonymousCart = async (
  anonymousId: string,
  sku: string,
  quantity: number = 1
): Promise<Cart> => {
  const cartResponse = await getAnonymousCart(anonymousId);
  
  if (cartResponse.count === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Cart not found',
      message: `No active cart found for anonymousId: ${anonymousId}`,
    });
  }

  const cart = cartResponse.results[0];
  return await addLineItemToCart(cart.id, cart.version, sku, quantity);
};

/**
 * Removes a line item from an anonymous cart by anonymous ID
 * @param anonymousId The anonymous ID associated with the cart
 * @param lineItemId The ID of the line item to remove
 * @param quantity Optional quantity to remove. If omitted, removes the entire line item
 * @returns The updated cart
 */
const removeLineItemFromAnonymousCart = async (
  anonymousId: string,
  lineItemId: string,
  quantity?: number
): Promise<Cart> => {
  const cartResponse = await getAnonymousCart(anonymousId);
  
  if (cartResponse.count === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Cart not found',
      message: `No active cart found for anonymousId: ${anonymousId}`,
    });
  }

  const cart = cartResponse.results[0];
  return await removeLineItemFromCart(cart.id, cart.version, lineItemId, quantity);
};

/**
 * Adds a line item to a customer cart by customer ID
 * @param customerId The customer ID associated with the cart
 * @param sku The SKU of the product variant to add
 * @param quantity The number of items to add
 * @returns The updated cart
 */
const addLineItemToCustomerCart = async (
  customerId: string,
  sku: string,
  quantity: number = 1
): Promise<Cart> => {
  const cartResponse = await getCustomerCart(customerId);
  
  if (cartResponse.count === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Cart not found',
      message: `No active cart found for customerId: ${customerId}`,
    });
  }

  const cart = cartResponse.results[0];
  return await addLineItemToCart(cart.id, cart.version, sku, quantity);
};

/**
 * Removes a line item from a customer cart by customer ID
 * @param customerId The customer ID associated with the cart
 * @param lineItemId The ID of the line item to remove
 * @param quantity Optional quantity to remove. If omitted, removes the entire line item
 * @returns The updated cart
 */
const removeLineItemFromCustomerCart = async (
  customerId: string,
  lineItemId: string,
  quantity?: number
): Promise<Cart> => {
  const cartResponse = await getCustomerCart(customerId);
  
  if (cartResponse.count === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Cart not found',
      message: `No active cart found for customerId: ${customerId}`,
    });
  }

  const cart = cartResponse.results[0];
  return await removeLineItemFromCart(cart.id, cart.version, lineItemId, quantity);
};

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