<script setup lang="ts">
const { supportMenu } = useShopMenu()
</script>

<template>
  <div class="font-normal">{{ $t('footer.menu.support.title') }}</div>
  <div class="mt-4 flex flex-col gap-4 text-sm">
    <div class="flex flex-col gap-2">
      <NuxtLink
        v-for="(link, index) in supportMenu"
        :key="index"
        :to="link.href"
        class="text-shade-300 hover:text-inverted-foreground transition-colors duration-200"
        >{{ link.label }}</NuxtLink
      >
    </div>
  </div>
</template>
