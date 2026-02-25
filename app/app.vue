<template>
  <NuxtLayout>
    <NuxtPage />
    <ClientOnly>
      <Toaster :visible-toasts="1" position="bottom-right" />
    </ClientOnly>
  </NuxtLayout>
</template>
