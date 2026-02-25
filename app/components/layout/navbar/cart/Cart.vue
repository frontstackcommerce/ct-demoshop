<script setup lang="ts">
import { ShoppingCart } from 'lucide-vue-next'

const { refreshCart } = useCart()

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
          class="hover:bg-active/20 data-[state=open]:bg-active/20 size-10 border-4 border-transparent p-0"
        >
          <ShoppingCart class="size-5" />
          <LayoutStoreCartBadge />
        </Button>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <LayoutDrawerCart />
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</template>
