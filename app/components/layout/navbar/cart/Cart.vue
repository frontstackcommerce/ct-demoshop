<script setup lang="ts">
const { lineItems, refreshCart } = useCart()

onMounted(async () => {
  await refreshCart()
})
</script>

<template>
  <NavigationMenuList>
    <NavigationMenuItem value="cart">
      <NavigationMenuTrigger as-child>
        <Button
          variant="icon"
          size="xs"
          class="hover:bg-active/20 data-[state=open]:bg-active/20 size-10 rounded-full border-4 border-transparent p-0"
        >
          <IconShoppingCart class="size-5" />
          <StoreCartBadge />
        </Button>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <LayoutDrawerCart />
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</template>
