<template>
  <div class="h-10 items-center bg-foreground text-background sm:grid sm:grid-cols-3">
    <div class="hidden sm:block" />
    <div
      class="flex h-full items-center justify-center text-center text-xs font-light tracking-wider"
    >
      {{ $t('header.teaser') }}
    </div>
    <div class="hidden h-full items-center justify-end pr-6 text-xs sm:flex">
      <StorePicker inverted collapsed />
    </div>
  </div>
</template>
