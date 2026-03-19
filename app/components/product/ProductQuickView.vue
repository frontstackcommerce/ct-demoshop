<script setup lang="ts">
import { VisuallyHidden } from 'reka-ui'
import { ShoppingBag } from 'lucide-vue-next'

const props = defineProps<{
  product: ProductCard
}>()

const open = defineModel<boolean>('open', { default: false })

const { addLineItem } = useCart()
const { addToCartMessage } = useNotify()

// Track selected variant index
const selectedVariantIndex = ref(0)

const selectedVariant = computed(() => props.product.variants?.[selectedVariantIndex.value])
const selectedImage = computed(() => selectedVariant.value?.images?.[0]?.src)
const displayPrice = computed(() => selectedVariant.value?.price || props.product.price)

const isAddingToCart = ref(false)

async function handleAddToCart() {
  const variant = selectedVariant.value
  if (!variant?.key || isAddingToCart.value) return

  isAddingToCart.value = true
  try {
    await addLineItem(variant.key)
    addToCartMessage({ variant })
    open.value = false
  } catch (error) {
    console.error('Failed to add to cart:', error)
  } finally {
    isAddingToCart.value = false
  }
}

// Reset selected variant when modal opens with a new product
watch(() => props.product.key, () => {
  selectedVariantIndex.value = 0
})
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent
      class="sm:max-w-3xl p-0 gap-0 overflow-hidden"
      :show-close-button="true"
    >
      <VisuallyHidden>
        <DialogTitle>{{ product.name }}</DialogTitle>
      </VisuallyHidden>

      <div class="flex flex-col sm:flex-row max-h-[85vh] overflow-y-auto sm:overflow-hidden">
        <!-- Image Section -->
        <div class="relative aspect-[3/4] sm:w-1/2 shrink-0 bg-shade overflow-hidden">
          <NuxtImg
            v-if="selectedImage"
            :src="selectedImage"
            :alt="product.name"
            class="size-full object-cover"
          />
        </div>

        <!-- Details Section -->
        <div class="flex flex-col p-6 sm:w-1/2 sm:overflow-y-auto">
          <div class="flex-1 space-y-4">
            <!-- Brand -->
            <p v-if="product.brand" class="text-xs text-muted-foreground tracking-widest uppercase">
              {{ product.brand }}
            </p>

            <!-- Name -->
            <h2 class="text-xl font-medium text-foreground leading-tight">
              {{ product.name }}
            </h2>

            <!-- Price -->
            <p v-if="displayPrice?.amount" class="text-lg font-medium text-foreground">
              {{ formatPrice(displayPrice) }}
            </p>

            <!-- Description -->
            <p v-if="product.description" class="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {{ product.description }}
            </p>

            <!-- Variant Swatches -->
            <div v-if="Array.isArray(product.variants) && product.variants.length > 1" class="space-y-2">
              <p class="text-xs text-muted-foreground uppercase tracking-wide">
                {{ selectedVariant?.name || 'Select variant' }}
              </p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="(variant, index) in product.variants"
                  :key="variant.key"
                  class="size-8 rounded-full overflow-hidden ring-1 transition-all duration-300"
                  :class="index === selectedVariantIndex
                    ? 'ring-2 ring-foreground ring-offset-2 ring-offset-background'
                    : 'ring-border hover:ring-foreground'"
                  @click="selectedVariantIndex = index"
                >
                  <NuxtImg
                    v-if="variant.images?.[0]?.src"
                    :src="variant.images[0].src"
                    :alt="variant.name"
                    class="size-full object-cover scale-[3] blur-[1px]"
                  />
                </button>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-6 space-y-3">
            <Button
              color="buy"
              size="lg"
              class="w-full gap-2"
              :disabled="isAddingToCart"
              @click="handleAddToCart"
            >
              <ShoppingBag class="size-4" />
              {{ isAddingToCart ? 'Adding...' : 'Add to Cart' }}
            </Button>

            <NuxtLink
              v-if="product.link?.path"
              :to="product.link.path"
              class="block"
              @click="open = false"
            >
              <Button variant="ghost" size="default" class="w-full text-muted-foreground hover:text-foreground">
                View full details
              </Button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
