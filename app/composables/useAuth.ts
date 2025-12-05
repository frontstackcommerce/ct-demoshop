export interface UseAuthReturn {
  /**
   * Whether the user is authenticated
   */
  isAuthenticated: Ref<boolean>;

  /**
   * Anonymous cart ID (anonymous ID used to identify the user)
   */
  anonymousCartId: Ref<string>;

  /**
   * Actual cart ID from commercetools (stored in cookie)
   */
  cartId: Ref<string | null>;
}

/**
 * Abstracts store and retreival of anonymous cart ID
 * Uses cookies to store the anonymous cart ID and actual cart ID
 * Uses useState to ensure shared reactive state across all components
 */
export function useAuth(): UseAuthReturn {
  const anonymousCartIdCookie = useCookie('anonymousCartId', { default: () => crypto.randomUUID(), maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' })
  const cartIdCookie = useCookie<string | null>('cartId', { default: () => null, maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' })

  // Use useState to create shared reactive state that persists across components
  const isAuthenticated = useState<boolean>('auth:isAuthenticated', () => false);
  const anonymousCartId = useState<string>('auth:anonymousCartId', () => anonymousCartIdCookie.value);
  const cartId = useState<string | null>('auth:cartId', () => cartIdCookie.value);

  // Watch for changes and sync to cookie
  watch(cartId, (newValue) => {
    cartIdCookie.value = newValue;
  });

  return {
    isAuthenticated,
    anonymousCartId,
    cartId,
  };
}
