<script setup lang="ts">
const { aboutTree } = useShopMenu()
</script>

<template>
  <div class="flex flex-col gap-3 text-lg font-medium md:gap-1">
    <NuxtLink v-for="(link, index) in aboutTree" :key="index" :to="link.link?.path" class="">{{
      link.name
    }}</NuxtLink>
  </div>
</template>
