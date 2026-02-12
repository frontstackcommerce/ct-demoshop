<template>
  <header class="sticky top-0 z-50 bg-background">
    <!-- Announcement bar -->
    <LayoutHeaderUtility />
    
    <!-- Mobile header -->
    <div class="bg-background border-b border-border/50 px-4 py-4 md:hidden">
      <div class="flex items-center justify-between">
        <button class="p-2 -ml-2">
          <IconMenu class="size-5" />
        </button>
        <StoreLogo class="h-6" />
        <div class="flex items-center gap-1">
          <button class="p-2">
            <IconSearch class="size-5" />
          </button>
          <NuxtLink to="/cart" class="p-2 relative">
            <IconShoppingBag class="size-5" />
            <StoreCartBadge />
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <!-- Desktop header -->
    <div class="hidden md:block bg-background border-b border-border/50">
      <LayoutNavbar />
    </div>
  </header>
</template>
