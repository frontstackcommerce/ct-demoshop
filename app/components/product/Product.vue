<script setup lang="ts">
import { Minus, Plus, Truck, RefreshCcw, Shield } from 'lucide-vue-next'

const props = defineProps<{
  product: ProductFull
}>()

const { query } = useRoute()
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

async function handleAddToCart() {
  // TODO: wire up useCart when available
}
</script>

<template>
  <div class="min-h-screen">
    <div class="border-b border-border/50">
      <div class="container mx-auto max-w-7xl px-6 py-4 lg:px-12">
        <nav class="flex items-center gap-2 text-sm text-muted-foreground">
          <NuxtLink to="/" class="transition-colors hover:text-foreground">{{ $t('navigation.home') }}</NuxtLink>
          <span>/</span>
          <span class="text-foreground">{{ product.name }}</span>
        </nav>
      </div>
    </div>

    <div class="container mx-auto max-w-7xl px-6 py-12 lg:px-12 lg:py-20">
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-7 xl:col-span-8">
          <div v-if="selectedVariant" class="space-y-3">
            <div :class="hasMultipleImages ? 'grid grid-cols-2 gap-3' : ''">
              <div
                v-for="image in mainImages"
                :key="image.key"
                class="relative aspect-[3/4] overflow-hidden bg-shade"
              >
                <NuxtImg
                  :src="image.src"
                  :alt="image.altText"
                  class="absolute inset-0 size-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
            <div v-if="thumbnailImages.length" class="grid grid-cols-3 gap-3">
              <div
                v-for="image in thumbnailImages"
                :key="image.key"
                class="relative aspect-square overflow-hidden bg-shade"
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

        <div class="lg:col-span-5 xl:col-span-4">
          <div class="space-y-8 lg:sticky lg:top-32">
            <div class="space-y-4">
              <div>
                <h1 class="font-serif text-3xl text-foreground lg:text-4xl">
                  {{ product.name }}
                </h1>
                <p
                  v-if="product.brand"
                  class="mt-2 text-sm uppercase tracking-wide text-muted-foreground"
                >
                  {{ product.brand }}
                </p>
              </div>
              <p
                v-if="product.description"
                class="font-light leading-relaxed text-muted-foreground"
              >
                {{
                  product.description.split('. ')[0] +
                  (product.description.includes('.') ? '.' : '')
                }}
              </p>
            </div>

            <div v-if="selectedVariant?.price" class="border-b border-border pb-6">
              <span class="text-3xl font-medium text-foreground">
                {{ formatPrice(selectedVariant?.price) }}
              </span>
            </div>

            <div
              v-if="Array.isArray(product.variants) && product.variants.length > 1"
              class="space-y-4"
            >
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-foreground">
                  {{ $t('actions.select-option') }}
                </span>
                <span class="text-xs text-muted-foreground">
                  {{ $t('actions.available', { count: product.variants.length }) }}
                </span>
              </div>
              <div class="flex flex-wrap gap-3">
                <button
                  v-for="variant in product.variants"
                  :key="variant.key"
                  class="relative size-16 overflow-hidden bg-shade ring-1 transition-all duration-300"
                  :class="[
                    selectedVariant?.key === variant.key
                      ? 'ring-2 ring-foreground'
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

            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <div class="flex items-center border border-border">
                  <button
                    class="flex size-12 items-center justify-center transition-colors hover:bg-shade"
                    @click="quantity = Math.max(1, quantity - 1)"
                  >
                    <Minus class="size-4" />
                  </button>
                  <span
                    class="flex size-12 items-center justify-center border-x border-border text-sm font-medium"
                  >
                    {{ quantity }}
                  </span>
                  <button
                    class="flex size-12 items-center justify-center transition-colors hover:bg-shade"
                    @click="quantity = Math.min(10, quantity + 1)"
                  >
                    <Plus class="size-4" />
                  </button>
                </div>
                <span class="text-xs text-muted-foreground">
                  {{ $t('product.sku') }}{{ $t('default.colon') }}{{ selectedVariant?.key }}
                </span>
              </div>
              <Button
                v-if="selectedVariant"
                color="buy"
                size="lg"
                class="h-14 w-full text-sm uppercase tracking-wider"
                @click="handleAddToCart"
              >
                {{ $t('product.buy.add-to-cart') }}
              </Button>
            </div>

            <div class="space-y-4 border-t border-border pt-6">
              <div class="flex items-center gap-4 text-sm text-muted-foreground">
                <Truck class="size-5 shrink-0" />
                <div>
                  <span class="font-medium text-foreground">{{
                    $t('product.details.bullet-points.first')
                  }}</span>
                </div>
              </div>
              <div class="flex items-center gap-4 text-sm text-muted-foreground">
                <RefreshCcw class="size-5 shrink-0" />
                <div>
                  <span class="font-medium text-foreground">{{
                    $t('product.details.bullet-points.second')
                  }}</span>
                </div>
              </div>
              <div class="flex items-center gap-4 text-sm text-muted-foreground">
                <Shield class="size-5 shrink-0" />
                <div>
                  <span class="font-medium text-foreground">{{
                    $t('product.details.bullet-points.third')
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="border-t border-border">
      <div class="container mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
        <div class="grid gap-12 lg:grid-cols-12">
          <div class="lg:col-span-4">
            <h2 class="font-serif text-2xl lg:text-3xl">
              {{ $t('product.details.sections.description') }}
            </h2>
          </div>
          <div class="lg:col-span-8">
            <p
              v-if="product.description"
              class="text-lg font-light leading-relaxed text-muted-foreground"
            >
              {{ product.description }}
            </p>
            <p v-else class="font-light text-muted-foreground">
              {{ $t('product.details.description.missing') }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="border-t border-border bg-shade">
      <div class="container mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
        <div v-if="product.reviews?.total && product.reviews.total > 0">
          <ProductReviewList :reviews="product.reviews" />
        </div>
        <div v-else class="py-12 text-center">
          <h2 class="mb-4 font-serif text-2xl lg:text-3xl">
            {{ $t('product.details.reviews.title') }}
          </h2>
          <p class="text-muted-foreground">
            {{ $t('product.details.reviews.count', { count: 0 }) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
