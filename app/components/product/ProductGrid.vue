<script setup lang="ts">
const props = defineProps<{
  products: ProductCard[]
  columns?: 2 | 3 | 4
}>()

const cols = computed(() => props.columns || 4)

const quickViewProductKey = ref<string | null>(null)
const quickViewRowIndex = ref<number | null>(null)

const getProductRow = (index: number, c: number) => Math.floor(index / c)

const currentColumns = ref(4)

function updateColumns() {
  if (typeof window === 'undefined') return
  const width = window.innerWidth
  if (width < 768) currentColumns.value = 2
  else if (width < 1024) currentColumns.value = 3
  else currentColumns.value = cols.value
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

function openQuickView(productKey: string, productIndex: number) {
  if (quickViewProductKey.value === productKey) {
    closeQuickView()
    return
  }

  quickViewProductKey.value = productKey
  quickViewRowIndex.value = getProductRow(productIndex, currentColumns.value)

  nextTick(() => {
    setTimeout(() => {
      const el = document.getElementById('quick-view-panel')
      if (el) {
        const rect = el.getBoundingClientRect()
        window.scrollTo({ top: window.pageYOffset + rect.top - 100, behavior: 'smooth' })
      }
    }, 100)
  })
}

function closeQuickView() {
  quickViewProductKey.value = null
  quickViewRowIndex.value = null
}

const isQuickViewOpen = (productKey: string) => quickViewProductKey.value === productKey

const productsWithQuickView = computed(() => {
  const result: Array<
    | { type: 'product'; product: ProductCard; index: number }
    | { type: 'quickview'; productKey: string; productLink?: string }
  > = []

  let currentRow = -1

  props.products.forEach((product, index) => {
    const row = getProductRow(index, currentColumns.value)

    if (row !== currentRow && currentRow === quickViewRowIndex.value && quickViewProductKey.value) {
      const p = props.products.find((pr) => pr.key === quickViewProductKey.value)
      result.push({ type: 'quickview', productKey: quickViewProductKey.value, productLink: p?.link?.path })
    }

    currentRow = row
    result.push({ type: 'product', product, index })
  })

  if (currentRow === quickViewRowIndex.value && quickViewProductKey.value) {
    const p = props.products.find((pr) => pr.key === quickViewProductKey.value)
    result.push({ type: 'quickview', productKey: quickViewProductKey.value, productLink: p?.link?.path })
  }

  return result
})
</script>

<template>
  <div class="product-grid">
    <div
      class="grid gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14"
      :class="{
        'grid-cols-2 md:grid-cols-3 lg:grid-cols-4': cols === 4,
        'grid-cols-2 md:grid-cols-3': cols === 3,
        'grid-cols-2': cols === 2,
      }"
    >
      <template
        v-for="item in productsWithQuickView"
        :key="item.type === 'product' ? item.product.key : 'quickview'"
      >
        <div v-if="item.type === 'product'">
          <ProductCardWithQuickView
            :product="item.product"
            :is-active="isQuickViewOpen(item.product.key)"
            @open-quick-view="openQuickView(item.product.key, item.index)"
          />
        </div>

        <div
          v-else-if="item.type === 'quickview'"
          id="quick-view-panel"
          class="col-span-full -mx-6 lg:-mx-12"
        >
          <ProductQuickView
            :product-key="item.productKey"
            :product-link="item.productLink"
            :is-open="true"
            @close="closeQuickView"
          />
        </div>
      </template>
    </div>
  </div>
</template>
