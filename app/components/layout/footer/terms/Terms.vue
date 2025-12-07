<template>
  <div class="container mx-auto flex max-w-7xl flex-col gap-5 px-5">
    <div class="flex items-center justify-between">
      <StoreLogo :is-inverted="true" />
      <div class="mr-3">
        <StorePicker />
      </div>
    </div>
    <div class="flex items-center justify-between">
      <div class="text-sm">{{ $t('footer.copyright') }}</div>
      <div
        class="divide-border text-shade-300 flex flex-col gap-2 text-sm md:flex-row md:gap-0 md:divide-x"
      >
        <NuxtLinkLocale
          to="/content/privacy-policy"
          class="hover:text-inverted-foreground px-3 transition-colors duration-200"
          >{{ $t('footer.privacy') }}</NuxtLinkLocale
        >
        <NuxtLinkLocale
          to="/content/terms-of-service"
          class="hover:text-inverted-foreground px-3 transition-colors duration-200"
          >{{ $t('footer.terms') }}</NuxtLinkLocale
        >
      </div>
    </div>
  </div>
</template>
