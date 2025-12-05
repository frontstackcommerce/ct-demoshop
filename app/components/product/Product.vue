<script setup lang="ts">
const props = defineProps<{
  product: ProductFull
}>()

const { query } = useRoute()

const { addLineItem } = useCart()

const selectedVariant = ref<ProductVariant | null>(null)

const quantity = ref(1)

onMounted(() => {
  if (
    query.sku &&
    typeof query.sku === 'string' &&
    props.product.variants?.some((variant) => variant.key === query.sku)
  ) {
    selectedVariant.value =
      props.product.variants.find((variant) => variant.key === query.sku) ?? null
  } else if (Array.isArray(props.product.variants) && props.product.variants.length > 0) {
    selectedVariant.value = props.product.variants[0] ?? null
  } else {
    selectedVariant.value = null
  }
})

const formatPrice = (price: Price) => {
  return price.amount
    ? price.currency
      ? new Intl.NumberFormat(undefined, { style: 'currency', currency: price.currency }).format(
          price.amount / 100
        )
      : (price.amount / 100).toLocaleString()
    : 0
}
</script>

<template>
  <div
    class="absolute inset-0 top-40 z-0 h-[40%] min-h-[340px] w-screen overflow-hidden bg-gray-200"
  >
    <NuxtImg
      :src="selectedVariant?.images?.[0]?.src"
      :alt="selectedVariant?.images?.[0]?.altText"
      class="size-full object-cover opacity-10 blur-lg"
    />
  </div>

  <div class="relative mx-auto max-w-7xl z-10 mt-20 mb-12 flex flex-col gap-12">
    <div class="grid grid-cols-12 gap-8">
      <div v-if="selectedVariant" class="col-span-8">
        <div class="grid grid-cols-2 gap-2">
          <div
            v-for="image in selectedVariant.images?.slice(0, 2) ?? []"
            :key="image.key"
            class="aspect-[0.75] overflow-hidden"
          >
            <NuxtImg
              :src="image.src"
              :alt="image.altText"
              class="size-full bg-white object-contain p-2 transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        <div
          v-if="selectedVariant.images && selectedVariant.images.length > 2"
          class="col-span-12 mt-2 grid grid-cols-3 gap-2"
        >
          <div
            v-for="image in selectedVariant.images?.slice(2) ?? []"
            :key="image.key"
            class="overflow-hidden"
          >
            <NuxtImg
              :src="image.src"
              :alt="image.altText"
              class="size-full bg-white object-contain p-2 transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
      <div class="col-span-4 flex flex-col gap-4">
        <h1 class="text-2xl font-medium">{{ product.name }}</h1>

        <p v-if="product.description" class="font-light text-gray-500">
          {{ product.description.split('. ')[0] + (product.description.includes('.') ? '.' : '') }}
        </p>
        <p v-else class="font-light text-gray-500">
          {{ $t('product.details.description.missing') }}
        </p>

        <div v-if="selectedVariant?.price" class="text-2xl font-bold">
          {{ formatPrice(selectedVariant?.price) }}
          <span class="block text-sm font-light text-gray-500">
            REF: {{ selectedVariant.key }}
          </span>
        </div>
        <div class="flex gap-4 w-full items-center">
          <div>
            <Select v-model="quantity" class="h-12">
              <SelectTrigger class="h-full border-none shadow-none ">
                <SelectValue :placeholder="String(quantity)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="i in 10" :key="i" :value="i">
                  {{ i }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <button
            v-if="selectedVariant"
            @click.stop="addLineItem(selectedVariant.key, quantity)"
            class="flex-grow bg-[#1d1d1f] text-white h-14 font-light hover:bg-[#1d1d1f]/80 transition-all duration-300 cursor-pointer">
            Add to Cart
          </button>
        </div>
        <div
          v-if="Array.isArray(product.variants) && product.variants.length > 1"
          class="grid grid-cols-5 gap-4"
        >
          <div
            v-for="variant in product.variants"
            :key="variant.key"
            class="aspect-square size-20 cursor-pointer overflow-hidden rounded-full bg-white shadow-xs"
            @click="selectedVariant = variant"
          >
            <NuxtImg
              :src="variant.images?.[0]?.src"
              :alt="variant.images?.[0]?.altText"
              class="size-full bg-white object-contain p-4 opacity-50 transition-all duration-300 hover:scale-105 hover:opacity-100"
              :class="{ 'opacity-100': selectedVariant?.key === variant.key }"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-8">
      <h2 class="col-span-12 text-xl font-bold">
        {{ $t('product.details.sections.description') }}
      </h2>
      <p v-if="product.description" class="col-span-12 font-light text-gray-500">
        {{ product.description }}
      </p>
      <p v-else class="col-span-12 font-light text-gray-500">
        {{ $t('product.details.description.missing') }}
      </p>
    </div>
    <ProductReviewList
      v-if="product.reviews?.total && product.reviews.total > 0"
      :reviews="product.reviews"
    />
    <div v-else class="grid grid-cols-12 gap-8">
      <div class="col-span-12">
        <h2 class="text-2xl font-bold mb-2">
          {{ $t('product.details.reviews.title') }}
        </h2>
        <p class="text-gray-500">
          {{ $t('product.details.reviews.count', { count: 0 }) }}
        </p>
      </div>
    </div>
  </div>
</template>
