<script setup lang="ts">
const { locale } = useI18n()
const showRefine = ref(false)
const searchInputRef = ref<HTMLElement | null>(null)

const { result, state, searchTerm, sortResult, filterResult, resetFilter } = useFronticSearch(
  'ProductSearch',
  {},
)
const { hideNavMenu } = useShopNav()

const homeCollection = computed(() => `home_${locale.value}`)
const { data: homeContent } = await useAsyncData(`home-search-${locale.value}`, () =>
  queryCollection(homeCollection.value as any).first(),
)

// Hide/show nav menu when sheet opens/closes
watch(showRefine, (isOpen) => {
  hideNavMenu.value = isOpen
})

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
        :src="homeContent?.search?.image"
        :alt="$t('search.results')"
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
      <SearchRefineRefineSheet
        v-model:open="showRefine"
        :state="state"
        :search-term="searchTerm"
        @reset="resetFilter($event as any)"
        @filter="(field: string, options: string[]) => filterResult(field as any, options as any)"
        @sort="sortResult($event)"
        @search="searchTerm = String($event).trim()"
        @close="showRefine = false"
      />
    </div>

    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <template v-if="!result?.items">
        <ProductCardSkeleton v-for="i in 8" :key="i" />
      </template>
      <template v-else>
        <ProductCard v-for="product in result.items" :key="product.key" :product="product" />
      </template>
    </div>
  </div>
</template>
