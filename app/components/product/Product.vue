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

const hasMultipleImages = computed(() => {
  return selectedVariant.value?.images?.length && selectedVariant.value.images.length > 1
})

const mainImages = computed(() => selectedVariant.value?.images?.slice(0, 2) ?? [])
const thumbnailImages = computed(() => selectedVariant.value?.images?.slice(2) ?? [])

async function handleAddToCart(variant: ProductVariant, quantity: number) {
  await addLineItem(variant.key, quantity)
  addToCartMessage({
    variant,
  })
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Breadcrumb -->
    <div class="border-border/50 border-b">
      <div class="container mx-auto max-w-7xl px-6 py-4 lg:px-12">
        <nav class="text-muted-foreground flex items-center gap-2 text-sm">
          <NuxtLink to="/" class="hover:text-foreground transition-colors">Home</NuxtLink>
          <span>/</span>
          <span class="text-foreground">{{ product.name }}</span>
        </nav>
      </div>
    </div>

    <div class="container mx-auto max-w-7xl px-6 py-12 lg:px-12 lg:py-20">
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <!-- Product Images -->
        <div class="lg:col-span-7 xl:col-span-8">
          <div v-if="selectedVariant" class="space-y-3">
            <!-- Main images -->
            <div :class="hasMultipleImages ? 'grid grid-cols-2 gap-3' : ''">
              <div
                v-for="image in mainImages"
                :key="image.key"
                class="bg-shade relative aspect-[3/4] overflow-hidden"
              >
                <NuxtImg
                  :src="image.src"
                  :alt="image.altText"
                  class="absolute inset-0 size-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            <!-- Thumbnail images -->
            <div v-if="thumbnailImages.length" class="grid grid-cols-3 gap-3">
              <div
                v-for="image in thumbnailImages"
                :key="image.key"
                class="bg-shade relative aspect-square overflow-hidden"
              >
                <NuxtImg
                  :src="image.src"
                  :alt="image.altText"
                  class="absolute inset-0 size-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Product Info - Sticky sidebar -->
        <div class="lg:col-span-5 xl:col-span-4">
          <div class="space-y-8 lg:sticky lg:top-32">
            <!-- Header -->
            <div class="space-y-4">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h1 class="text-editorial text-foreground text-3xl lg:text-4xl">
                    {{ product.name }}
                  </h1>
                  <p
                    v-if="product.brand"
                    class="text-muted-foreground mt-2 text-sm tracking-wide uppercase"
                  >
                    {{ product.brand }}
                  </p>
                </div>
              </div>

              <p
                v-if="product.description"
                class="text-muted-foreground leading-relaxed font-light"
              >
                {{
                  product.description.split('. ')[0] +
                  (product.description.includes('.') ? '.' : '')
                }}
              </p>
            </div>

            <!-- Price -->
            <div v-if="selectedVariant?.price" class="border-border border-b pb-6">
              <span class="text-foreground text-3xl font-medium">
                {{ formatPrice(selectedVariant?.price) }}
              </span>
              <p class="text-muted-foreground mt-1 text-xs">
                Tax included. Shipping calculated at checkout.
              </p>
            </div>

            <!-- Variant Selector -->
            <div
              v-if="Array.isArray(product.variants) && product.variants.length > 1"
              class="space-y-4"
            >
              <div class="flex items-center justify-between">
                <span class="text-foreground text-sm font-medium"> Select Option </span>
                <span class="text-muted-foreground text-xs">
                  {{ product.variants.length }} available
                </span>
              </div>
              <div class="flex flex-wrap gap-3">
                <button
                  v-for="variant in product.variants"
                  :key="variant.key"
                  class="bg-shade relative size-16 overflow-hidden ring-1 transition-all duration-300"
                  :class="[
                    selectedVariant?.key === variant.key
                      ? 'ring-foreground ring-2'
                      : 'ring-border hover:ring-foreground/50',
                  ]"
                  @click="selectedVariant = variant"
                >
                  <NuxtImg
                    :src="variant.images?.[0]?.src"
                    :alt="variant.images?.[0]?.altText"
                    class="size-full object-cover"
                  />
                </button>
              </div>
            </div>

            <!-- Quantity & Add to Cart -->
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <div class="border-border flex items-center border">
                  <button
                    class="hover:bg-shade flex h-12 w-12 items-center justify-center transition-colors"
                    @click="quantity = Math.max(1, quantity - 1)"
                  >
                    <IconMinus class="size-4" />
                  </button>
                  <span
                    class="border-border flex h-12 w-12 items-center justify-center border-x text-sm font-medium"
                  >
                    {{ quantity }}
                  </span>
                  <button
                    class="hover:bg-shade flex h-12 w-12 items-center justify-center transition-colors"
                    @click="quantity = Math.min(10, quantity + 1)"
                  >
                    <IconPlus class="size-4" />
                  </button>
                </div>

                <span class="text-muted-foreground text-xs"> REF: {{ selectedVariant?.key }} </span>
              </div>

              <Button
                v-if="selectedVariant"
                color="buy"
                size="xl"
                class="h-14 w-full text-sm tracking-wider uppercase"
                @click="handleAddToCart(selectedVariant, quantity)"
              >
                {{ $t('product.buy.add-to-cart') }}
              </Button>
            </div>

            <!-- Trust Signals -->
            <div class="border-border space-y-4 border-t pt-6">
              <div class="text-muted-foreground flex items-center gap-4 text-sm">
                <IconTruck class="size-5 shrink-0" />
                <div>
                  <span class="text-foreground font-medium">Free Shipping</span>
                  <span class="block text-xs">On orders over $150</span>
                </div>
              </div>
              <div class="text-muted-foreground flex items-center gap-4 text-sm">
                <IconRefreshCcw class="size-5 shrink-0" />
                <div>
                  <span class="text-foreground font-medium">Easy Returns</span>
                  <span class="block text-xs">30-day return policy</span>
                </div>
              </div>
              <div class="text-muted-foreground flex items-center gap-4 text-sm">
                <IconShield class="size-5 shrink-0" />
                <div>
                  <span class="text-foreground font-medium">2-Year Warranty</span>
                  <span class="block text-xs">Quality guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Details Section -->
    <div class="border-border border-t">
      <div class="container mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
        <div class="grid gap-12 lg:grid-cols-12">
          <div class="lg:col-span-4">
            <h2 class="text-editorial text-2xl lg:text-3xl">
              {{ $t('product.details.sections.description') }}
            </h2>
          </div>
          <div class="lg:col-span-8">
            <p
              v-if="product.description"
              class="text-muted-foreground text-lg leading-relaxed font-light"
            >
              {{ product.description }}
            </p>
            <p v-else class="text-muted-foreground font-light">
              {{ $t('product.details.description.missing') }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Reviews Section -->
    <div class="border-border bg-shade border-t">
      <div class="container mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
        <div v-if="product.reviews?.total && product.reviews.total > 0">
          <ProductReviewList :reviews="product.reviews" />
        </div>
        <div v-else class="py-12 text-center">
          <h2 class="text-editorial mb-4 text-2xl lg:text-3xl">
            {{ $t('product.details.reviews.title') }}
          </h2>
          <p class="text-muted-foreground">
            {{ $t('product.details.reviews.count', { count: 0 }) }}
          </p>
          <Button variant="outline" class="mt-6"> Write a Review </Button>
        </div>
      </div>
    </div>
  </div>
</template>
