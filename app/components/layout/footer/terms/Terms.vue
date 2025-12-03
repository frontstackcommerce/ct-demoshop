<template>
  <div class="container mx-auto flex items-end justify-between px-6 md:px-0">
    <div class="flex flex-col gap-2">
      <!-- <img src="~/assets/images/layout/logo-text-inverted.svg" alt="Logo" class="w-24" /> -->
      <SharedLogo :is-inverted="true" />
      <div class="text-sm">{{ $t('footer.copyright') }}</div>
    </div>
    <div>
      <div
        class="flex flex-col gap-2 divide-border text-sm text-shade-300 md:flex-row md:gap-0 md:divide-x"
      >
        <NuxtLink
          to="/privacy-policy"
          class="px-3 transition-colors duration-200 hover:text-inverted-foreground"
          >{{ $t('footer.privacy') }}</NuxtLink
        >
        <NuxtLink
          to="/terms-of-service"
          class="px-3 transition-colors duration-200 hover:text-inverted-foreground"
          >{{ $t('footer.terms') }}</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
