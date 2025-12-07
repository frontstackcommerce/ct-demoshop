import { markRaw } from 'vue'
import { toast } from 'vue-sonner'

// eslint-disable-next-line
import AddToCart from '~/components/store/notify/AddToCart.vue'

type AddToCartProps = {
  variant: ProductVariant
  recommended?: ProductCard
}
export const useNotify = () => {
  const { hideNavMenu } = useShopNav()
  function addToCartMessage(props: AddToCartProps) {
    hideNavMenu.value = true
    toast.custom(markRaw(AddToCart), {
      componentProps: props,
      duration: 5000,
      onAutoClose: () => {
        hideNavMenu.value = false
      },
      onDismiss: () => {
        hideNavMenu.value = false
      },
    })
  }

  return {
    addToCartMessage,
  }
}
