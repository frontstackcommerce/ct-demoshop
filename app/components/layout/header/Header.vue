<script setup lang="ts">
const route = useRoute()

const isHomepage = computed(() => route.path === '/')
</script>

<template>
  <header>
    <div>
      <PageHeaderUtility />
    </div>
    <div class="absolute left-4 top-12 sm:hidden">
      <SharedLogo
        :grow="isHomepage"
        has-backdrop
        :is-inverted="isHomepage"
        class="transition-colors duration-300"
      />
    </div>
    <div class="absolute left-0 right-0 top-12 hidden sm:block">
      <PageNavbar />
    </div>
  </header>
</template>
