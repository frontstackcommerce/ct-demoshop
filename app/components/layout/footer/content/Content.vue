<template>
  <div
    class="container mx-auto grid max-w-7xl grid-cols-3 gap-4 px-6 sm:grid-cols-4 lg:grid-cols-5"
  >
    <div class="col-span-2 max-w-lg">
      <LayoutFooterContentNewsletterForm />
    </div>
    <div class="">
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
