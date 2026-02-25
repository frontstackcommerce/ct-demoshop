<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void
}>()

const { t } = useI18n()
const { closeMenu } = useShopMenu()

const close = () => {
  emit('close')
  closeMenu()
}

const suggestions = t('search.suggestions').split(',')

const { listing, searchTerm } = useProductSearch()
</script>

<template>
  <div class="mt-4 px-4">
    <LayoutDrawerSearchInput />
  </div>

  <div class="my-2 px-4 text-sm sm:text-base md:my-2">
    <span v-if="searchTerm.length > 0 && searchTerm.length < 3">
      {{ $t('search.total', { count: listing?.total }) }}
    </span>
    <span v-else-if="searchTerm.length > 0 && listing?.items && listing.items.length > 0">
      {{ $t('search.counter', { count: listing?.total, term: searchTerm }) }}
    </span>
    <span v-else>
      <span v-if="searchTerm.length > 2">
        {{ $t('search.no-results', { term: searchTerm }) }}
      </span>
    </span>
  </div>

  <div class="flex flex-col gap-6">
    <ScrollArea class="h-[calc(100vh)] md:h-[calc(100vh-10rem)]">
      <div v-if="!searchTerm.length" class="px-4">
        <div class="font-display mb-3 text-lg md:text-2xl">{{ $t('search.suggest') }}</div>
        <div class="flex flex-wrap gap-2">
          <Button
            v-for="suggestion in suggestions"
            :key="suggestion"
            variant="outline"
            color="primary"
            class="font-display flex items-center gap-2 font-light capitalize"
            @click="searchTerm = suggestion"
          >
            {{ suggestion }}
          </Button>
        </div>
      </div>
      <div v-else class="px-4 pb-60 md:pb-48">
        <div class="font-display mb-3 text-lg md:text-2xl">{{ $t('search.results') }}</div>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
          <template v-if="listing?.items && listing?.items.length > 0">
            <ProductCard
              v-for="(product, index) in listing?.items"
              :key="index"
              :product="product"
              @click="close"
            />
          </template>
          <ProductCardSkeleton v-for="index in 5" v-else :key="index" />
        </div>
        <NuxtLinkLocale
          v-if="listing?.items && listing?.items.length > 0"
          to="/search"
          class="mt-8 flex w-full justify-center"
        >
          <Button color="secondary" @click="close">
            {{ $t('search.search-listing', { count: listing?.total }) }}
          </Button>
        </NuxtLinkLocale>
      </div>
    </ScrollArea>
  </div>
</template>
