import { toast } from 'vue-sonner'

type AddToCartProps = {
  variant: ProductVariant
  recommended?: ProductCard
}

export const useNotify = () => {
  const { hideNavMenu } = useShopNav()

  function addToCartMessage(props: AddToCartProps) {
    hideNavMenu.value = true
    toast(props.variant.images?.[0]?.altText || 'Added to cart', {
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
