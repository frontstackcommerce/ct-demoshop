<script setup lang="ts">
const route = useRoute()

const page = computed(() => (route.params.page ? route.params.page[0]?.replace('-', ' ') : ''))
</script>

<template>
  <div class="container mx-auto min-h-screen max-w-7xl">
    <h1 class="font-display mt-20 text-3xl font-light capitalize">{{ page }}</h1>
  </div>
</template>
