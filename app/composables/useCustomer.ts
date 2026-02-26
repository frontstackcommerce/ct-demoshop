export function useCustomer() {
  const customer = useState<CustomerData | null>('customer', () => null)
  const loading = useState('customer-loading', () => false)
  const isLoggedIn = computed(() => !!customer.value)

  const fetchMe = async () => {
    try {
      customer.value = await $fetch<CustomerData>('/api/customer/me')
    } catch {
      customer.value = null
    }
  }

  const login = async (email: string, password: string) => {
    loading.value = true
    try {
      const result = await $fetch<CustomerData>('/api/customer/login', {
        method: 'POST',
        body: { email, password },
      })
      customer.value = result
      return result
    } finally {
      loading.value = false
    }
  }

  const register = async (data: { email: string; password: string; firstName: string; lastName: string }) => {
    loading.value = true
    try {
      const result = await $fetch<CustomerData>('/api/customer/register', {
        method: 'POST',
        body: data,
      })
      customer.value = result
      return result
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    await $fetch('/api/customer/logout', { method: 'POST' })
    customer.value = null
  }

  return { customer, loading, isLoggedIn, fetchMe, login, register, logout }
}
