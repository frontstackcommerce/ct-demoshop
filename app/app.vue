<script setup lang="ts">
import { Toaster } from 'vue-sonner'
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <ClientOnly>
      <Toaster :visible-toasts="1" />
    </ClientOnly>
  </NuxtLayout>
</template>
