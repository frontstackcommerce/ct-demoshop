<script setup lang="ts">
const { cart } = useCart()
</script>

<template>
  <ClientOnly>
    <div
      v-if="cart?.items?.length"
      class="absolute right-0 top-0 flex size-5 items-center justify-center rounded-full bg-checkout"
    >
      <span class="text-xs text-checkout-foreground">{{ cart?.items?.length }}</span>
    </div>
  </ClientOnly>
</template>
