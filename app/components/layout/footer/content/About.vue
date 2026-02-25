<script setup lang="ts">
const { data: nav } = useNavContent()
</script>

<template>
  <div v-if="nav.about">
    <div class="font-display">{{ nav.about.title }}</div>
    <div class="mt-4 flex flex-col gap-4 text-sm">
      <div class="flex flex-col gap-2">
        <NuxtLinkLocale
          v-for="link in nav.about.links"
          :key="link.href"
          :to="link.href"
          class="text-shade-300 hover:text-inverted-foreground transition-colors duration-200"
          >{{ link.label }}</NuxtLinkLocale
        >
      </div>
    </div>
  </div>
</template>
