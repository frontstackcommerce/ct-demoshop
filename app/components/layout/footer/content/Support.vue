<script setup lang="ts">
const { supportTree } = useShopMenu()
</script>

<template>
  <div>
    <h4 class="mb-6 text-sm font-medium tracking-wide text-foreground uppercase">
      {{ $t('footer.menu.support.title') }}
    </h4>
    <ul class="space-y-3">
      <li v-for="item in supportTree" :key="item.key">
        <NuxtLinkLocale
          :to="item.link?.path"
          class="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          {{ item.name }}
        </NuxtLinkLocale>
      </li>
    </ul>
  </div>
</template>
