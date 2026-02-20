<script setup lang="ts">
const props = defineProps<{
  products: ProductCard[]
  columns?: 2 | 3 | 4
}>()

const columns = computed(() => props.columns || 4)

// Quick view state
const quickViewProductKey = ref<string | null>(null)
const quickViewRowIndex = ref<number | null>(null)

// Calculate which row a product is in based on current viewport
const getProductRow = (index: number, cols: number) => Math.floor(index / cols)

// Get the index where quick view should be inserted (after the last item in the row)
const getQuickViewInsertIndex = (productIndex: number, cols: number) => {
  const row = getProductRow(productIndex, cols)
  return (row + 1) * cols - 1
}

// Determine current column count based on breakpoints
const currentColumns = ref(4)

// Update columns on resize
const updateColumns = () => {
  if (typeof window === 'undefined') return
  
  const width = window.innerWidth
  if (width < 640) {
    currentColumns.value = 2
  } else if (width < 768) {
    currentColumns.value = 2
  } else if (width < 1024) {
    currentColumns.value = 3
  } else {
    currentColumns.value = columns.value
  }
}

onMounted(() => {
  updateColumns()
  window.addEventListener('resize', updateColumns)
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateColumns)
  }
})

// Calculate the visual grid slot for a product index, accounting for BOPIS teaser
const getVisualSlot = (productIndex: number) => {
  if (hasBopisProducts.value && productIndex >= BOPIS_TEASER_POSITION) {
    return productIndex + 1 // shift by 1 to account for the teaser slot
  }
  return productIndex
}

// Open quick view for a product
const openQuickView = (productKey: string, productIndex: number) => {
  // If clicking the same product, close it
  if (quickViewProductKey.value === productKey) {
    closeQuickView()
    return
  }

  quickViewProductKey.value = productKey
  quickViewRowIndex.value = getProductRow(getVisualSlot(productIndex), currentColumns.value)
  
  // Scroll to quick view after a short delay to allow animation
  nextTick(() => {
    setTimeout(() => {
      const quickViewEl = document.getElementById('quick-view-panel')
      if (quickViewEl) {
        const rect = quickViewEl.getBoundingClientRect()
        const scrollTop = window.pageYOffset + rect.top - 100
        window.scrollTo({ top: scrollTop, behavior: 'smooth' })
      }
    }, 100)
  })
}

const closeQuickView = () => {
  quickViewProductKey.value = null
  quickViewRowIndex.value = null
}

// BOPIS teaser insertion position (0-indexed, position 3 = after 2 products)
const BOPIS_TEASER_POSITION = 2

// Check if any product in the listing has bopis enabled
const hasBopisProducts = computed(() => props.products.some((p) => p.bopis))

// Group products by row with quick view insertion points and BOPIS teaser
const productsWithQuickView = computed(() => {
  const result: Array<
    | { type: 'product'; product: ProductCard; index: number }
    | { type: 'quickview'; productKey: string }
    | { type: 'bopis-teaser' }
  > = []

  let currentRow = -1
  // Track the visual grid index (accounts for inserted teaser taking a slot)
  let gridSlot = 0

  props.products.forEach((product, index) => {
    // Insert BOPIS teaser at position 3 (after 2 products)
    if (index === BOPIS_TEASER_POSITION && hasBopisProducts.value) {
      // Check if quick view needs to be inserted before the teaser
      const teaserRow = getProductRow(gridSlot, currentColumns.value)
      if (teaserRow !== currentRow && currentRow === quickViewRowIndex.value && quickViewProductKey.value) {
        result.push({ type: 'quickview', productKey: quickViewProductKey.value })
      }
      currentRow = teaserRow
      result.push({ type: 'bopis-teaser' })
      gridSlot++
    }

    const row = getProductRow(gridSlot, currentColumns.value)

    // If we've moved to a new row and the previous row had the quick view, insert it
    if (row !== currentRow && currentRow === quickViewRowIndex.value && quickViewProductKey.value) {
      result.push({ type: 'quickview', productKey: quickViewProductKey.value })
    }

    currentRow = row
    result.push({ type: 'product', product, index })
    gridSlot++
  })

  // Handle BOPIS teaser if total products < BOPIS_TEASER_POSITION
  if (props.products.length <= BOPIS_TEASER_POSITION && hasBopisProducts.value) {
    result.push({ type: 'bopis-teaser' })
  }

  // Handle quick view for the last row
  if (currentRow === quickViewRowIndex.value && quickViewProductKey.value) {
    result.push({ type: 'quickview', productKey: quickViewProductKey.value })
  }

  return result
})

// Check if a product is the one with open quick view
const isQuickViewOpen = (productKey: string) => quickViewProductKey.value === productKey

// Provide quick view state to child components
provide('quickView', {
  openQuickView,
  closeQuickView,
  isQuickViewOpen
})
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
      <template v-for="item in productsWithQuickView" :key="item.type === 'product' ? item.product.key : item.type === 'bopis-teaser' ? 'bopis-teaser' : 'quickview'">
        <!-- Product Card -->
        <div v-if="item.type === 'product'">
          <ProductCardWithQuickView
            :product="item.product"
            :index="item.index"
            :is-active="isQuickViewOpen(item.product.key)"
            @open-quick-view="openQuickView(item.product.key, item.index)"
          />
        </div>

        <!-- BOPIS Teaser Card -->
        <div v-else-if="item.type === 'bopis-teaser'">
          <ProductBopisTeaser />
        </div>

        <!-- Quick View Panel (spans full width) -->
        <div
          v-else-if="item.type === 'quickview'"
          id="quick-view-panel"
          class="col-span-full -mx-6 lg:-mx-12"
          :class="{
            'col-span-2 md:col-span-3 lg:col-span-4': columns === 4,
            'col-span-2 md:col-span-3': columns === 3,
            'col-span-2': columns === 2
          }"
        >
          <ProductQuickView
            :product-key="item.productKey"
            :product-link="item.link?.path"
            :is-open="true"
            @close="closeQuickView"
          />
        </div>
      </template>
    </div>
  </div>
</template>
