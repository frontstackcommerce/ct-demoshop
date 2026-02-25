// TODO: Replace with Frontic category composable
export function useCategory(_categoryKey: string, _breadcrumbs?: ComputedRef<string[]>) {
  const metadata = ref<{ item: MenuItem } | null>(null)
  const status = ref<'success' | 'pending' | 'error'>('pending')

  return {
    metadata,
    status,
  }
}
