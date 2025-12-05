import client from '~~/.frontstack/generated-client'
import type { Cart, LineItem } from '@commercetools/platform-sdk';

export const SHOPPING_CART_QUERY_KEYS = {
  root: ['shopping-cart'] as const,
  cart: (key: MaybeRef<string>) => [...SHOPPING_CART_QUERY_KEYS.root, unref(key)] as const,
  cartItems: (cart: MaybeRef<Cart>) =>
    [...SHOPPING_CART_QUERY_KEYS.root, JSON.stringify(unref(cart)), 'items'] as const,
}

export const shoppingCartQuery = ({ key }: { key: MaybeRef<string> }) => {
  return {
    key: SHOPPING_CART_QUERY_KEYS.cart(key),
    query: async () => {
      return await $fetch<Cart>(`/api/cart/${key}`);
    },
    staleTime: 1000 * 60 * 60,
  }
}

export const shoppingCartItemsQuery = ({ cart }: { cart: MaybeRef<Cart> }) => {
  const { token } = useContext()
  return {
    key: SHOPPING_CART_QUERY_KEYS.cartItems(cart),
    query: async () => {
      return await client.listing(
        'CartProducts',
        {
          keys: unref(cart).lineItems?.map((item: LineItem) => item.key ?? '') ?? [],
        },
        {
          query: {
            page: 1,
          },
          contextKey: token.value,
        }
      )
    },
    staleTime: 1000 * 60 * 5,
    enabled: () => !!unref(cart)?.lineItems?.length,
  }
}
