<script setup lang="ts">
import { ChevronLeft, ChevronRight, Minus, Plus, RefreshCcw, Shield, Truck, X } from 'lucide-vue-next'
import { onKeyStroke } from '@vueuse/core'

const props = defineProps<{
  productKey: string
  productLink?: string
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const { block: product, status } = useFronticBlock('ProductFull', toRef(() => props.productKey))

const selectedVariant = ref<ProductVariant | null | undefined>(null)
const quantity = ref(1)
const activeImageIndex = ref(0)

watch(
  () => product.value,
  (newProduct) => {
    if (newProduct?.variants?.length) {
      selectedVariant.value = newProduct.variants[0]
      activeImageIndex.value = 0
    }
  },
  { immediate: true },
)

watch(selectedVariant, () => {
  activeImageIndex.value = 0
})

const currentImages = computed(() => selectedVariant.value?.images || [])
const currentImage = computed(() => currentImages.value[activeImageIndex.value])

function nextImage() {
  if (currentImages.value.length > 1) {
    activeImageIndex.value = (activeImageIndex.value + 1) % currentImages.value.length
  }
}

function prevImage() {
  if (currentImages.value.length > 1) {
    activeImageIndex.value =
      activeImageIndex.value === 0
        ? currentImages.value.length - 1
        : activeImageIndex.value - 1
  }
}

onKeyStroke('Escape', () => {
  if (props.isOpen) {
    emit('close')
  }
})
</script>

<template>
  <div
    class="overflow-hidden bg-background transition-all duration-500 ease-out"
    :class="isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'"
  >
    <div class="border-b border-t border-border bg-warm-50">
      <div class="container mx-auto max-w-7xl px-6 py-8 lg:px-12 lg:py-12">
        <!-- Loading State -->
        <div v-if="status === 'pending'" class="flex items-center justify-center py-20">
          <div class="flex flex-col items-center gap-4">
            <div
              class="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent"
            />
            <p class="text-sm text-muted-foreground">{{ $t('actions.loading') }}</p>
          </div>
        </div>

        <!-- Product Content -->
        <div v-else-if="product" class="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <!-- Gallery Section -->
          <div class="lg:col-span-6 xl:col-span-7">
            <div class="flex max-h-[450px] gap-4 lg:max-h-[500px]">
              <!-- Thumbnail Strip -->
              <div
                v-if="currentImages.length > 1"
                class="hidden w-16 shrink-0 flex-col gap-2 overflow-y-auto sm:flex"
              >
                <button
                  v-for="(image, index) in currentImages.slice(0, 5)"
                  :key="image.src"
                  class="relative aspect-square shrink-0 overflow-hidden bg-shade ring-1 transition-all"
                  :class="
                    activeImageIndex === index
                      ? 'ring-2 ring-foreground'
                      : 'ring-border hover:ring-foreground/50'
                  "
                  @click="activeImageIndex = index"
                >
                  <NuxtImg
                    :src="image.src"
                    :alt="image.altText || product.name"
                    class="size-full object-cover"
                  />
                </button>
                <span
                  v-if="currentImages.length > 5"
                  class="text-center text-xs text-muted-foreground"
                >
                  +{{ currentImages.length - 5 }}
                </span>
              </div>

              <!-- Main Image -->
              <div class="group relative h-full flex-1 overflow-hidden bg-shade p-4">
                <NuxtImg
                  v-if="currentImage"
                  :src="currentImage.src"
                  :alt="currentImage.altText || product.name"
                  class="size-full object-contain transition-transform duration-500"
                />

                <template v-if="currentImages.length > 1">
                  <button
                    class="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center bg-white/90 opacity-0 backdrop-blur-sm transition-opacity hover:bg-white group-hover:opacity-100"
                    @click="prevImage"
                  >
                    <ChevronLeft class="size-5" />
                  </button>
                  <button
                    class="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center bg-white/90 opacity-0 backdrop-blur-sm transition-opacity hover:bg-white group-hover:opacity-100"
                    @click="nextImage"
                  >
                    <ChevronRight class="size-5" />
                  </button>
                </template>
              </div>
            </div>
          </div>

          <!-- Product Info -->
          <div class="flex flex-col lg:col-span-6 xl:col-span-5">
            <!-- Close Button -->
            <div class="-mr-2 -mt-2 mb-4 flex justify-end">
              <button
                class="p-2 text-muted-foreground transition-colors hover:text-foreground"
                @click="emit('close')"
              >
                <X class="size-5" />
              </button>
            </div>

            <!-- Header -->
            <div class="mb-6 space-y-2">
              <p
                v-if="product.brand"
                class="text-xs uppercase tracking-widest text-muted-foreground"
              >
                {{ product.brand }}
              </p>
              <h2 class="font-serif text-2xl text-foreground lg:text-3xl">
                {{ product.name }}
              </h2>
              <p
                v-if="product.description"
                class="line-clamp-2 text-sm font-light leading-relaxed text-muted-foreground"
              >
                {{ product.description }}
              </p>
            </div>

            <!-- Price -->
            <div class="mb-6 border-b border-border pb-6">
              <span
                v-if="selectedVariant?.price"
                class="text-2xl font-medium text-foreground"
              >
                {{ formatPrice(selectedVariant.price) }}
              </span>
              <p class="mt-1 text-xs text-muted-foreground">
                {{ $t('product.tax-included') }}
              </p>
            </div>

            <!-- Variant Selector -->
            <div
              v-if="product.variants && product.variants.length > 1"
              class="mb-6"
            >
              <div class="mb-3 flex items-center justify-between">
                <span class="text-sm font-medium text-foreground">
                  {{ $t('actions.select-option') }}
                </span>
                <span class="text-xs text-muted-foreground">
                  {{ $t('actions.available', { count: product.variants.length }) }}
                </span>
              </div>
              <div class="flex max-h-24 flex-wrap gap-2 overflow-y-auto">
                <button
                  v-for="variant in product.variants"
                  :key="variant.key"
                  class="relative size-14 shrink-0 overflow-hidden bg-shade ring-1 transition-all"
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

            <!-- Quantity & Add to Cart -->
            <div class="mt-auto space-y-4">
              <div class="flex items-center gap-4">
                <div class="flex items-center border border-border">
                  <button
                    class="flex size-10 items-center justify-center transition-colors hover:bg-shade"
                    @click="quantity = Math.max(1, quantity - 1)"
                  >
                    <Minus class="size-4" />
                  </button>
                  <span
                    class="flex size-10 items-center justify-center border-x border-border text-sm font-medium"
                  >
                    {{ quantity }}
                  </span>
                  <button
                    class="flex size-10 items-center justify-center transition-colors hover:bg-shade"
                    @click="quantity = Math.min(10, quantity + 1)"
                  >
                    <Plus class="size-4" />
                  </button>
                </div>
                <span v-if="selectedVariant" class="text-xs text-muted-foreground">
                  {{ $t('product.sku') }}{{ $t('default.colon') }}{{ selectedVariant.key }}
                </span>
              </div>

              <div class="flex gap-3">
                <Button
                  v-if="selectedVariant"
                  color="buy"
                  size="lg"
                  class="h-12 flex-1 text-sm uppercase tracking-wider"
                >
                  {{ $t('product.buy.add-to-cart') }}
                </Button>
                <NuxtLink v-if="productLink" :to="productLink">
                  <Button
                    variant="link"
                    size="lg"
                    class="h-12 text-sm uppercase tracking-wider"
                  >
                    {{ $t('actions.view-full-details') }}
                  </Button>
                </NuxtLink>
              </div>
            </div>

            <!-- Trust Badges -->
            <div
              class="mt-6 flex items-center gap-6 border-t border-border pt-6 text-xs text-muted-foreground"
            >
              <div class="flex items-center gap-2">
                <Truck class="size-4" />
                <span>{{ $t('product.details.bullet-points.first') }}</span>
              </div>
              <div class="flex items-center gap-2">
                <RefreshCcw class="size-4" />
                <span>{{ $t('product.details.bullet-points.second') }}</span>
              </div>
              <div class="flex items-center gap-2">
                <Shield class="size-4" />
                <span>{{ $t('product.details.bullet-points.third') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
