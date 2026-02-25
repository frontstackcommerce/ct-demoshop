<script setup lang="ts">
const { data: nav } = useNavContent()
</script>

<template>
  <div class="container mx-auto flex max-w-7xl flex-col gap-5 px-5">
    <div class="flex items-center justify-between">
      <LayoutStoreLogo :is-inverted="true" class="max-h-10 max-w-60" />
      <div class="mr-3 hidden sm:block">
        <LayoutStorePicker inverted />
      </div>
      <div class="mr-3 sm:hidden">
        <LayoutStorePicker inverted collapsed />
      </div>
    </div>
    <div class="flex items-center justify-between">
      <div class="text-sm">{{ $t('footer.copyright') }}</div>
      <div
        class="divide-border text-shade-300 flex flex-col gap-2 text-sm md:flex-row md:gap-0 md:divide-x"
      >
        <NuxtLinkLocale
          v-for="link in nav?.footer?.legalLinks"
          :key="link.href"
          :to="link.href"
          class="hover:text-inverted-foreground px-3 transition-colors duration-200"
          >{{ link.label }}</NuxtLinkLocale
        >
      </div>
    </div>
  </div>
</template>
