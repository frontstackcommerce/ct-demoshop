<script setup lang="ts">
const { page, status } = usePageRouter()
</script>

<template>
  <div class="min-h-screen">
    <template v-if="status === 'success'">
      <Product v-if="page && page.type === 'Product'" :product="page.data" />
      <Brand v-else-if="page && page.type === 'Brand'" :brand="page.data" />
      <Category v-else-if="page && page.type === 'Category'" :category="page.data" />
      <div v-else class="text-center">
        <h1 class="text-3xl font-bold text-gray-900">Commerce Starter</h1>
        <p class="mt-4 text-gray-600">Start selling online today</p>
      </div>
    </template>
    <template v-else-if="status === 'error'">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900">Error</h1>
        <p class="mt-4 text-gray-600">An error occurred while loading the page</p>
      </div>
    </template>
  </div>
  <p>
    <span class="block sm:hidden">XS</span><span class="hidden sm:block md:hidden">SM</span
    ><span class="hidden md:block lg:hidden">MD</span
    ><span class="hidden lg:block xl:hidden">LG</span
    ><span class="hidden xl:block 2xl:hidden">XL</span><span class="hidden 2xl:block">2XL</span>
  </p>
  <StoreSuggest />
</template>
