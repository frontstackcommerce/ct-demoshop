<script setup lang="ts">
const showResultControl = ref(false)
const searchInputRef = ref<HTMLElement | null>(null)

const { data, state, searchTerm, sortItems, filterItems, addFilter, removeFilter, resetFilter } =
  useProductSearch()

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

// Event handlers for ControlSheet
function handleFilterResult(filterField: string, filterOptions: any[]) {
  filterItems(filterField, filterOptions)
}

function handleResetFilter(filterField?: string) {
  resetFilter(filterField)
}

function handleSortResult(sortBy: string) {
  sortItems(sortBy)
}

function handleUpdateSearch(term: string | number) {
  searchTerm.value = String(term)
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
      <p>{{ $t('listing.counter', { count: state.total }) }}</p>

      <SearchControlSheet
        v-model:open="showResultControl"
        :available-filters="state.availableFilters ?? []"
        :available-sorts="state.availableSorts ?? []"
        :current-filter="state.filter ?? {}"
        :search-term="searchTerm"
        :total-results="state.total ?? 0"
        :active-filter-count="state.activeFilterCount ?? 0"
        @reset-filter="handleResetFilter"
        @filter-result="handleFilterResult"
        @sort-result="handleSortResult"
        @update-search="handleUpdateSearch"
        @close-control="showResultControl = false"
      />
    </div>
    <div class="mx-auto mb-12 max-w-7xl">
      <div v-if="data?.items" class="grid grid-cols-4 gap-4">
        <ProductCard v-for="product in data?.items" :key="product.key" :product="product" />
      </div>
    </div>
  </div>
</template>
