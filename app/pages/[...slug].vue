<script setup lang="ts">
const { data, type, status } = useFronticPage()
</script>

<template>
  <div class="min-h-screen">
    <template v-if="status === 'success'">
      <Product v-if="data && type === 'Product'" :product="data" />
      <Brand v-else-if="data && type === 'Brand'" :brand="data" />
      <Category v-else-if="data && type === 'Category'" :category="data" />
      <div v-else class="text-center">
        <Home />
      </div>
    </template>
    <template v-else-if="status === 'error'">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900">Error</h1>
        <p class="mt-4 text-gray-600">An error occurred while loading the page</p>
      </div>
    </template>
  </div>
  <!-- <p>
    <span class="block sm:hidden">XS</span><span class="hidden sm:block md:hidden">SM</span
    ><span class="hidden md:block lg:hidden">MD</span
    ><span class="hidden lg:block xl:hidden">LG</span
    ><span class="hidden xl:block 2xl:hidden">XL</span><span class="hidden 2xl:block">2XL</span>
  </p> -->
  <StoreSuggest />
</template>
