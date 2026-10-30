<script setup lang="ts">
import { Package } from 'lucide-vue-next'

const props = defineProps<{
  category: CategoryFull
}>()

const { t } = useI18n()

const searchParams = { categoryKey: props.category.key }

const { result, state, sortResult, filterResult, resetFilter, searchTerm } = useFronticSearch(
  'ProductSearch',
  searchParams,
  {
    filter: {
      select: [
        'properties.finish-label',
        'properties.search-color',
        'properties.size',
        'properties.manufacturer',
      ] as any,
      label: {
        'properties.finish-label': t('listing.filters.finish-label'),
        'properties.search-color': t('listing.filters.search-color'),
        'properties.size': t('listing.filters.size'),
        'properties.manufacturer': t('listing.filters.manufacturer'),
      } as any,
    },
    sorting: {
      label: {
        'default': t('control.sort.options.default'),
        'name:asc': t('control.sort.options.name-asc'),
        'name:desc': t('control.sort.options.name-desc'),
        'price.amount:asc': t('control.sort.options.price-asc'),
        'price.amount:desc': t('control.sort.options.price-desc'),
      } as any,
    },
  },
)

// TODO: Replace this workaround with `loadNext` or `paginate('next')` once
// frontic-nuxt#86 (loadNext cache key mismatch) and frontic-nuxt#87 (paginate
// doesn't update result ref) are fixed. Then remove useFronticClient, extraItems,
// loadingMore, and the reset watcher below.
const client = useFronticClient()
const extraItems = ref<ProductCard[]>([])
const allItems = computed(() => [...(result.value?.items || []), ...extraItems.value])
const nextPage = computed(() => result.value?.page?.next)
const loadingMore = ref(false)

async function handleLoadMore() {
  const page = nextPage.value ?? state.value.active.page + 1
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

// Reset extra items when filters/sort/search change
watch(
  () => [state.value.active.filter, state.value.active.sorting, state.value.active.search],
  () => {
    extraItems.value = []
  },
  { deep: true },
)

const { listing: categoryMeta } = useFronticListing('CategoryMeta', {
  categoryKeys: [props.category.key],
})

const meta = computed(() => categoryMeta.value?.item)
const showControl = ref(false)

async function handleResetFilter(filterField?: string) {
  accumulatedItems.value = []
  await resetFilter(filterField as any)
}

async function handleFilterResult(filterField: string, filterOptions: string[]) {
  accumulatedItems.value = []
  await filterResult(filterField as any, filterOptions as any)
}

async function handleSortResult(sortBy: string) {
  accumulatedItems.value = []
  await sortResult(sortBy as any)
}

function handleScrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div>
    <CategoryContent :category="category" :meta="meta" />

    <div class="container mx-auto max-w-7xl px-6 py-12 lg:px-12 lg:py-20">
      <div
        class="flex flex-col justify-between gap-4 border-b border-border pb-8 sm:flex-row sm:items-center"
      >
        <div class="flex items-center gap-6">
          <p v-if="allItems.length" class="text-sm text-muted-foreground">
            {{
              $t('control.pagination.showed', {
                count: allItems.length,
                total: state.available.count.result || 0,
              })
            }}
          </p>
        </div>
        <SearchControlSheet
          v-model:open="showControl"
          :category="category.name"
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
          @close-control="showControl = false"
        />
      </div>

      <div v-if="allItems.length > 0" class="pt-12">
        <ProductGrid :products="allItems" :columns="4" />

        <div class="py-12">
          <SearchControlPagination
            :loaded-items="allItems.length"
            :total-items="state.available.count.result"
            :has-next-page="state.available.nextPage"
            :filter-count="state.active.count.filter"
            @load-more="handleLoadMore"
            @filter-result="showControl = true"
            @scroll-top="handleScrollTop"
          />
        </div>
      </div>

      <div v-else class="flex flex-col items-center justify-center py-32 text-center">
        <div class="mb-8 flex size-24 items-center justify-center rounded-full bg-warm-100">
          <Package class="size-12 text-muted-foreground/50" />
        </div>
        <h3 class="mb-3 font-serif text-2xl text-foreground">
          {{ $t('listing.counter', { count: 0 }) }}
        </h3>
        <p class="mb-8 max-w-md font-light text-muted-foreground">
          {{ $t('error.not-found.description') }}
        </p>
        <Button
          variant="outline"
          class="h-12 border-foreground/20 px-8 text-sm font-medium uppercase tracking-wide hover:border-foreground hover:bg-transparent"
          @click="handleResetFilter()"
        >
          {{ $t('control.reset') }}
        </Button>
      </div>
    </div>
  </div>
</template>
