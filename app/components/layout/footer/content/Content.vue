<template>
  <div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
    <!-- Newsletter - Takes more space -->
    <div class="lg:col-span-5">
      <LayoutFooterContentNewsletterForm />
    </div>

    <!-- Spacer -->
    <div class="hidden lg:col-span-1 lg:block" />

    <!-- Links -->
    <div class="lg:col-span-3">
      <LayoutFooterContentAbout />
    </div>

    <div class="lg:col-span-3">
      <LayoutFooterContentSupport />
    </div>
  </div>
</template>
