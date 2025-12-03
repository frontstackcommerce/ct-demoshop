<script setup lang="ts">
const { aboutMenu } = useMenu()
</script>

<template>
  <div class="flex flex-col gap-3 text-lg font-medium md:gap-1">
    <NuxtLink v-for="(link, index) in aboutMenu" :key="index" :to="link.href" class="">{{
      link.label
    }}</NuxtLink>
  </div>
</template>
