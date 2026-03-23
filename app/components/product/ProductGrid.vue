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

// Open quick view for a product
const openQuickView = (productKey: string, productIndex: number) => {
  // If clicking the same product, close it
  if (quickViewProductKey.value === productKey) {
    closeQuickView()
    return
  }
  
  quickViewProductKey.value = productKey
  quickViewRowIndex.value = getProductRow(productIndex, currentColumns.value)
  
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

// Group products by row with quick view insertion points
const BOPIS_BANNER_POSITION = 3

const productsWithQuickView = computed(() => {
  const result: Array<
    | { type: 'product'; product: ProductCard; index: number }
    | { type: 'quickview'; productKey: string }
    | { type: 'bopis-banner' }
  > = []

  let currentRow = -1
  let bopisInserted = false

  props.products.forEach((product, index) => {
    const row = getProductRow(index, currentColumns.value)

    // If we've moved to a new row and the previous row had the quick view, insert it
    if (row !== currentRow && currentRow === quickViewRowIndex.value && quickViewProductKey.value) {
      result.push({ type: 'quickview', productKey: quickViewProductKey.value })
    }

    // Insert BOPIS banner after the 3rd product (index 2, so before index 3)
    if (!bopisInserted && index === BOPIS_BANNER_POSITION) {
      result.push({ type: 'bopis-banner' })
      bopisInserted = true
    }

    currentRow = row
    result.push({ type: 'product', product, index })
  })

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
      <template v-for="item in productsWithQuickView" :key="item.type === 'product' ? item.product.key : item.type === 'quickview' ? 'quickview' : 'bopis-banner'">
        <!-- Product Card -->
        <div v-if="item.type === 'product'">
          <ProductCardWithQuickView
            :product="item.product"
            :index="item.index"
            :is-active="isQuickViewOpen(item.product.key)"
            @open-quick-view="openQuickView(item.product.key, item.index)"
          />
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

        <!-- BOPIS Promotional Banner (spans full width) -->
        <div
          v-else-if="item.type === 'bopis-banner'"
          class="col-span-full bg-shade border border-border p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
        >
          <IconMapPin class="size-6 text-muted-foreground shrink-0" />
          <div class="flex-1 min-w-0">
            <span class="text-sm font-medium tracking-wide uppercase text-foreground">Buy Online, Pick Up In Store</span>
            <p class="text-sm text-muted-foreground font-light mt-1">Skip the wait — order now and collect at your nearest store</p>
          </div>
          <NuxtLink to="/stores" class="text-sm text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors whitespace-nowrap">
            Learn more
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>
