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

async function selectVariant(target: string, sku: string) {
  await navigateTo({
    path: target,
    query: { sku },
  })
}
</script>

<template>
  <NuxtLink :to="product.link?.path">
    <div class="flex flex-col gap-2">
      <div class="group relative aspect-[0.75] overflow-hidden bg-white shadow-xs">
        <NuxtImg :src="firstImage" :alt="product.name" class="size-full object-cover p-4" />
        <NuxtImg
          v-if="hasSecondImage"
          :src="secondImage"
          :alt="product.name"
          :width="320"
          class="absolute inset-0 size-full object-cover p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>
      <div v-if="Array.isArray(product.variants) && product.variants.length > 1">
        <div class="flex gap-2">
          <div
            v-for="variant in product.variants"
            :key="variant.key"
            class="aspect-square size-6 cursor-pointer overflow-hidden bg-white"
            @click="product.link?.path && selectVariant(product.link.path, variant.key)"
          >
            <NuxtImg
              :src="variant.images?.[0]?.src"
              :alt="variant.images?.[0]?.altText"
              class="size-full scale-400 object-contain blur-xs saturate-200"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-1 text-xs">
        <p class="font-lighter text-gray-700">{{ product.name }}</p>
        <p class="font-light text-gray-500">{{ product.brand }}</p>
        <p v-if="product.price?.amount" class="text-muted-foreground font-light">
          {{ formatPrice(product.price) }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
