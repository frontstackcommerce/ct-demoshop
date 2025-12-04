<script setup lang="ts">
const route = useRoute()

const slug = computed(() => {
  if (route.fullPath === '/') {
    return ''
  }
  if (route.fullPath) {
    return route.fullPath
  }
  return ''
})

const { page } = usePageRouter(slug)
</script>

<template>
  <Product v-if="page && page.type === 'Product'" :product="page.data" />
  <Brand v-else-if="page && page.type === 'Brand'" :brand="page.data" />
  <Category v-else-if="page && page.type === 'Category'" :category="page.data" />
  <div v-else class="text-center">
    <h1 class="text-3xl font-bold text-gray-900">Commerce Starter</h1>
    <p class="mt-4 text-gray-600">Start selling online today</p>
  </div>
</template>
