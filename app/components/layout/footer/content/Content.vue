<template>
  <div class="container mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 md:grid-cols-5">
    <div class="col-span-2 max-w-lg md:mb-0">
      <LayoutFooterContentNewsletterForm />
    </div>
    <div class="max-w-lg md:mb-0">
      <LayoutFooterContentAbout />
    </div>
    <div class="hidden md:block">
      <LayoutFooterContentSupport />
    </div>
    <div class="hidden md:block">
      <StorePicker />
    </div>
  </div>
</template>
