import { toast } from 'vue-sonner'

// eslint-disable-next-line no-restricted-imports
import AddToCart from '~/components/layout/toast/AddToCart.vue'

interface AddToCartProps {
  productName: string
  productImage?: string
  price?: string
}

export function useNotify() {
  function addToCartMessage(props: AddToCartProps) {
    toast.custom(markRaw(AddToCart), {
      componentProps: props,
      duration: 5000,
    })
  }

  return {
    addToCartMessage,
  }
}
