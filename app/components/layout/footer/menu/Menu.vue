<script setup lang="ts">
const { footerCategories } = useMenu()
</script>

<template>
  <div class="container mx-auto grid grid-cols-4 gap-4 px-6 md:px-0">
    <div v-for="(item, index) in footerCategories" :key="index">
      <div class="font-medium">{{ item.label }}</div>
      <div class="mt-4 flex flex-col gap-2">
        <NuxtLink
          v-for="(child, _index) in item.children"
          :key="_index"
          :to="child.href"
          class="text-sm font-normal text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >{{ child.label }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
