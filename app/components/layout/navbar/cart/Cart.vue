<script setup lang="ts">
const { cart } = useCart()

const hasItems = computed(() => (cart.value?.items?.length || 0) > 0)
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
          <SharedCartBadge v-if="hasItems" />
        </Button>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <PageDrawerCart />
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</template>
