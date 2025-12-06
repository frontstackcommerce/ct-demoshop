<template>
  <div class="w-full">
    <div>
      <LayoutHeader />
    </div>
    <main class="mt-0">
      <slot />
    </main>
    <div>
      <LayoutFooter />
    </div>
    <LayoutDrawerNav />
  </div>
</template>
