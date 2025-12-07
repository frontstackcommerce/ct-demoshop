<script setup lang="ts">
import { Toaster } from 'vue-sonner'

import { PiniaColadaDevtools } from '@pinia/colada-devtools'
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <ClientOnly>
      <Toaster :visible-toasts="1" />
    </ClientOnly>
  </NuxtLayout>
  <PiniaColadaDevtools />
</template>
