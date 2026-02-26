<template>
  <div class="min-h-screen w-full">
    <div class="border-b px-6 py-4">
      <NuxtLinkLocale to="/" class="font-display text-xl font-semibold">
        {{ $t('navigation.title') }}
      </NuxtLinkLocale>
    </div>
    <main class="mx-auto max-w-6xl px-4 py-8">
      <slot />
    </main>
  </div>
</template>
