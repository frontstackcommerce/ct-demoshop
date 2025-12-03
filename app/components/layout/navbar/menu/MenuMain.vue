<script setup lang="ts">
// eslint-disable-next-line
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

const { shopCategories } = useMenu()
</script>

<template>
  <div v-if="Object.keys(shopCategories).length > 0" class="items-center gap-8">
    <NavigationMenuList>
      <NavigationMenuItem v-for="item in shopCategories" :key="item.label">
        <NuxtLink v-if="false" v-slot="{ isActive, href, navigate }" :to="item.href" custom>
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
            <LayoutNavbarMenuContent
              v-if="item.key"
              :category-id="item.key"
              :category="item"
              :categories="item.children.items"
            />
          </NavigationMenuContent>
        </div>
      </NavigationMenuItem>
    </NavigationMenuList>
  </div>
</template>
