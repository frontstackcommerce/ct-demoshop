<template>
  <div class="bg-foreground text-background h-10 items-center sm:grid sm:grid-cols-3">
    <div class="hidden sm:block" />
    <div class="flex h-full items-center justify-center text-center text-xs tracking-wider font-light">
      {{ $t('header.teaser') }}
    </div>
    <div class="hidden h-full items-center justify-end pr-6 text-xs sm:flex">
      <StorePicker>
        <StorePickerTrigger size="sm" collapsed />
      </StorePicker>
    </div>
  </div>
</template>
