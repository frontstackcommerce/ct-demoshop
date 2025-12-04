import type { ShallowRef } from 'vue'
import type { UseQueryReturn } from '@pinia/colada'
import { shoppingCartQuery, shoppingCartItemsQuery } from '~/queries/shoppingCart'

interface IUseCart {
  cart: ShallowRef<ShoppingCart | undefined>
  status: UseQueryReturn['status']
  addItem: (vars: {
    variant: ProductVariant
    quantity: number
  }) => Promise<ShoppingCart | undefined>
  updateItem: (vars: { cartItemId: string; quantity: number }) => Promise<ShoppingCart | undefined>
  removeItem: (vars: { cartItemId: string }) => Promise<ShoppingCart | undefined>
}

export const useCart = (): IUseCart => {
  const { token } = useContext()

  const { data: calculatedCart } = useQuery(shoppingCartQuery({ key: token.value ?? '' }))

  const { data: cartItems, status } = useQuery(shoppingCartItemsQuery, {
    cart: calculatedCart,
    contextKey: token.value,
  })

  const cart = computed(() => {
    if (!calculatedCart.value) return calculatedCart.value
    if (!cartItems.value?.items) return calculatedCart.value

    // Create a Map for O(1) lookup performance
    const blockDataMap = new Map(cartItems.value.items.map((block) => [block.key, block]))

    return {
      ...calculatedCart.value,
      items: calculatedCart.value.items.map((item) => ({
        ...item,
        data: blockDataMap.get(item.key),
      })),
    }
  })

  const { mutateAsync: addItem } = useMutation({
    mutation: (vars: { variant: ProductVariant; quantity: number }) => {
      console.log('addItem', vars)
      return Promise.resolve(cart.value)
    },
    onMutate: (vars) => {
      console.log('onMutate', vars)
    },
    onError: () => {
      console.log('onError')
    },
    onSuccess: (data) => {
      console.log('onSuccess', data)
    },
  })
  // Update cart item quantity
  const { mutateAsync: updateItem } = useMutation({
    mutation: (vars: { cartItemId: string; quantity: number }) => {
      console.log('updateItem', vars)
      return Promise.resolve(cart.value)
    },
    onMutate: (vars) => {
      console.log('onMutate', vars)
    },
    onError: () => {
      console.log('onError')
    },
    onSuccess: (data) => {
      console.log('onSuccess', data)
    },
  })

  const { mutateAsync: removeItem } = useMutation({
    mutation: (vars: { cartItemId: string }) => {
      console.log('removeItem', vars)
      return Promise.resolve(cart.value)
    },
    onMutate: (vars) => {
      console.log('onMutate', vars)
    },
    onError: () => {
      console.log('onError')
    },
    onSuccess: (data) => {
      console.log('onSuccess', data)
    },
  })

  return {
    cart,
    status,
    addItem,
    updateItem,
    removeItem,
  }
}
