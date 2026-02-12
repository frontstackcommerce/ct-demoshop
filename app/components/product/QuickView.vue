<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import client from '../../../.frontstack/generated-client'

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
  () => client.block('ProductFull', props.productKey),
  { 
    watch: [() => props.productKey],
    immediate: true 
  }
)

const selectedVariant = ref<ProductVariant | null>(null)
const quantity = ref(1)
const activeImageIndex = ref(0)

// Set initial variant when product loads
watch(() => product.value, (newProduct) => {
  if (newProduct?.variants?.length) {
    selectedVariant.value = newProduct.variants[0]
    activeImageIndex.value = 0
  }
}, { immediate: true })

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
    activeImageIndex.value = activeImageIndex.value === 0 
      ? currentImages.value.length - 1 
      : activeImageIndex.value - 1
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
    class="overflow-hidden bg-background transition-all duration-500 ease-out"
    :class="isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'"
  >
    <div class="border-t border-b border-border bg-warm-50">
      <div class="container mx-auto px-6 lg:px-12 max-w-7xl py-8 lg:py-12">
        <!-- Loading State -->
        <div v-if="status === 'pending'" class="flex items-center justify-center py-20">
          <div class="flex flex-col items-center gap-4">
            <div class="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p class="text-sm text-muted-foreground">{{ $t('actions.loading') }}</p>
          </div>
        </div>

        <!-- Product Content -->
        <div v-else-if="product" class="grid lg:grid-cols-12 gap-8 lg:gap-12">
          <!-- Gallery Section -->
          <div class="lg:col-span-6 xl:col-span-7">
            <div class="flex gap-4 max-h-[450px] lg:max-h-[500px]">
              <!-- Thumbnail Strip -->
              <div 
                v-if="currentImages.length > 1" 
                class="hidden sm:flex flex-col gap-2 w-16 shrink-0 overflow-y-auto"
              >
                <button
                  v-for="(image, index) in currentImages.slice(0, 5)"
                  :key="image.src"
                  class="relative aspect-square overflow-hidden bg-shade ring-1 transition-all shrink-0"
                  :class="activeImageIndex === index ? 'ring-foreground ring-2' : 'ring-border hover:ring-foreground/50'"
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
                  class="text-xs text-center text-muted-foreground"
                >
                  +{{ currentImages.length - 5 }}
                </span>
              </div>

              <!-- Main Image -->
              <div class="relative flex-1 h-full overflow-hidden bg-shade group p-4">
                <NuxtImg
                  v-if="currentImage"
                  :src="currentImage.src"
                  :alt="currentImage.altText || product.name"
                  class="size-full object-contain transition-transform duration-500"
                />
                
                <!-- Navigation Arrows -->
                <template v-if="currentImages.length > 1">
                  <button
                    class="absolute left-3 top-1/2 -translate-y-1/2 size-10 flex items-center justify-center bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                    @click="prevImage"
                  >
                    <IconChevronLeft class="size-5" />
                  </button>
                  <button
                    class="absolute right-3 top-1/2 -translate-y-1/2 size-10 flex items-center justify-center bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                    @click="nextImage"
                  >
                    <IconChevronRight class="size-5" />
                  </button>
                </template>
              </div>
            </div>
          </div>

          <!-- Product Info -->
          <div class="lg:col-span-6 xl:col-span-5 flex flex-col">
            <!-- Close Button -->
            <div class="flex justify-end mb-4 -mt-2 -mr-2">
              <button 
                class="p-2 text-muted-foreground hover:text-foreground transition-colors"
                :aria-label="$t('actions.closeQuickView')"
                @click="emit('close')"
              >
                <IconX class="size-5" />
              </button>
            </div>

            <!-- Header -->
            <div class="space-y-2 mb-6">
              <p v-if="product.brand" class="text-xs text-muted-foreground tracking-widest uppercase">
                {{ product.brand }}
              </p>
              <h2 class="font-serif text-2xl lg:text-3xl text-foreground">
                {{ product.name }}
              </h2>
              <p v-if="product.description" class="text-sm text-muted-foreground font-light leading-relaxed line-clamp-2">
                {{ product.description }}
              </p>
            </div>

            <!-- Price -->
            <div class="mb-6 pb-6 border-b border-border">
              <span v-if="selectedVariant?.price" class="text-2xl font-medium text-foreground">
                {{ formatPrice(selectedVariant.price) }}
              </span>
              <p class="text-xs text-muted-foreground mt-1">
                {{ $t('quickView.taxIncluded') }}
              </p>
            </div>

            <!-- Variant Selector -->
            <div
              v-if="product.variants && product.variants.length > 1"
              class="mb-6"
            >
              <div class="flex items-center justify-between mb-3">
                <span class="text-sm font-medium text-foreground">
                  {{ $t('actions.selectOption') }}
                </span>
                <span class="text-xs text-muted-foreground">
                  {{ $t('actions.available', { count: product.variants.length }) }}
                </span>
              </div>
              <div class="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                <button
                  v-for="variant in product.variants"
                  :key="variant.key"
                  class="relative size-14 overflow-hidden bg-shade ring-1 transition-all shrink-0"
                  :class="[
                    selectedVariant?.key === variant.key 
                      ? 'ring-foreground ring-2' 
                      : 'ring-border hover:ring-foreground/50'
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
            <div class="space-y-4 mt-auto">
              <div class="flex items-center gap-4">
                <div class="flex items-center border border-border">
                  <button 
                    class="w-10 h-10 flex items-center justify-center hover:bg-shade transition-colors"
                    @click="quantity = Math.max(1, quantity - 1)"
                  >
                    <IconMinus class="size-4" />
                  </button>
                  <span class="w-10 h-10 flex items-center justify-center text-sm font-medium border-x border-border">
                    {{ quantity }}
                  </span>
                  <button 
                    class="w-10 h-10 flex items-center justify-center hover:bg-shade transition-colors"
                    @click="quantity = Math.min(10, quantity + 1)"
                  >
                    <IconPlus class="size-4" />
                  </button>
                </div>
                
                <span v-if="selectedVariant" class="text-xs text-muted-foreground">
                  {{ $t('product.sku') }}: {{ selectedVariant.key }}
                </span>
              </div>
              
              <div class="flex gap-3">
                <Button
                  v-if="selectedVariant"
                  color="buy"
                  size="lg"
                  class="flex-1 h-12 text-sm tracking-wider uppercase"
                  @click="handleAddToCart"
                >
                  {{ $t('product.buy.add-to-cart') }}
                </Button>
                
                <NuxtLink v-if="productLink"
                  :to="productLink"
                  class="h-12 px-6 flex items-center justify-center border border-border text-sm font-medium tracking-wide uppercase hover:border-foreground transition-colors"
                >
                  {{ $t('actions.viewFullDetails') }}
                </NuxtLink>
              </div>
            </div>

            <!-- Trust Badges (compact) -->
            <div class="flex items-center gap-6 mt-6 pt-6 border-t border-border text-xs text-muted-foreground">
              <div class="flex items-center gap-2">
                <IconTruck class="size-4" />
                <span>{{ $t('quickView.freeShipping') }}</span>
              </div>
              <div class="flex items-center gap-2">
                <IconRefreshCcw class="size-4" />
                <span>{{ $t('quickView.easyReturns') }}</span>
              </div>
              <div class="flex items-center gap-2">
                <IconShield class="size-4" />
                <span>{{ $t('quickView.warranty') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
