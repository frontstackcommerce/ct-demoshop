<script setup lang="ts">
const props = defineProps<{
  product: ProductCard
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
</script>

<template>
  <NuxtLink :to="product.link?.path" class="group block">
    <div class="flex flex-col">
      <!-- Image container -->
      <div class="relative aspect-[3/4] overflow-hidden bg-shade mb-4">
        <NuxtImg 
          :src="firstImage" 
          :alt="product.name" 
          class="absolute inset-0 size-full object-cover transition-all duration-700 ease-out group-hover:scale-105" 
        />
        <NuxtImg
          v-if="hasSecondImage"
          :src="secondImage"
          :alt="product.name"
          class="absolute inset-0 size-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105"
        />
        
        <!-- Quick view overlay -->
        <div class="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
        
        <!-- Quick add button - appears on hover -->
        <div class="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <Button 
            variant="default" 
            class="w-full bg-background/95 backdrop-blur-sm text-foreground hover:bg-background text-xs tracking-wider uppercase h-10"
          >
            Quick View
          </Button>
        </div>
      </div>
      
      <!-- Variant swatches -->
      <div v-if="Array.isArray(product.variants) && product.variants.length > 1" class="flex gap-1.5 mb-3">
        <NuxtLink 
          v-for="variant in product.variants.slice(0, 4)" 
          :key="variant.key"
          :to="product.link?.path + '?sku=' + variant.key"
          @click.stop
        >
          <div class="size-5 rounded-full overflow-hidden ring-1 ring-border hover:ring-foreground transition-all duration-300">
            <NuxtImg 
              :src="variant.images?.[0]?.src" 
              :alt="variant.images?.[0]?.altText" 
              class="size-full object-cover scale-[3] blur-[1px]" 
            />
          </div>
        </NuxtLink>
        <span v-if="product.variants.length > 4" class="text-xs text-muted-foreground self-center ml-1">
          +{{ product.variants.length - 4 }}
        </span>
      </div>
      
      <!-- Product info -->
      <div class="space-y-1">
        <h3 class="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
          {{ product.name }}
        </h3>
        <p v-if="product.brand" class="text-xs text-muted-foreground tracking-wide uppercase">
          {{ product.brand }}
        </p>
        <p v-if="product.price?.amount" class="text-sm font-medium text-foreground pt-1">
          {{ formatPrice(product.price) }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
