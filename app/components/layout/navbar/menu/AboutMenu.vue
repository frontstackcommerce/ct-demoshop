<script setup lang="ts">
const { data: nav } = useNavContent()
const aboutLinks = computed(() => nav.value?.about?.links ?? [])
</script>

<template>
  <div class="flex flex-col gap-3 text-lg font-light md:gap-1">
    <NuxtLinkLocale v-for="link in aboutLinks" :key="link.href" :to="link.href">{{
      link.label
    }}</NuxtLinkLocale>
  </div>
</template>
