<script setup lang="ts">
import { Heart } from 'lucide-vue-next'

const { status, favoritesList } = useFavorites()
const { closeMenu } = useMenuState()

const { listing: recommendationsListing } = useFronticListing('CategoryProducts', {
  key: '0194bcd1a65a7ebda096eeae1c9a7b3a',
})
const recommendations = computed(() => recommendationsListing.value?.items ?? [])
</script>

<template>
  <div class="container mx-auto flex flex-col px-6 md:px-0">
    <h3
      v-if="status === 'success' && favoritesList?.items && favoritesList?.items.length > 0"
      class="my-6 text-2xl font-semibold"
    >
      {{ $t('favorites.title') }}
    </h3>
    <div v-if="status === 'success'" class="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
      <template v-if="favoritesList?.items && favoritesList?.items.length > 0">
        <ProductCard
          v-for="(product, index) in favoritesList?.items"
          :key="index"
          :favorites-remove-only="true"
          :product="product"
          @click="closeMenu"
        ></ProductCard>
      </template>
    </div>
    <div v-else class="mt-20 flex w-full flex-col items-center justify-center gap-4">
      <Heart class="animate-bounce" />
      <p>
        {{ $t('favorites.empty') }}
      </p>
    </div>
    <ProductCardSlider
      v-if="recommendations"
      :products="recommendations"
      :title="$t('favorites.recommended')"
    />
  </div>
</template>
