<script setup lang="ts">
const { aboutTree } = useShopMenu()
</script>

<template>
  <div>
    <h4 class="text-sm font-medium text-foreground tracking-wide uppercase mb-6">
      {{ $t('footer.menu.about.title') }}
    </h4>
    <ul class="space-y-3">
      <li v-for="item in aboutTree || []" :key="item.key">
        <NuxtLinkLocale
          :to="item.link?.path"
          class="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 link-underline"
        >
          {{ item.name }}
        </NuxtLinkLocale>
      </li>
    </ul>
  </div>
</template>
