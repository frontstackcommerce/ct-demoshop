<script setup lang="ts">
defineProps<{
  categories: CategoryCard['children']
}>()
</script>

<template>
  <ul v-if="categories?.items && categories?.items.length > 0" class="mt-4 flex flex-col">
    <li v-for="child in categories?.items" :key="child.key">
      <NavigationMenuLink as-child>
        <NuxtLink
          :to="child.link?.path"
          class="group relative inline-block overflow-hidden transition-all duration-300 hover:scale-105 hover:px-2"
        >
          <div class="relative z-10 py-1.5 font-medium leading-none">
            {{ child.title }}
          </div>
          <div
            class="absolute left-0 top-0 h-full w-0 bg-secondary transition-all duration-300 group-hover:w-full"
          ></div>
        </NuxtLink>
      </NavigationMenuLink>
    </li>
  </ul>
</template>
