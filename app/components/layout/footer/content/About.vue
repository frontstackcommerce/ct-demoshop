<script setup lang="ts">
const { aboutTree } = useShopMenu()
</script>

<template>
  <div>
    <h4 class="text-foreground mb-6 text-sm font-medium tracking-wide uppercase">
      {{ $t('footer.menu.about.title') }}
    </h4>
    <ul class="space-y-3">
      <li v-for="item in aboutTree || []" :key="item.key">
        <NuxtLinkLocale
          :to="item.link?.path"
          class="text-muted-foreground hover:text-foreground link-underline text-sm transition-colors duration-200"
        >
          {{ item.name }}
        </NuxtLinkLocale>
      </li>
    </ul>
  </div>
</template>
