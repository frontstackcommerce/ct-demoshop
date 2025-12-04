<script setup lang="ts">
const { isHomepage } = useNavigation()
</script>

<template>
  <header>
    <div>
      <PageHeaderUtility />
    </div>
    <div class="absolute top-12 left-4">
      <Logo
        :grow="isHomepage"
        has-backdrop
        :is-inverted="isHomepage"
        class="transition-colors duration-300"
      />
    </div>
  </header>
</template>
