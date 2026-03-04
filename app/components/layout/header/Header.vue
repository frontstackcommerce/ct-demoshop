<template>
  <header class="bg-background sticky top-0 z-50">
    <!-- Announcement bar -->
    <LayoutHeaderUtility />

    <!-- Mobile header -->
    <div class="bg-background border-border/50 border-b px-4 py-4 md:hidden">
      <div class="flex items-center justify-between">
        <button class="-ml-2 p-2">
          <IconMenu class="size-5" />
        </button>
        <StoreLogo class="h-6" />
        <div class="flex items-center gap-1">
          <button class="p-2">
            <IconSearch class="size-5" />
          </button>
          <NuxtLink to="/cart" class="relative p-2">
            <IconShoppingBag class="size-5" />
            <StoreCartBadge />
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Desktop header -->
    <div class="bg-background border-border/50 hidden border-b md:block">
      <LayoutNavbar />
    </div>
  </header>
</template>
