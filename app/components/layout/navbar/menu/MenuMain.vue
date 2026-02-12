<script setup lang="ts">
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

const { fullTree } = useShopMenu()
</script>

<template>
  <NavigationMenuList v-if="fullTree?.items && fullTree.items.length > 0" class="flex items-center gap-1">
    <NavigationMenuItem v-for="item in fullTree.items" :key="item.key">
      <!-- Simple link (no dropdown) -->
      <NuxtLink
        v-if="!item.categoryId && item.path"
        v-slot="{ isActive, href, navigate }"
        :to="item.path"
        custom
      >
        <NavigationMenuLink
          :active="isActive"
          :href
          :class="cn(navigationMenuTriggerStyle(), 'text-sm font-normal')"
          @click="navigate"
        >
          {{ item.name }}
        </NavigationMenuLink>
      </NuxtLink>

      <!-- Dropdown menu -->
      <template v-else>
        <NavigationMenuTrigger class="text-sm font-normal bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
          {{ item.name }}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <LayoutNavbarMenuContent v-if="item.key" :category-id="item.key" :category="item" />
        </NavigationMenuContent>
      </template>
    </NavigationMenuItem>
  </NavigationMenuList>
</template>
