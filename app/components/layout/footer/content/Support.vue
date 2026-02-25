<script setup lang="ts">
const { data: nav } = useNavContent()
const groups = computed(() => nav.value?.footer?.groups ?? [])
</script>

<template>
  <div v-for="group in groups" :key="group.title">
    <div class="font-display">{{ group.title }}</div>
    <div class="mt-4 flex flex-col gap-4 text-sm">
      <div class="flex flex-col gap-2">
        <NuxtLinkLocale
          v-for="link in group.links"
          :key="link.href"
          :to="link.href"
          class="text-shade-300 hover:text-inverted-foreground transition-colors duration-200"
          >{{ link.label }}</NuxtLinkLocale
        >
      </div>
    </div>
  </div>
</template>
