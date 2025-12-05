<script setup lang="ts">
const { lineItems } = useCart()

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
      v-if="lineItems?.length"
      :class="sizeClass"
      class="absolute top-1 right-1 flex items-center justify-center rounded-full bg-[#FFC806] text-[#191741]"
    >
      <span class="text-checkout-foreground">{{ lineItems?.length }}</span>
    </div>
  </ClientOnly>
</template>
