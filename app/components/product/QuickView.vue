<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'

const client = useFronticClient()

const props = defineProps<{
  productKey: string
  productLink: string
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const { addLineItem } = useCart()
const { addToCartMessage } = useNotify()

// Fetch full product data when quick view opens
const { data: product, status } = await useAsyncData(
  `quickview-${props.productKey}`,
  () => client.block('ProductFull', props.productKey) as Promise<any>,
  {
    watch: [() => props.productKey],
    immediate: true,
  },
)

const selectedVariant = ref<ProductVariant | null>(null)
const quantity = ref(1)
const activeImageIndex = ref(0)

// Set initial variant when product loads
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

// Reset active image when variant changes
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
      activeImageIndex.value === 0 ? currentImages.value.length - 1 : activeImageIndex.value - 1
  }
}

async function handleAddToCart() {
  if (!selectedVariant.value) return

  await addLineItem(selectedVariant.value.key, quantity.value)
  addToCartMessage({
    variant: selectedVariant.value,
  })
  emit('close')
}

// Close on escape key
onKeyStroke('Escape', () => {
  if (props.isOpen) {
    emit('close')
  }
})
</script>

<template>
  <div
    class="bg-background overflow-hidden transition-all duration-500 ease-out"
    :class="isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'"
  >
    <div class="border-border bg-warm-50 border-t border-b">
      <div class="container mx-auto max-w-7xl px-6 py-8 lg:px-12 lg:py-12">
        <!-- Loading State -->
        <div v-if="status === 'pending'" class="flex items-center justify-center py-20">
          <div class="flex flex-col items-center gap-4">
            <div
              class="border-primary size-8 animate-spin rounded-full border-2 border-t-transparent"
            />
            <p class="text-muted-foreground text-sm">{{ $t('actions.loading') }}</p>
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
                  class="bg-shade relative aspect-square shrink-0 overflow-hidden ring-1 transition-all"
                  :class="
                    activeImageIndex === index
                      ? 'ring-foreground ring-2'
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
                  class="text-muted-foreground text-center text-xs"
                >
                  +{{ currentImages.length - 5 }}
                </span>
              </div>

              <!-- Main Image -->
              <div class="bg-shade group relative h-full flex-1 overflow-hidden p-4">
                <NuxtImg
                  v-if="currentImage"
                  :src="currentImage.src"
                  :alt="currentImage.altText || product.name"
                  class="size-full object-contain transition-transform duration-500"
                />

                <!-- Navigation Arrows -->
                <template v-if="currentImages.length > 1">
                  <button
                    class="absolute top-1/2 left-3 flex size-10 -translate-y-1/2 items-center justify-center bg-white/90 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-white"
                    @click="prevImage"
                  >
                    <IconChevronLeft class="size-5" />
                  </button>
                  <button
                    class="absolute top-1/2 right-3 flex size-10 -translate-y-1/2 items-center justify-center bg-white/90 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-white"
                    @click="nextImage"
                  >
                    <IconChevronRight class="size-5" />
                  </button>
                </template>
              </div>
            </div>
          </div>

          <!-- Product Info -->
          <div class="flex flex-col lg:col-span-6 xl:col-span-5">
            <!-- Close Button -->
            <div class="-mt-2 -mr-2 mb-4 flex justify-end">
              <button
                class="text-muted-foreground hover:text-foreground p-2 transition-colors"
                :aria-label="$t('actions.close-quick-view')"
                @click="emit('close')"
              >
                <IconX class="size-5" />
              </button>
            </div>

            <!-- Header -->
            <div class="mb-6 space-y-2">
              <p
                v-if="product.brand"
                class="text-muted-foreground text-xs tracking-widest uppercase"
              >
                {{ product.brand }}
              </p>
              <h2 class="text-foreground font-serif text-2xl lg:text-3xl">
                {{ product.name }}
              </h2>
              <p
                v-if="product.description"
                class="text-muted-foreground line-clamp-2 text-sm leading-relaxed font-light"
              >
                {{ product.description }}
              </p>
            </div>

            <!-- Price -->
            <div class="border-border mb-6 border-b pb-6">
              <span v-if="selectedVariant?.price" class="text-foreground text-2xl font-medium">
                {{ formatPrice(selectedVariant.price) }}
              </span>
              <p class="text-muted-foreground mt-1 text-xs">
                {{ $t('quick-view.tax-included') }}
              </p>
            </div>

            <!-- Variant Selector -->
            <div v-if="product.variants && product.variants.length > 1" class="mb-6">
              <div class="mb-3 flex items-center justify-between">
                <span class="text-foreground text-sm font-medium">
                  {{ $t('actions.select-option') }}
                </span>
                <span class="text-muted-foreground text-xs">
                  {{ $t('actions.available', { count: product.variants.length }) }}
                </span>
              </div>
              <div class="flex max-h-24 flex-wrap gap-2 overflow-y-auto">
                <button
                  v-for="variant in product.variants"
                  :key="variant.key"
                  class="bg-shade relative size-14 shrink-0 overflow-hidden ring-1 transition-all"
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
            <div class="mt-auto space-y-4">
              <div class="flex items-center gap-4">
                <div class="border-border flex items-center border">
                  <button
                    class="hover:bg-shade flex h-10 w-10 items-center justify-center transition-colors"
                    @click="quantity = Math.max(1, quantity - 1)"
                  >
                    <IconMinus class="size-4" />
                  </button>
                  <span
                    class="border-border flex h-10 w-10 items-center justify-center border-x text-sm font-medium"
                  >
                    {{ quantity }}
                  </span>
                  <button
                    class="hover:bg-shade flex h-10 w-10 items-center justify-center transition-colors"
                    @click="quantity = Math.min(10, quantity + 1)"
                  >
                    <IconPlus class="size-4" />
                  </button>
                </div>

                <span v-if="selectedVariant" class="text-muted-foreground text-xs">
                  {{ $t('product.sku') }}: {{ selectedVariant.key }}
                </span>
              </div>

              <div class="flex gap-3">
                <Button
                  v-if="selectedVariant"
                  color="buy"
                  size="lg"
                  class="h-12 flex-1 text-sm tracking-wider uppercase"
                  @click="handleAddToCart"
                >
                  {{ $t('product.buy.add-to-cart') }}
                </Button>

                <NuxtLink
                  v-if="productLink"
                  :to="productLink"
                  class="border-border hover:border-foreground flex h-12 items-center justify-center border px-6 text-sm font-medium tracking-wide uppercase transition-colors"
                >
                  {{ $t('actions.view-full-details') }}
                </NuxtLink>
              </div>
            </div>

            <!-- Trust Badges (compact) -->
            <div
              class="border-border text-muted-foreground mt-6 flex items-center gap-6 border-t pt-6 text-xs"
            >
              <div class="flex items-center gap-2">
                <IconTruck class="size-4" />
                <span>{{ $t('quick-view.free-shipping') }}</span>
              </div>
              <div class="flex items-center gap-2">
                <IconRefreshCcw class="size-4" />
                <span>{{ $t('quick-view.easy-returns') }}</span>
              </div>
              <div class="flex items-center gap-2">
                <IconShield class="size-4" />
                <span>{{ $t('quick-view.warranty') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
