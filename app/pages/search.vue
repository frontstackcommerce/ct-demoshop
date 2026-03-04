<script setup lang="ts">
const showResultControl = ref(false)
const searchInputRef = ref<HTMLElement | null>(null)

const { result, state, searchTerm, sortResult, filterResult, resetFilter } = useFronticSearch(
  'ProductSearch',
  {},
)
const { hideNavMenu } = useShopNav()

// Hide/show nav menu when sheet opens/closes
watch(showResultControl, (isOpen) => {
  hideNavMenu.value = isOpen
})

// Wrapper functions to handle string-to-typed conversions from UI components
function handleResetFilter(filterField?: string) {
  resetFilter(filterField as any)
}

function handleFilterResult(filterField: string, filterOptions: string[]) {
  filterResult(filterField as any, filterOptions as any)
}

function handleSortResult(sortBy: string) {
  sortResult(sortBy as any)
}

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
  <div class="flex flex-col gap-6 pb-5">
    <div class="h-48 md:h-[360px]">
      <NuxtImg
        src="https://a.storyblok.com/f/282508/1024x1024/871dc9b656/orynt-hero.png"
        alt="Hero Image with a man in ski gear"
        height="360"
        class="h-full w-full object-cover"
      />
    </div>
  </div>
  <div class="mx-auto max-w-6xl px-5">
    <div ref="searchInputRef" class="mx-auto my-5 sm:my-10 sm:max-w-2/3">
      <LayoutDrawerSearchInput @focus="handleSearchFocus" />
    </div>
    <div class="flex items-center justify-between">
      <h1 class="font-display text-xl font-light sm:text-3xl">
        {{ $t('search.results') }} ({{ state.available.count.result }})
      </h1>
      <SearchControlSheet
        v-model:open="showResultControl"
        :available-filters="state.available.filter ?? []"
        :available-sorts="state.available.sorting ?? []"
        :current-filter="state.active.filter ?? {}"
        :search-term="searchTerm"
        :total-results="state.available.count.result ?? 0"
        :active-filter-count="state.active.count.filter ?? 0"
        @reset-filter="handleResetFilter"
        @filter-result="handleFilterResult"
        @sort-result="handleSortResult"
        @update-search="searchTerm = String($event).trim()"
        @close-control="showResultControl = false"
      />
    </div>

    <div v-if="result?.items" class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <ProductCard v-for="product in result?.items" :key="product.key" :product="product" />
    </div>
  </div>
</template>
