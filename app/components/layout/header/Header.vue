<script setup lang="ts">
const route = useRoute()

const isHomepage = computed(() => route.path === '/')
</script>

<template>
  <header>
    <div>
      <LayoutHeaderUtility />
    </div>
    <div class="sm:hidden">
      <StoreLogo
        :grow="isHomepage"
        has-backdrop
        :is-inverted="isHomepage"
        class="transition-colors duration-300"
      />
    </div>
    <div class="hidden sm:block">
      <LayoutNavbar />
    </div>
  </header>
</template>
