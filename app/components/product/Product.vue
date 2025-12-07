<script setup lang="ts">
const props = defineProps<{
  product: ProductFull
}>()

const { query } = useRoute()

const { addLineItem } = useCart()
const { addToCartMessage } = useNotify()
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

const hasSecondImage = computed(() => {
  return selectedVariant.value?.images?.length && selectedVariant.value.images.length > 1
})

async function handleAddToCart(variant: ProductVariant, quantity: number) {
  await addLineItem(variant.key, quantity)
  addToCartMessage({
    variant,
  })
}
</script>

<template>
  <div
    class="bg-shade-100 absolute inset-0 top-28 z-0 hidden h-[40%] min-h-[340px] w-screen overflow-hidden sm:block"
  >
    <NuxtImg
      :src="selectedVariant?.images?.[0]?.src"
      :alt="selectedVariant?.images?.[0]?.altText"
      class="size-full object-cover opacity-10 blur-lg"
    />
  </div>

  <div class="relative z-10 mx-auto mb-12 flex max-w-7xl flex-col gap-12 sm:mt-20 sm:px-10 lg:px-5">
    <div class="grid grid-cols-2 gap-8 sm:grid-cols-12">
      <div v-if="selectedVariant" class="col-span-2 sm:col-span-7 lg:col-span-8">
        <div :class="hasSecondImage ? 'grid grid-cols-2 gap-2' : 'grid grid-cols-1 gap-2'">
          <div
            v-for="image in selectedVariant.images?.slice(0, 2) ?? []"
            :key="image.key"
            :class="hasSecondImage ? 'aspect-[0.75]' : ''"
            class="overflow-hidden"
          >
            <NuxtImg
              :src="image.src"
              :alt="image.altText"
              height="600"
              class="bg-background object-contain p-2"
              :class="{
                'size-full transition-transform duration-300 hover:scale-105': hasSecondImage,
              }"
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
      <div class="col-span-2 flex flex-col gap-4 px-5 sm:col-span-5 sm:px-0 lg:col-span-4">
        <h1 class="font-display text-3xl font-medium">{{ product.name }}</h1>

        <p v-if="product.description" class="text-muted-foreground text-lg font-light">
          {{ product.description.split('. ')[0] + (product.description.includes('.') ? '.' : '') }}
        </p>
        <p v-else class="text-muted-foreground font-light">
          {{ $t('product.details.description.missing') }}
        </p>

        <div v-if="selectedVariant?.price" class="text-2xl font-bold">
          {{ formatPrice(selectedVariant?.price) }}
          <span class="text-muted-foreground block text-sm font-light">
            REF: {{ selectedVariant.key }}
          </span>
        </div>
        <div
          v-if="Array.isArray(product.variants) && product.variants.length > 1"
          class="grid grid-cols-5 gap-4 pb-4"
        >
          <div
            v-for="variant in product.variants"
            :key="variant.key"
            class="bg-background aspect-square size-16 cursor-pointer overflow-hidden rounded-full shadow-xs lg:size-20"
            @click="selectedVariant = variant"
          >
            <NuxtImg
              :src="variant.images?.[0]?.src"
              :alt="variant.images?.[0]?.altText"
              class="bg-background size-full object-contain p-2 opacity-50 transition-all duration-300 hover:scale-105 hover:opacity-100 lg:p-4"
              :class="{ 'opacity-100': selectedVariant?.key === variant.key }"
            />
          </div>
        </div>
        <div class="flex w-full items-center gap-4">
          <div>
            <Select v-model="quantity" class="h-12">
              <SelectTrigger class="h-full border-none text-xl shadow-none">
                <SelectValue :placeholder="String(quantity)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="i in 10" :key="i" :value="i">
                  {{ i }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            v-if="selectedVariant"
            color="buy"
            size="xl"
            class="grow"
            @click="handleAddToCart(selectedVariant, quantity)"
          >
            {{ $t('product.buy.add-to-cart') }}
          </Button>
        </div>
      </div>
    </div>

    <div class="mt-10 grid grid-cols-12 gap-8 px-5 sm:px-0">
      <h2 class="font-display col-span-12 text-2xl">
        {{ $t('product.details.sections.description') }}
      </h2>
      <p
        v-if="product.description"
        class="text-muted-foreground col-span-12 text-lg leading-relaxed font-extralight tracking-wide"
      >
        {{ product.description }}
      </p>
      <p v-else class="text-muted-foreground col-span-12 font-light">
        {{ $t('product.details.description.missing') }}
      </p>
    </div>
    <div v-if="product.reviews?.total && product.reviews.total > 0" class="px-5 sm:px-0">
      <ProductReviewList :reviews="product.reviews" />
    </div>
    <div v-else class="grid grid-cols-12 gap-8 px-5 sm:px-0">
      <div class="col-span-12">
        <h2 class="font-display mb-2 text-2xl">
          {{ $t('product.details.reviews.title') }}
        </h2>
        <p class="text-muted-foreground">
          {{ $t('product.details.reviews.count', { count: 0 }) }}
        </p>
      </div>
    </div>
  </div>
</template>
