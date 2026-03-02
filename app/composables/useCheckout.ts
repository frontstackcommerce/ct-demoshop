type CheckoutStep = 'email' | 'address' | 'shipping' | 'payment' | 'confirmation'

export function useCheckout() {
  const { refreshCart } = useCart()
  const { customer } = useCustomer()

  const currentStep = useState<CheckoutStep>('checkout-step', () => 'email')
  const loading = useState('checkout-loading', () => false)
  const error = useState<string | null>('checkout-error', () => null)
  const orderConfirmation = useState<OrderConfirmation | null>('checkout-order', () => null)

  // Form state
  const emailForm = useState('checkout-email', () => '')
  const addressForm = useState<AddressForm>('checkout-address', () => ({
    firstName: '',
    lastName: '',
    streetName: '',
    streetNumber: '',
    postalCode: '',
    city: '',
    country: 'DE',
    phone: '',
  }))
  const billingAddressForm = useState<AddressForm>('checkout-billing', () => ({
    firstName: '',
    lastName: '',
    streetName: '',
    streetNumber: '',
    postalCode: '',
    city: '',
    country: 'DE',
    phone: '',
  }))
  const sameAsBilling = useState('checkout-same-billing', () => true)
  const selectedShippingMethod = useState<string>('checkout-shipping-method', () => '')
  const shippingMethods = useState<ShippingMethodOption[]>('checkout-shipping-methods', () => [])

  const prefillFromCustomer = () => {
    if (!customer.value) return
    emailForm.value = customer.value.email
    if (customer.value.firstName) addressForm.value.firstName = customer.value.firstName
    if (customer.value.lastName) addressForm.value.lastName = customer.value.lastName
  }

  watch(
    customer,
    () => {
      if (customer.value) prefillFromCustomer()
    },
    { immediate: true },
  )

  const submitEmail = async () => {
    loading.value = true
    error.value = null
    try {
      await $fetch('/api/cart/email', {
        method: 'POST',
        body: { email: emailForm.value },
      })
      await refreshCart()
      currentStep.value = 'address'
    } catch (e: any) {
      error.value = e.data?.message || 'Failed to set email'
    } finally {
      loading.value = false
    }
  }

  const submitAddress = async () => {
    loading.value = true
    error.value = null
    try {
      await $fetch('/api/cart/addresses', {
        method: 'POST',
        body: {
          shippingAddress: addressForm.value,
          billingAddress: sameAsBilling.value ? addressForm.value : billingAddressForm.value,
        },
      })
      const methods = await $fetch<ShippingMethodOption[]>('/api/cart/shipping-methods')
      shippingMethods.value = methods
      if (methods.length) selectedShippingMethod.value = methods[0]!.id
      await refreshCart()
      currentStep.value = 'shipping'
    } catch (e: any) {
      error.value = e.data?.message || 'Failed to set address'
    } finally {
      loading.value = false
    }
  }

  const submitShipping = async () => {
    loading.value = true
    error.value = null
    try {
      await $fetch('/api/cart/shipping-method', {
        method: 'POST',
        body: { shippingMethodId: selectedShippingMethod.value },
      })
      await refreshCart()
      currentStep.value = 'payment'
    } catch (e: any) {
      error.value = e.data?.message || 'Failed to set shipping method'
    } finally {
      loading.value = false
    }
  }

  const submitPayment = async () => {
    loading.value = true
    error.value = null
    try {
      await $fetch('/api/checkout/payment', { method: 'POST' })
      const order = await $fetch<OrderConfirmation>('/api/checkout/order', { method: 'POST' })
      orderConfirmation.value = order
      await refreshCart()
      currentStep.value = 'confirmation'
    } catch (e: any) {
      error.value = e.data?.message || 'Failed to process payment'
    } finally {
      loading.value = false
    }
  }

  const goToStep = (step: CheckoutStep) => {
    const steps: CheckoutStep[] = ['email', 'address', 'shipping', 'payment', 'confirmation']
    const currentIndex = steps.indexOf(currentStep.value)
    const targetIndex = steps.indexOf(step)
    if (targetIndex < currentIndex) {
      currentStep.value = step
    }
  }

  const reset = () => {
    currentStep.value = 'email'
    emailForm.value = ''
    addressForm.value = {
      firstName: '',
      lastName: '',
      streetName: '',
      streetNumber: '',
      postalCode: '',
      city: '',
      country: 'DE',
      phone: '',
    }
    billingAddressForm.value = {
      firstName: '',
      lastName: '',
      streetName: '',
      streetNumber: '',
      postalCode: '',
      city: '',
      country: 'DE',
      phone: '',
    }
    sameAsBilling.value = true
    selectedShippingMethod.value = ''
    shippingMethods.value = []
    orderConfirmation.value = null
    error.value = null
  }

  return {
    currentStep,
    loading,
    error,
    orderConfirmation,
    emailForm,
    addressForm,
    billingAddressForm,
    sameAsBilling,
    selectedShippingMethod,
    shippingMethods,
    submitEmail,
    submitAddress,
    submitShipping,
    submitPayment,
    goToStep,
    reset,
  }
}
