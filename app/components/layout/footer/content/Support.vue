<script setup lang="ts">
const { supportTree } = useShopMenu()
</script>

<template>
  <div class="font-display">{{ $t('footer.menu.support.title') }}</div>
  <div class="mt-4 flex flex-col gap-4 text-sm">
    <div class="flex flex-col gap-2">
      <NuxtLinkLocale
        v-for="item in supportTree"
        :key="item.key"
        :to="item.link?.path"
        class="text-shade-300 hover:text-inverted-foreground transition-colors duration-200"
        >{{ item.name }}</NuxtLinkLocale
      >
    </div>
  </div>
</template>
