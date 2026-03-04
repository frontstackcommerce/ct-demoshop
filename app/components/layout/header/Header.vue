<script setup lang="ts">
import { Menu, Search, ShoppingBag } from 'lucide-vue-next'
</script>

<template>
  <header class="sticky top-0 z-50 bg-background">
    <!-- Announcement bar -->
    <LayoutHeaderUtility />

    <!-- Mobile header -->
    <div class="border-b border-border/50 bg-background px-4 py-4 md:hidden">
      <div class="flex items-center justify-between">
        <button class="-ml-2 p-2">
          <Menu class="size-5" />
        </button>
        <StoreLogo class="h-6" />
        <div class="flex items-center gap-1">
          <button class="p-2">
            <Search class="size-5" />
          </button>
          <NuxtLink to="/cart" class="relative p-2">
            <ShoppingBag class="size-5" />
            <StoreCartBadge />
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Desktop header -->
    <div class="hidden border-b border-border/50 bg-background md:block">
      <LayoutNavbar />
    </div>
  </header>
</template>
