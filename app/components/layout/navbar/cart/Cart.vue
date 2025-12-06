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
          class="hover:bg-active/20 data-[state=open]:bg-active/20 size-10 rounded-full border-4 border-transparent p-0"
        >
          <IconShoppingCart class="size-5" />
          <StoreCartBadge v-if="hasItems" />
        </Button>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <LayoutDrawerCart />
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</template>
