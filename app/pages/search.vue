<script setup lang="ts">
const showResultControl = ref(false)
const searchInputRef = ref<HTMLElement | null>(null)

const searchParams = {}

const { result, state, searchTerm, sortResult, filterResult, resetFilter } =
  useFronticSearch('ProductSearch', searchParams)

// TODO: Replace this workaround with `loadNext` or `paginate('next')` once
// frontic-nuxt#86 (loadNext cache key mismatch) and frontic-nuxt#87 (paginate
// doesn't update result ref) are fixed. Then remove useFronticClient, extraItems,
// loadingMore, and the reset watcher below.
const client = useFronticClient()
const extraItems = ref<ProductCard[]>([])
const allItems = computed(() => [...(result.value?.items || []), ...extraItems.value])
const loadingMore = ref(false)

async function handleLoadMore() {
  const page = result.value?.page?.next ?? state.value.active.page + 1
  if (loadingMore.value) return
  loadingMore.value = true
  try {
    const query: any = { page, filter: state.value.active.filter }
    if (state.value.active.sorting) query.sort = state.value.active.sorting
    if (state.value.active.search) query.search = state.value.active.search
    const response = await client.listing('ProductSearch', searchParams, { query })
    if (response?.items?.length) {
      extraItems.value = [...extraItems.value, ...response.items]
      if (!response.page?.next) {
        state.value.available.nextPage = false
      }
    }
  } finally {
    loadingMore.value = false
  }
}

const { hideNavMenu } = useShopNav()

watch(showResultControl, (isOpen) => {
  hideNavMenu.value = isOpen
})

// Reset extra items when filters/sort/search change
watch(
  () => [state.value.active.filter, state.value.active.sorting, state.value.active.search],
  () => {
    extraItems.value = []
  },
  { deep: true },
)

function handleResetFilter(filterField?: string) {
  extraItems.value = []
  resetFilter(filterField as any)
}

function handleFilterResult(filterField: string, filterOptions: string[]) {
  extraItems.value = []
  filterResult(filterField as any, filterOptions as any)
}

function handleSortResult(sortBy: string) {
  extraItems.value = []
  sortResult(sortBy as any)
}

function handleScrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleSearchFocus() {
  nextTick(() => {
    if (searchInputRef.value) {
      const yOffset = -10
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
        alt="Search hero"
        height="360"
        class="h-full w-full object-cover"
      />
    </div>
  </div>
  <div class="mx-auto max-w-6xl px-5">
    <div ref="searchInputRef" class="mx-auto my-5 sm:my-10 sm:max-w-2/3">
      <LayoutDrawerSearchInput v-model="searchTerm" @focus="handleSearchFocus" />
    </div>
    <div class="flex items-center justify-between">
      <h1 class="font-serif text-xl font-light sm:text-3xl">
        {{ $t('search.results') }} ({{ state.available.count.result }})
      </h1>
      <SearchControlSheet
        v-model:open="showResultControl"
        :available-filters="state.available.filter"
        :available-sorts="state.available.sorting"
        :current-filter="state.active.filter"
        :search-term="searchTerm"
        :total-results="state.available.count.result"
        :active-filter-count="state.active.count.filter"
        @reset-filter="handleResetFilter"
        @filter-result="handleFilterResult"
        @sort-result="handleSortResult"
        @update-search="searchTerm = String($event).trim()"
        @close-control="showResultControl = false"
      />
    </div>

    <div v-if="allItems.length" class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <ProductCard v-for="product in allItems" :key="product.key" :product="product" />
    </div>

    <div v-if="allItems.length > 0" class="py-12">
      <SearchControlPagination
        :loaded-items="allItems.length"
        :total-items="state.available.count.result"
        :has-next-page="state.available.nextPage"
        :filter-count="state.active.count.filter"
        @load-more="handleLoadMore"
        @filter-result="showResultControl = true"
        @scroll-top="handleScrollTop"
      />
    </div>
  </div>
</template>
