<script setup lang="ts">
const { isHomepage } = useNavigation()
</script>

<template>
  <header>
    <div>
      <PageHeaderUtility />
    </div>
    <div class="absolute left-4 top-12">
      <SharedLogo
        :grow="isHomepage"
        has-backdrop
        :is-inverted="isHomepage"
        class="transition-colors duration-300"
      />
    </div>
  </header>
</template>
