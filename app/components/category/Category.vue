<script setup lang="ts">
const props = defineProps<{
  category: CategoryFull
}>()

const showRefineSheet = ref(false)
const { hideNavMenu } = useShopNav()

// Hide/show nav menu when sheet opens/closes
watch(showRefineSheet, (isOpen) => {
  hideNavMenu.value = isOpen
})

const { result, status, state, searchTerm, sortResult, filterResult, resetFilter } =
  useFronticSearch('ProductSearch', {
    categoryKey: props.category.key,
  })
</script>

<template>
  <CategoryContent :category="category" />
  <div class="mx-auto my-12 max-w-6xl px-5">
    <div class="flex items-center justify-between">
      <h1 class="font-display text-3xl font-light">{{ category.name }}</h1>
      <SearchRefineSheet
        v-model:open="showRefineSheet"
        :state="state"
        :search-term="searchTerm"
        :category="category.name"
        @reset="resetFilter($event as any)"
        @filter="(field: string, options: string[]) => filterResult(field as any, options as any)"
        @sort="(sortBy: string) => sortResult(sortBy as any)"
        @search="(newTerm: string | number) => (searchTerm = String(newTerm).trim())"
        @close="showRefineSheet = false"
      />
    </div>
    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <template v-if="status === 'pending'">
        <ProductCardSkeleton v-for="index in 6" :key="index" />
      </template>
      <template v-else-if="status === 'success' && result?.items?.length">
        <ProductCard v-for="product in result.items" :key="product.key" :product="product" />
      </template>
    </div>
  </div>
</template>
