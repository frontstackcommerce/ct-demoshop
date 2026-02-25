<script setup lang="ts">
defineProps<{
  label: string
  href?: string
  icon: 'search' | 'cart' | 'menu' | 'close'
}>()
</script>

<template>
  <NuxtLinkLocale
    v-if="href"
    :to="href"
    class="text-inverted-foreground hover:bg-background hover:text-foreground flex cursor-pointer items-center justify-center p-3 hover:opacity-60"
  >
    <IconSearch v-if="icon === 'search'" class="size-6" />
    <IconShoppingCart v-else-if="icon === 'cart'" class="size-6" />
    <IconMenu v-else-if="icon === 'menu'" class="size-6" />
    <IconX v-else-if="icon === 'close'" class="size-6" />
  </NuxtLinkLocale>
  <div
    v-else
    class="text-inverted-foreground hover:bg-background hover:text-foreground flex cursor-pointer items-center justify-center p-3 hover:opacity-60"
  >
    <IconSearch v-if="icon === 'search'" class="size-6" />
    <IconShoppingCart v-else-if="icon === 'cart'" class="size-6" />
    <IconMenu v-else-if="icon === 'menu'" class="size-6" />
    <IconX v-else-if="icon === 'close'" class="size-6" />
  </div>
</template>
