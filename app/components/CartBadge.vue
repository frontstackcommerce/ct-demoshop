<script setup lang="ts">
const { cart } = useCart()

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    size: 'md',
  }
)

const sizeClass = computed(() => {
  return props.size === 'sm'
    ? 'size-4 text-xs'
    : props.size === 'md'
      ? 'size-5 text-xs'
      : 'size-6 text-base'
})
</script>

<template>
  <ClientOnly>
    <div
      v-if="cart?.items?.length"
      :class="sizeClass"
      class="absolute top-1 right-1 flex items-center justify-center rounded-full bg-[#FFC806]"
    >
      <span class="text-checkout-foreground">{{ cart?.items?.length }}</span>
    </div>
  </ClientOnly>
</template>
