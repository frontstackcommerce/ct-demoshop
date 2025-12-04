<script setup lang="ts">
// eslint-disable-next-line
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

const { fullMenu } = useShopMenu()
</script>

<template>
  <div v-if="fullMenu.items && fullMenu.items.length > 0" class="items-center gap-8">
    <NavigationMenuList>
      <NavigationMenuItem v-for="item in fullMenu.items" :key="item.key">
        <NuxtLink
          v-if="!item.categoryId && item.path"
          v-slot="{ isActive, href, navigate }"
          :to="item.path"
          custom
        >
          <NavigationMenuLink
            :active="isActive"
            :href
            :class="navigationMenuTriggerStyle()"
            @click="navigate"
          >
            {{ item.name }}
          </NavigationMenuLink>
        </NuxtLink>

        <div v-else>
          <NavigationMenuTrigger class="px-6">{{ item.name }}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <LayoutNavbarMenuContent v-if="item.key" :category-id="item.key" :category="item" />
          </NavigationMenuContent>
        </div>
      </NavigationMenuItem>
    </NavigationMenuList>
  </div>
</template>
