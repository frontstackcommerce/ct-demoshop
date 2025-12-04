<script setup lang="ts">
defineProps<{
  label: string
  href?: string
  icon: 'search' | 'cart' | 'menu' | 'close'
}>()
</script>

<template>
  <NuxtLink
    v-if="href"
    :to="href"
    class="flex cursor-pointer items-center justify-center rounded-full p-3 text-inverted-foreground hover:bg-background hover:text-foreground hover:opacity-60"
  >
    <IconSearch v-if="icon === 'search'" class="size-6" />
    <IconShoppingCart v-else-if="icon === 'cart'" class="size-6" />
    <IconMenu v-else-if="icon === 'menu'" class="size-6" />
    <IconX v-else-if="icon === 'close'" class="size-6" />
  </NuxtLink>
  <div
    v-else
    class="flex cursor-pointer items-center justify-center rounded-full p-3 text-inverted-foreground hover:bg-background hover:text-foreground hover:opacity-60"
  >
    <IconSearch v-if="icon === 'search'" class="size-6" />
    <IconShoppingCart v-else-if="icon === 'cart'" class="size-6" />
    <IconMenu v-else-if="icon === 'menu'" class="size-6" />
    <IconX v-else-if="icon === 'close'" class="size-6" />
  </div>
</template>
