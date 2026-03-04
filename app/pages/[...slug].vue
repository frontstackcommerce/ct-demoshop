<script setup lang="ts">
const { data, type, status } = useFronticPage()
</script>

<template>
  <div class="min-h-screen">
    <template v-if="status === 'success'">
      <Product v-if="type === 'Product'" :product="data" />
      <Brand v-else-if="type === 'Brand'" :brand="data" />
      <Category v-else-if="type === 'Category'" :category="data" />
      <div v-else class="text-center">
        <Home />
      </div>
    </template>
    <template v-else-if="status === 'error'">
      <div class="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h1 class="font-serif text-3xl text-foreground">{{ $t('error.not-found.title') }}</h1>
        <p class="mt-4 text-muted-foreground">{{ $t('error.not-found.description') }}</p>
        <NuxtLink to="/">
          <Button class="mt-8" variant="outline">{{ $t('error.not-found.back') }}</Button>
        </NuxtLink>
      </div>
    </template>
  </div>
  <StoreSuggest />
</template>
