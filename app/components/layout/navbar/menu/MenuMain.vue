<script setup lang="ts">
// eslint-disable-next-line
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

type CategoryItem = {
  label: string
  href: string
  sale?: boolean
  image?: string
  children?: CategoryItem[]
  key?: string
}

const shopCategories = ref<CategoryItem[]>([
  {
    key: 'home',
    label: 'Home',
    href: '/',
    sale: false,
    image: '/images/shop/category-1.jpg',
    children: [],
  },
  {
    key: 'clothing',
    label: 'Clothing',
    href: '/clothing',
    sale: false,
    image: '/images/shop/category-2.jpg',
    children: [
      {
        label: 'Category 1',
        key: 'category-1',
        href: '/category-1',
      },
      {
        label: 'Category 2',
        href: '/category-2',
      },
    ],
  },
  {
    key: 'accessories',
    label: 'Accessories',
    href: '/accessories',
    sale: false,
    image: '/images/shop/category-3.jpg',
    children: [
      {
        label: 'Category 3',
        href: '/category-3',
      },
    ],
  },
  {
    key: 'equipment',
    label: 'Equipment',
    href: '/equipment',
    sale: false,
    image: '/images/shop/category-4.jpg',
  },
])
</script>

<template>
  <div class="items-center gap-8 bg-amber-300">
    <NavigationMenuList>
      <NavigationMenuItem v-for="item in shopCategories" :key="item.label">
        <NuxtLink v-if="false" v-slot="{ isActive, href, navigate }" :to="item.href" custom>
          <NavigationMenuLink
            :active="isActive"
            :href
            :class="navigationMenuTriggerStyle()"
            @click="navigate"
          >
            {{ item.label }}
          </NavigationMenuLink>
        </NuxtLink>

        <div v-else>
          <NavigationMenuTrigger class="px-6">{{ item.label }}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <LayoutNavbarMenuContent v-if="item.key" :category-id="item.key" />
          </NavigationMenuContent>
        </div>
      </NavigationMenuItem>
    </NavigationMenuList>
  </div>
</template>
