<script setup lang="ts">
const { lineItems } = useCart()
</script>

<template>
  <ClientOnly>
    <div
      v-if="lineItems && lineItems.length"
      class="absolute right-0 top-0 flex size-5 items-center justify-center rounded-full bg-checkout"
    >
      <span class="text-xs text-checkout-foreground">{{ lineItems.length }}</span>
    </div>
  </ClientOnly>
</template>
