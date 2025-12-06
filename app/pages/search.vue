<script setup lang="ts">
const showResultControl = ref(false)
const searchInputRef = ref<HTMLElement | null>(null)

const {
  listing,
  listingState,
  searchTerm,
  sortListing,
  filterListing,
  addFilterOption,
  removeFilterOption,
  resetFilter,
} = useProductSearch()

function handleSearchFocus() {
  nextTick(() => {
    if (searchInputRef.value) {
      const yOffset = -10 // Add some padding from the top
      const element = searchInputRef.value
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  })
}
</script>

<template>
  <div class="flex flex-col gap-6 pb-5 sm:pb-14">
    <div class="h-[360px]">
      <NuxtImg
        src="https://a.storyblok.com/f/282508/1024x1024/871dc9b656/orynt-hero.png"
        alt="Hero Image with a man in ski gear"
        class="h-full w-full object-cover"
      />
    </div>
  </div>
  <div class="mx-auto mb-12 max-w-7xl">
    <div ref="searchInputRef" class="px-2.5 pt-2 sm:hidden">
      <LayoutDrawerSearchInput @focus="handleSearchFocus" />
    </div>
    <h1 class="text-3xl font-bold">{{ $t('search.results') }}</h1>

    <div class="my-5 flex items-center justify-between px-5 md:px-0">
      <p>{{ $t('listing.counter', { count: listing?.total }) }}</p>

      <SearchControlSheet
        v-if="listing?.filter && false"
        v-model:open="showResultControl"
        :filters="listing.filter"
        :current-filter="listingState.filter ?? {}"
        :search-term="searchTerm"
        :total-results="listing?.total"
        @add-filter="addFilterOption"
        @remove-filter="removeFilterOption"
        @reset-filter="resetFilter"
        @filter-result="filterListing"
        @filter-with-and="filterListing"
        @filter-with-or="filterListing"
        @sort-result="sortListing"
      />
    </div>
    <div class="mx-auto mb-12 max-w-7xl">
      <div v-if="listing?.items" class="grid grid-cols-4 gap-4">
        <ProductCard v-for="product in listing?.items" :key="product.key" :product="product" />
      </div>
    </div>
  </div>
</template>
