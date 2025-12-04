<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void
}>()

const { t } = useI18n()
const { closeMenu } = useMenu()

const close = () => {
  emit('close')
  closeMenu()
}

const suggestions = t('search.suggestions').split(',')

const { listing, searchTerm } = useProductSearch()
</script>

<template>
  <div class="md:mt-4">
    <PageDrawerSearchInput />
  </div>

  <div class="md:my-2">
    <span v-if="searchTerm.length > 0 && searchTerm.length < 3" class="px-3 pt-3">
      {{ $t('search.total', { count: listing?.total }) }}
    </span>
    <span
      v-else-if="searchTerm.length > 0 && listing?.items && listing.items.length > 0"
      class="px-3 pt-3"
    >
      {{ $t('search.counter', { count: listing?.total, term: searchTerm }) }}
    </span>
    <span v-else>
      <span v-if="searchTerm.length > 2" class="px-3 pt-3">
        {{ $t('search.no-results', { term: searchTerm }) }}
      </span>
    </span>
  </div>

  <div class="flex flex-col gap-6">
    <ScrollArea class="h-[calc(100vh)] md:h-[calc(100vh-10rem)]">
      <div v-if="!searchTerm.length" class="px-3 md:px-0">
        <div class="mb-3 text-lg font-semibold md:text-2xl">{{ $t('search.suggest') }}</div>
        <div class="flex flex-wrap gap-2">
          <Button
            v-for="suggestion in suggestions"
            :key="suggestion"
            variant="outline"
            class="flex items-center gap-2 rounded-full px-4 py-2"
            @click="searchTerm = suggestion"
          >
            {{ suggestion }}
          </Button>
        </div>
      </div>
      <div class="pb-60 md:mt-10 md:pb-48">
        <div class="mb-3 text-lg font-semibold md:text-2xl">{{ $t('search.results') }}</div>
        <div class="grid grid-cols-2 md:grid-cols-3">
          <template v-if="listing?.items && listing?.items.length > 0">
            <ProductCard
              v-for="(product, index) in listing?.items"
              :key="index"
              :product="product"
              @click="close"
            />
          </template>
          <SkeletonProductCard v-for="index in 5" v-else :key="index" />
        </div>
        <NuxtLink
          v-if="listing?.items && listing?.items.length > 0"
          to="/search"
          class="mt-8 flex w-full justify-center"
        >
          <Button class="rounded-full" variant="outline" @click="close">
            {{ $t('search.search-listing', { count: listing?.total }) }}
          </Button>
        </NuxtLink>
      </div>
    </ScrollArea>
  </div>
</template>
