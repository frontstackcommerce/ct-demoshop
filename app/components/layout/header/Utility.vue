<template>
  <div class="text-highlight-foreground bg-highlight h-8 items-center sm:grid sm:grid-cols-3">
    <div class="hidden sm:block"></div>
    <div class="flex h-full items-center justify-center text-center text-xs tracking-wide">
      {{ $t('header.teaser') }}
    </div>
    <div class="divide-border hidden h-full items-center justify-end divide-x text-xs sm:flex">
      <StorePicker>
        <StorePickerTrigger size="sm" collapsed />
      </StorePicker>
    </div>
  </div>
</template>
