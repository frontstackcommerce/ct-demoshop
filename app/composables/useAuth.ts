export interface UseAuthReturn {
  isAuthenticated: Ref<boolean>
  anonymousCartId: Ref<string>
  cartId: Ref<string | null>
}

export function useAuth(): UseAuthReturn {
  const anonymousCartIdCookie = useCookie('anonymousCartId', {
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'lax',
  })
  if (!anonymousCartIdCookie.value) {
    anonymousCartIdCookie.value = crypto.randomUUID()
  }
  const cartIdCookie = useCookie<string | null>('cartId', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'lax',
  })

  const isAuthenticated = useState<boolean>('auth:isAuthenticated', () => false)
  const anonymousCartId = useState<string>(
    'auth:anonymousCartId',
    () => anonymousCartIdCookie.value!,
  )
  const cartId = useState<string | null>('auth:cartId', () => cartIdCookie.value)

  watch(cartId, (newValue) => {
    cartIdCookie.value = newValue
  })

  return {
    isAuthenticated,
    anonymousCartId,
    cartId,
  }
}
