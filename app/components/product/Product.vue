<script setup lang="ts">
const props = defineProps<{
  product: ProductFull
}>()

const { query } = useRoute()

const { addLineItem } = useCart()

const selectedVariant = ref<ProductVariant | null>(null)

onMounted(() => {
  if(query.sku && typeof query.sku === 'string' && props.product.variants?.some(variant => variant.key === query.sku)) {
    selectedVariant.value = props.product.variants.find(variant => variant.key === query.sku) ?? null
  } else  if (Array.isArray(props.product.variants) && props.product.variants.length > 0) {
    selectedVariant.value = props.product.variants[0] ?? null
  } else {
    selectedVariant.value = null
  }
})

const formatPrice = (price: Price) => {
  return price.amount 
    ? (price.currency
        ? new Intl.NumberFormat(undefined, { style: 'currency', currency: price.currency }).format(price.amount / 100)
        : (price.amount / 100).toLocaleString())
    : 0
}
</script>

<template>
  <div class="absolute inset-0 w-screen top-40 h-[40%] min-h-[340px] bg-gray-200 z-0 overflow-hidden">
    <img :src="selectedVariant?.images?.[0]?.src" :alt="selectedVariant?.images?.[0]?.altText" class="size-full object-cover blur-lg opacity-10" />
  </div>

  <div class="flex flex-col gap-12 mt-20 relative z-10">

    <div class="grid grid-cols-12 gap-8">
      <div v-if="selectedVariant" class="col-span-8">
        <div class="grid grid-cols-2 gap-2">
          <div v-for="image in selectedVariant.images?.slice(0, 2) ?? []" :key="image.key" class="overflow-hidden aspect-[0.75]">
            <img :src="image.src" :alt="image.altText" class="size-full object-contain p-2 bg-white hover:scale-105 transition-transform duration-300" />
          </div>
        </div>
        
        <div class="col-span-12 grid grid-cols-3 gap-2 mt-2" v-if="selectedVariant.images && selectedVariant.images.length > 2">

          <div v-for="image in selectedVariant.images?.slice(2) ?? []" :key="image.key" class="overflow-hidden">
            <img :src="image.src" :alt="image.altText" class="size-full object-contain p-2 bg-white hover:scale-105 transition-transform duration-300" />
          </div>
        </div>
      </div>
      <div class="col-span-4 flex flex-col gap-4">
        <h1 class="text-2xl font-medium">{{ product.name }}</h1>

        <p class="text-gray-500 font-light" v-if="product.description">
          {{ product.description.split('. ')[0] + (product.description.includes('.') ? '.' : '') }}
        </p>
        <p class="text-gray-500 font-light" v-else>
          {{ $t('product.details.description.missing') }}
        </p>

        <div v-if="selectedVariant?.price" class="text-2xl font-bold">
          {{ formatPrice(selectedVariant?.price) }}
          <span class="text-gray-500 font-light text-sm block">
            REF: {{ selectedVariant.key }}
          </span>
        </div>


        <button
          v-if="selectedVariant"
          @click.stop="addLineItem(selectedVariant.key, 1)"
          class="bg-[#1d1d1f] text-white p-4 font-light hover:bg-[#1d1d1f]/80 transition-all duration-300 cursor-pointer">
          Add to Cart
        </button>

        <div v-if="Array.isArray(product.variants) && product.variants.length > 1" class="grid grid-cols-5 gap-4">
          <div
            v-for="variant in product.variants"
            :key="variant.key"
            class="aspect-square rounded-full overflow-hidden bg-white size-20 cursor-pointer shadow-xs"
            @click="selectedVariant = variant">
            <img :src="variant.images?.[0]?.src" :alt="variant.images?.[0]?.altText" class="size-full object-contain p-4 bg-white hover:scale-105 transition-all opacity-50 hover:opacity-100 duration-300" :class="{ 'opacity-100': selectedVariant?.key === variant.key }" />
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-8">
      <h2 class="col-span-12 text-xl font-bold">{{ $t('product.details.sections.description') }}</h2>
      <p class="col-span-12 text-gray-500 font-light" v-if="product.description">
        {{ product.description }}
      </p>
      <p class="col-span-12 text-gray-500 font-light" v-else>
        {{ $t('product.details.description.missing') }}
      </p>
    </div>
    
    <h3 class="text-lg font-bold">{{ $t('product.details.reviews.count', { count: product.reviews?.total || 0 }) }}</h3>
    <div v-if="product.reviews?.total && product.reviews.total > 0">
      <h2 class="text-xl font-bold">
        {{ $t('product.details.reviews.title') }}
        {{ product.reviews?.aggregation?.rating?.total.avg + '/10' }}
      </h2>
      <div v-for="review in product.reviews?.items" :key="review.key">
        <h3 class="text-lg font-bold">{{ review.name }}</h3>
        <p class="text-gray-500">
          <span class="font-bold">{{ review.rating + '/10:' }}</span> {{ review.text }}
        </p>
      </div>
    </div>
  </div>
</template>
