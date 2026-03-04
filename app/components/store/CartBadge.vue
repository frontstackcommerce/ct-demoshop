<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'lg'
}>()

// Cart count will come from useCart composable later
// For now, use a placeholder
const cartCount = useState<number>('cart:count', () => 0)
</script>

<template>
  <span
    v-if="cartCount > 0"
    class="absolute -right-1 -top-1 flex items-center justify-center rounded-full bg-primary text-primary-foreground"
    :class="size === 'lg' ? 'size-5 text-xs' : 'size-4 text-[10px]'"
  >
    {{ cartCount }}
  </span>
</template>
