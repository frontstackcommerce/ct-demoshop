<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between">
      <StoreLogo :is-inverted="true" class="h-6" />
      <div class="hidden sm:block">
        <StorePicker inverted />
      </div>
      <div class="sm:hidden">
        <StorePicker inverted collapsed />
      </div>
    </div>
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-background/60">
      <div>{{ $t('footer.copyright') }}</div>
      <div class="flex items-center gap-6">
        <NuxtLinkLocale
          to="/content/privacy-policy"
          class="hover:text-background transition-colors duration-200"
        >
          {{ $t('footer.privacy') }}
        </NuxtLinkLocale>
        <NuxtLinkLocale
          to="/content/terms-of-service"
          class="hover:text-background transition-colors duration-200"
        >
          {{ $t('footer.terms') }}
        </NuxtLinkLocale>
      </div>
    </div>
  </div>
</template>
