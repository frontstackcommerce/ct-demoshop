<script setup lang="ts">
defineProps<{
  categories: CategoryNestedChilds
}>()
</script>

<template>
  <ul v-if="categories?.items && categories?.items.length > 0" class="mt-4 flex flex-col">
    <li v-for="child in categories?.items" :key="child.key">
      <NavigationMenuLink as-child>
        <NuxtLink
          :to="child.link?.path"
          class="group relative inline-block overflow-hidden transition-all duration-300 hover:scale-105"
        >
          <div class="relative z-10 py-1.5 leading-none font-light">
            {{ child.name }}
          </div>
          <div
            class="absolute bottom-0 left-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-full"
          ></div>
        </NuxtLink>
      </NavigationMenuLink>
    </li>
  </ul>
</template>
