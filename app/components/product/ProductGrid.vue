<script setup lang="ts">
const props = defineProps<{
  products: ProductCard[]
  columns?: 2 | 3 | 4
}>()

const columns = computed(() => props.columns || 4)

// Quick View state
const quickViewOpen = ref(false)
const quickViewProduct = ref<ProductCard | null>(null)

function openQuickView(product: ProductCard) {
  quickViewProduct.value = product
  quickViewOpen.value = true
}
</script>

<template>
  <div class="product-grid">
    <div
      class="grid gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14"
      :class="{
        'grid-cols-2 md:grid-cols-3 lg:grid-cols-4': columns === 4,
        'grid-cols-2 md:grid-cols-3': columns === 3,
        'grid-cols-2': columns === 2
      }"
    >
      <div v-for="product in products" :key="product.key">
        <ProductCard :product="product" @quick-view="openQuickView" />
      </div>
    </div>

    <!-- Shared Quick View Modal -->
    <ProductQuickView
      v-if="quickViewProduct"
      v-model:open="quickViewOpen"
      :product="quickViewProduct"
    />
  </div>
</template>
