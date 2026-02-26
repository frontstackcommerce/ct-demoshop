import {
  ClientBuilder,
  type HttpMiddlewareOptions,
  type AuthMiddlewareOptions,
} from '@commercetools/ts-client'
import {
  createApiBuilderFromCtpClient,
  type ByProjectKeyRequestBuilder,
  type Cart,
  type Customer,
  type LineItem as CtLineItem,
} from '@commercetools/platform-sdk'

let _apiRoot: ByProjectKeyRequestBuilder | null = null

export function getApiRoot(): ByProjectKeyRequestBuilder {
  if (_apiRoot) return _apiRoot

  const config = useRuntimeConfig()
  const { projectKey, clientId, clientSecret, authHost, apiHost } = config.commercetools

  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: authHost,
    projectKey,
    credentials: { clientId, clientSecret },
  }

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: apiHost,
  }

  const client = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build()

  _apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey })
  return _apiRoot
}

export async function updateCartWithRetry(
  cartId: string,
  version: number,
  actions: Array<Record<string, unknown>>,
  maxRetries = 3,
): Promise<Cart> {
  const api = getApiRoot()
  let currentVersion = version

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await api
        .carts()
        .withId({ ID: cartId })
        .post({
          body: {
            version: currentVersion,
            actions: actions as Cart['version'] extends number ? typeof actions : never,
          } as { version: number; actions: any[] },
        })
        .execute()
      return response.body
    } catch (error: any) {
      if (error.statusCode === 409 && attempt < maxRetries) {
        // Refetch cart to get current version
        const freshCart = await api.carts().withId({ ID: cartId }).get().execute()
        currentVersion = freshCart.body.version
        continue
      }
      throw error
    }
  }

  throw new Error('Max retries exceeded for cart update')
}

export function mapLineItem(item: CtLineItem): LineItem {
  return {
    id: item.id,
    key: item.variant?.sku ?? item.productKey ?? item.id,
    quantity: item.quantity,
    name: item.name,
    price: item.price
      ? {
          value: {
            centAmount: item.price.value.centAmount,
            currencyCode: item.price.value.currencyCode,
            fractionDigits: item.price.value.fractionDigits,
          },
        }
      : undefined,
    variant: {
      images: item.variant?.images?.map((img) => ({
        url: img.url,
        label: img.label,
      })),
    },
  }
}

export function mapCustomer(customer: Customer): CustomerData {
  return {
    id: customer.id,
    email: customer.email,
    firstName: customer.firstName,
    lastName: customer.lastName,
    addresses: customer.addresses?.map((addr) => ({
      firstName: addr.firstName ?? '',
      lastName: addr.lastName ?? '',
      streetName: addr.streetName ?? '',
      streetNumber: addr.streetNumber ?? '',
      postalCode: addr.postalCode ?? '',
      city: addr.city ?? '',
      country: addr.country,
      phone: addr.phone ?? '',
    })),
    defaultShippingAddressId: customer.defaultShippingAddressId,
    defaultBillingAddressId: customer.defaultBillingAddressId,
  }
}

export function mapCart(cart: Cart): CartData {
  return {
    id: cart.id,
    version: cart.version,
    lineItems: cart.lineItems.map(mapLineItem),
    totalPrice: {
      centAmount: cart.totalPrice.centAmount,
      currencyCode: cart.totalPrice.currencyCode,
      fractionDigits: cart.totalPrice.fractionDigits,
    },
    customerEmail: cart.customerEmail,
    shippingAddress: cart.shippingAddress
      ? {
          firstName: cart.shippingAddress.firstName ?? '',
          lastName: cart.shippingAddress.lastName ?? '',
          streetName: cart.shippingAddress.streetName ?? '',
          streetNumber: cart.shippingAddress.streetNumber ?? '',
          postalCode: cart.shippingAddress.postalCode ?? '',
          city: cart.shippingAddress.city ?? '',
          country: cart.shippingAddress.country,
          phone: cart.shippingAddress.phone ?? '',
        }
      : undefined,
    billingAddress: cart.billingAddress
      ? {
          firstName: cart.billingAddress.firstName ?? '',
          lastName: cart.billingAddress.lastName ?? '',
          streetName: cart.billingAddress.streetName ?? '',
          streetNumber: cart.billingAddress.streetNumber ?? '',
          postalCode: cart.billingAddress.postalCode ?? '',
          city: cart.billingAddress.city ?? '',
          country: cart.billingAddress.country,
          phone: cart.billingAddress.phone ?? '',
        }
      : undefined,
    shippingMethod: cart.shippingInfo
      ? {
          id: cart.shippingInfo.shippingMethod?.id ?? '',
          name: cart.shippingInfo.shippingMethodName ?? '',
          price: {
            centAmount: cart.shippingInfo.price.centAmount,
            currencyCode: cart.shippingInfo.price.currencyCode,
            fractionDigits: cart.shippingInfo.price.fractionDigits,
          },
        }
      : undefined,
    taxedPrice: cart.taxedPrice
      ? {
          totalGross: {
            centAmount: cart.taxedPrice.totalGross.centAmount,
            currencyCode: cart.taxedPrice.totalGross.currencyCode,
            fractionDigits: cart.taxedPrice.totalGross.fractionDigits,
          },
          totalNet: {
            centAmount: cart.taxedPrice.totalNet.centAmount,
            currencyCode: cart.taxedPrice.totalNet.currencyCode,
            fractionDigits: cart.taxedPrice.totalNet.fractionDigits,
          },
          totalTax: cart.taxedPrice.totalTax
            ? {
                centAmount: cart.taxedPrice.totalTax.centAmount,
                currencyCode: cart.taxedPrice.totalTax.currencyCode,
                fractionDigits: cart.taxedPrice.totalTax.fractionDigits,
              }
            : undefined,
        }
      : undefined,
  }
}
