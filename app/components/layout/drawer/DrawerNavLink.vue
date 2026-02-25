<script setup lang="ts">
import { Menu, Search, ShoppingCart, X } from 'lucide-vue-next'

defineProps<{
  href?: string
  icon: 'search' | 'cart' | 'menu' | 'close'
}>()
</script>

<template>
  <NuxtLinkLocale v-if="href" :to="href" class="text-inverted-foreground hover:bg-background hover:text-foreground flex cursor-pointer items-center justify-center p-3 hover:opacity-60">
    <Search v-if="icon === 'search'" class="size-6" />
    <ShoppingCart v-else-if="icon === 'cart'" class="size-6" />
    <Menu v-else-if="icon === 'menu'" class="size-6" />
    <X v-else-if="icon === 'close'" class="size-6" />
  </NuxtLinkLocale>
  <div v-else class="text-inverted-foreground hover:bg-background hover:text-foreground flex cursor-pointer items-center justify-center p-3 hover:opacity-60">
    <Search v-if="icon === 'search'" class="size-6" />
    <ShoppingCart v-else-if="icon === 'cart'" class="size-6" />
    <Menu v-else-if="icon === 'menu'" class="size-6" />
    <X v-else-if="icon === 'close'" class="size-6" />
  </div>
</template>
