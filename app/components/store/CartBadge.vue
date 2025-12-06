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
      class="bg-checkout absolute top-1 right-1 flex items-center justify-center rounded-full"
    >
      <span class="font-sans font-bold">{{
        lineItems?.length > 9 ? '9+' : lineItems?.length
      }}</span>
    </div>
  </ClientOnly>
</template>
