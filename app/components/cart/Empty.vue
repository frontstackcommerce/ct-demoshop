<script setup lang="ts">
import { ShoppingBag } from 'lucide-vue-next'

defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center px-6 py-16">
    <div class="mb-6 flex size-16 items-center justify-center rounded-full bg-shade">
      <ShoppingBag class="size-8 text-muted-foreground" />
    </div>
    <h3 class="mb-2 font-serif text-2xl text-foreground">
      {{ $t('cart.empty.title') }}
    </h3>
  </div>
</template>
