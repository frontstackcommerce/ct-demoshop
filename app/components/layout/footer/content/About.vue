<script setup lang="ts">
const { aboutTree } = useShopMenu()
</script>

<template>
  <div class="font-normal">{{ $t('footer.menu.about.title') }}</div>
  <div class="mt-4 flex flex-col gap-4 text-sm">
    <div class="flex flex-col gap-2">
      <NuxtLink
        v-for="item in aboutTree || []"
        :key="item.key"
        :to="item.link?.path"
        class="text-shade-300 hover:text-inverted-foreground transition-colors duration-200"
        >{{ item.name }}</NuxtLink
      >
    </div>
  </div>
</template>
