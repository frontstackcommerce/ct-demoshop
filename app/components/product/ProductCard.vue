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
  <NuxtLink :to="product.link?.path">
    <div class="flex flex-col gap-2">
      <div class="overflow-hidden aspect-[0.75] bg-white shadow-xs relative group">
        <img 
          :src="firstImage" 
          :alt="product.name" 
          class="size-full object-cover p-4"
        />
        <img 
          v-if="hasSecondImage"
          :src="secondImage" 
          :alt="product.name" 
          class="absolute inset-0 size-full object-cover p-4 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        />
      </div>
      <div v-if="Array.isArray(product.variants) && product.variants.length > 1">
        <div class="flex gap-2">
          <div v-for="variant in product.variants" :key="variant.key" class="aspect-square overflow-hidden bg-white size-6 cursor-pointer">
            <NuxtLink :to="product.link?.path + '?sku=' + variant.key">
              <img :src="variant.images?.[0]?.src" :alt="variant.images?.[0]?.altText" class="size-full object-contain scale-400 blur-xs saturate-200" />
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-1 text-xs">
        <p class="text-gray-700 font-lighter">{{ product.name }}</p>
        <p class="text-gray-500 font-light">{{ product.brand }}</p>
        <p class="text-gray-500 font-light" v-if="product.price?.amount">{{ formatPrice(product.price?.amount) }}</p>
      </div>
    </div>
  </NuxtLink>
</template>