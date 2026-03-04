<script setup lang="ts">
const props = defineProps<{
  product: ProductCard
  index: number
  isActive: boolean
}>()

const emit = defineEmits<{
  openQuickView: []
}>()

const firstImage = computed(() => props.product.variants?.[0]?.images?.[0]?.src)
const secondImage = computed(() => props.product.variants?.[0]?.images?.[1]?.src)
const hasSecondImage = computed(() => !!secondImage.value)

// Preload the second image
onMounted(() => {
  if (hasSecondImage.value && secondImage.value) {
    const img = new Image()
    img.src = secondImage.value
  }
})

const handleQuickViewClick = (e: Event) => {
  e.preventDefault()
  e.stopPropagation()
  emit('openQuickView')
}
</script>

<template>
  <div class="group/card">
    <NuxtLink :to="product.link?.path" class="block">
      <div class="flex flex-col">
        <!-- Image container -->
        <div
          class="bg-shade relative mb-4 aspect-[3/4] overflow-hidden transition-all duration-300"
          :class="isActive ? 'ring-foreground ring-2' : ''"
        >
          <NuxtImg
            :src="firstImage"
            :alt="product.name"
            class="absolute inset-0 size-full object-cover transition-all duration-700 ease-out group-hover/card:scale-105"
          />
          <NuxtImg
            v-if="hasSecondImage"
            :src="secondImage"
            :alt="product.name"
            class="absolute inset-0 size-full object-cover opacity-0 transition-all duration-700 ease-out group-hover/card:scale-105 group-hover/card:opacity-100"
          />

          <!-- Quick view overlay -->
          <div
            class="bg-foreground/0 group-hover/card:bg-foreground/5 absolute inset-0 transition-colors duration-500"
          />

          <!-- Active indicator -->
          <div
            v-if="isActive"
            class="bg-foreground text-background absolute top-3 right-3 flex size-8 items-center justify-center rounded-full"
          >
            <IconCheck class="size-4" />
          </div>

          <!-- Quick view button -->
          <div
            class="absolute right-4 bottom-4 left-4 translate-y-4 opacity-0 transition-all duration-500 group-hover/card:translate-y-0 group-hover/card:opacity-100"
          >
            <Button
              variant="default"
              class="bg-background/95 text-foreground hover:bg-background h-10 w-full text-xs tracking-wider uppercase backdrop-blur-sm"
              :class="isActive ? 'bg-foreground text-background hover:bg-foreground/90' : ''"
              @click="handleQuickViewClick"
            >
              <template v-if="isActive">
                <IconX class="mr-2 size-4" />
                Close Quick View
              </template>
              <template v-else>
                <IconEye class="mr-2 size-4" />
                Quick View
              </template>
            </Button>
          </div>
        </div>

        <!-- Variant swatches -->
        <div
          v-if="Array.isArray(product.variants) && product.variants.length > 1"
          class="mb-3 flex gap-1.5"
        >
          <NuxtLink
            v-for="variant in product.variants.slice(0, 4)"
            :key="variant.key"
            :to="product.link?.path + '?sku=' + variant.key"
            @click.stop
          >
            <div
              class="ring-border hover:ring-foreground size-5 overflow-hidden rounded-full ring-1 transition-all duration-300"
            >
              <NuxtImg
                :src="variant.images?.[0]?.src"
                :alt="variant.images?.[0]?.altText"
                class="size-full scale-[3] object-cover blur-[1px]"
              />
            </div>
          </NuxtLink>
          <span
            v-if="product.variants.length > 4"
            class="text-muted-foreground ml-1 self-center text-xs"
          >
            +{{ product.variants.length - 4 }}
          </span>
        </div>

        <!-- Product info -->
        <div class="space-y-1">
          <h3
            class="text-foreground group-hover/card:text-primary line-clamp-1 text-sm font-medium transition-colors duration-300"
          >
            {{ product.name }}
          </h3>
          <p v-if="product.brand" class="text-muted-foreground text-xs tracking-wide uppercase">
            {{ product.brand }}
          </p>
          <p v-if="product.price?.amount" class="text-foreground pt-1 text-sm font-medium">
            {{ formatPrice(product.price) }}
          </p>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
