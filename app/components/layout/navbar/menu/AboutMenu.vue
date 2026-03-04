<script setup lang="ts">
const { aboutTree } = useShopMenu()
</script>

<template>
  <div class="flex flex-col gap-3">
    <NuxtLink
      v-for="item in aboutTree"
      :key="item.key"
      :to="item.link?.path"
      class="text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      {{ item.name }}
    </NuxtLink>
  </div>
</template>
