<script setup lang="ts">
const route = useRoute()

const isHomepage = computed(() => route.path === '/')
</script>

<template>
  <header>
    <div>
      <LayoutHeaderUtility />
    </div>
    <div class="absolute top-12 left-4 sm:hidden">
      <Logo
        :grow="isHomepage"
        has-backdrop
        :is-inverted="isHomepage"
        class="transition-colors duration-300"
      />
    </div>
    <div class="absolute top-12 right-0 left-0 hidden sm:block">
      <LayoutNavbar />
    </div>
  </header>
</template>
