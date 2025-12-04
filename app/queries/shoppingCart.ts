import client from '~~/.frontstack/generated-client'

export const SHOPPING_CART_QUERY_KEYS = {
  root: ['shopping-cart'] as const,
  cart: (key: MaybeRef<string>) => [...SHOPPING_CART_QUERY_KEYS.root, unref(key)] as const,
  cartItems: (cart: MaybeRef<ShoppingCart>) =>
    [...SHOPPING_CART_QUERY_KEYS.root, JSON.stringify(unref(cart)), 'items'] as const,
}

export const shoppingCartQuery = ({ key }: { key: MaybeRef<string> }) => {
  return {
    key: SHOPPING_CART_QUERY_KEYS.cart(key),
    query: async () => {
      return Promise.resolve({
        items: [
          {
            key: 'MB-0973',
            quantity: 1,
          },
          {
            key: 'BUCK-023',
            quantity: 1,
          },
        ],
      })
    },
    staleTime: 1000 * 60 * 60,
  }
}

export const shoppingCartItemsQuery = ({
  cart,
  contextKey,
}: {
  cart: MaybeRef<ShoppingCart>
  contextKey?: MaybeRef<string>
}) => {
  return {
    key: SHOPPING_CART_QUERY_KEYS.cartItems(cart),
    query: async () => {
      return await client.listing(
        'CartProducts',
        {
          keys: unref(cart).items?.map((item) => item.key) ?? [],
        },
        {
          query: {
            page: 1,
          },
          contextKey: unref(contextKey),
        }
      )
    },
    staleTime: 1000 * 60 * 5,
    enabled: () => !!unref(cart)?.items?.length,
  }
}
