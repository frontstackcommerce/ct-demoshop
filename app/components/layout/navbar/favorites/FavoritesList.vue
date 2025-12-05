<script setup lang="ts">
import client from '~~/.frontstack/generated-client'

const { status, favoritesList } = useFavorites()
const { closeMenu } = useShopMenu()

const { token } = useContext()
const { data: recommendations } = useAsyncData(`recommended-products`, async () => {
  const res = await client.listing(
    'CategoryProductList',
    {
      categoryId: '0194bcd1a65a7ebda096eeae1c9a7b3a',
    },
    {
      query: {
        limit: 12,
      },
      contextKey: token.value,
    }
  )
  return res.items
})
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
      <IconHeart class="animate-bounce" />
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
