<template>
  <div class="container mx-auto grid grid-cols-2 gap-4 px-6 md:grid-cols-4 md:px-0">
    <div class="col-span-2 mb-8 max-w-lg md:mb-0">
      <PageFooterContentNewsletterForm />
    </div>
    <div class="col-span-2 mb-8 max-w-lg md:mb-0">
      <StorePicker />
    </div>
    <div class="hidden md:block">
      <PageFooterContentAbout />
    </div>
    <div class="hidden md:block">
      <PageFooterContentSupport />
    </div>
  </div>
</template>
