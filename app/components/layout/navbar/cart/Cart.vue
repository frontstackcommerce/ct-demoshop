<script setup lang="ts">
const { lineItems, refreshCart } = useCart()

onMounted(async () => {
  await refreshCart()
})

const hasItems = computed(() => (lineItems.value?.length || 0) > 0)
</script>

<template>
  <NavigationMenuList>
    <NavigationMenuItem value="cart">
      <NavigationMenuTrigger as-child>
        <Button
          variant="icon"
          size="xs"
          class="size-14 rounded-full border-4 border-transparent p-0 hover:bg-white/20 data-[state=open]:bg-white/20"
        >
          <IconShoppingCart class="size-6" />
          <StoreCartBadge v-if="hasItems" />
        </Button>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <LayoutDrawerCart />
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</template>
