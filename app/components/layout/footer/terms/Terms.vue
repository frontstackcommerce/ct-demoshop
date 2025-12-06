<template>
  <div class="container mx-auto flex items-end justify-between px-6 md:px-0">
    <div class="flex flex-col gap-2">
      <!-- <NuxtImg src="~/assets/images/layout/logo-text-inverted.svg" alt="Logo" class="w-24" /> -->
      <StoreLogo :is-inverted="true" />
      <div class="text-sm">{{ $t('footer.copyright') }}</div>
    </div>
    <div>
      <div
        class="divide-border text-shade-300 flex flex-col gap-2 text-sm md:flex-row md:gap-0 md:divide-x"
      >
        <NuxtLink
          to="/privacy-policy"
          class="hover:text-inverted-foreground px-3 transition-colors duration-200"
          >{{ $t('footer.privacy') }}</NuxtLink
        >
        <NuxtLink
          to="/terms-of-service"
          class="hover:text-inverted-foreground px-3 transition-colors duration-200"
          >{{ $t('footer.terms') }}</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
