<script setup lang="ts">
const aboutTree = ref([
  {
    label: 'About',
    href: '/about',
  },
])
</script>

<template>
  <div class="flex flex-col gap-3 text-lg font-medium md:gap-1">
    <NuxtLink v-for="(link, index) in aboutTree" :key="index" :to="link.href" class="">{{
      link.label
    }}</NuxtLink>
  </div>
</template>
