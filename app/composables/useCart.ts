/**
 * Example composable for a shopping cart using a simple array as state
 */
interface IUseCart {
  total: Ref<number>
  items: Ref<CartItem[]>
  addItem: (item: any) => void
  removeItem: (item: any) => void
  clearCart: () => void
  getTotal: () => number
}

export const useCart = (): IUseCart => {
  const total = ref(0)
  const items = ref<CartItem[]>([])

  const addItem = (item: CartItem) => {
    items.value.push(item)
    total.value += item.price
  }

  const removeItem = (item: CartItem) => {
    items.value = items.value.filter((i) => i.id !== item.id)
    total.value -= item.price
  }

  const clearCart = () => {
    items.value = []
    total.value = 0
  }

  const getTotal = () => {
    return total.value
  }

  return {
    total,
    items,
    addItem,
    removeItem,
    clearCart,
    getTotal,
  }
}
